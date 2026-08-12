"use server";

import { headers } from "next/headers";
import { profile } from "@/lib/data";
import {
  validateContact,
  type ContactState,
  type ContactValues,
} from "@/lib/contact";

/* -------------------------------------------------------------------------- */
/*  Rate limiting                                                             */
/* -------------------------------------------------------------------------- */
/**
 * In-process, per-instance. Good enough to stop a single client hammering the
 * form, and honest about what it is not: serverless spins up more than one
 * instance and this map does not survive a cold start, so the real ceiling is
 * higher than MAX_PER_WINDOW. Move this to Upstash Redis or Vercel KV if the
 * form ever attracts real traffic.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const MAX_TRACKED_CLIENTS = 5_000;

const seen = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (seen.get(key) ?? []).filter((at) => now - at < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    seen.set(key, recent);
    return true;
  }

  recent.push(now);
  seen.set(key, recent);

  // Bound the map so a flood of unique addresses cannot grow it without limit.
  if (seen.size > MAX_TRACKED_CLIENTS) {
    for (const [client, stamps] of seen) {
      if (stamps.every((at) => now - at >= WINDOW_MS)) seen.delete(client);
    }
  }

  return false;
}

async function clientKey(): Promise<string> {
  const head = await headers();
  const forwarded = head.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || head.get("x-real-ip") || "unknown";
}

/* -------------------------------------------------------------------------- */
/*  Action                                                                    */
/* -------------------------------------------------------------------------- */
function failure(
  message: string,
  values: ContactValues,
  extra: Partial<ContactState> = {},
): ContactState {
  return { status: "error", message, fieldErrors: {}, values, ...extra };
}

const FALLBACK_HINT = `Email me directly at ${profile.email} and it will reach me.`;

export async function sendMessage(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: ContactValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const result = validateContact(values);
  if (!result.ok) {
    return {
      status: "error",
      message: "Something needs fixing below.",
      fieldErrors: result.fieldErrors,
      values,
    };
  }

  const { name, email, message } = result.data;

  /**
   * Honeypot. The field is display:none, so a person never sees it and never
   * fills it. Anything in there is automated, and the response is a plain
   * success so the sender gets no signal to tune against.
   *
   * There is no submission-speed check to go with this. A fast human would trip
   * it, and silently discarding a real message is the one failure this form is
   * not allowed to have.
   */
  if (String(formData.get("company") ?? "").trim() !== "") {
    return {
      status: "success",
      message: "Thanks. Your message is on its way.",
      fieldErrors: {},
      values,
      replyTo: email,
    };
  }

  if (isRateLimited(await clientKey())) {
    return failure(
      `That is a few messages in a short window. ${FALLBACK_HINT}`,
      values,
      { offerFallback: true },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL || profile.email;

  /**
   * Not configured yet. This says so rather than showing a success state for a
   * message that went nowhere, which is the whole reason this form took a
   * backend instead of shipping as decoration. See README for setup.
   */
  if (!apiKey || !from) {
    return failure(
      `The form is not connected to a mail service yet. ${FALLBACK_HINT}`,
      values,
      { offerFallback: true },
    );
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        from,
        to: [to],
        // The visitor's address, so hitting reply in the inbox answers them
        // rather than answering the verified sending domain.
        reply_to: email,
        subject: `Portfolio message from ${name}`,
        text: `${name} <${email}>\n\n${message}\n`,
      }),
    });

    if (!response.ok) {
      // Body may carry the provider's reason. It is for the server log only:
      // it can name the sending domain and the key, neither of which belongs
      // in a response to the browser.
      console.error(
        "[contact] Resend rejected the message",
        response.status,
        await response.text().catch(() => ""),
      );
      return failure(
        `The message did not go through. ${FALLBACK_HINT}`,
        values,
        { offerFallback: true },
      );
    }
  } catch (error) {
    console.error("[contact] could not reach the mail service", error);
    return failure(
      `The message did not go through. ${FALLBACK_HINT}`,
      values,
      { offerFallback: true },
    );
  }

  return {
    status: "success",
    message: "Thanks. Your message is on its way.",
    fieldErrors: {},
    values,
    replyTo: email,
  };
}
