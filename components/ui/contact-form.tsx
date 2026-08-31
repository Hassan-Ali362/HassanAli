"use client";

import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import emailjs from "@emailjs/browser";
import {
  ArrowCounterClockwise,
  CheckCircle,
  CircleNotch,
  PaperPlaneTilt,
  WarningCircle,
} from "@phosphor-icons/react";
import { profile } from "@/lib/data";
import { EMAIL_MAX, MESSAGE_MAX, MESSAGE_MIN, NAME_MAX } from "@/lib/contact";

const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID  ?? "";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY  ?? "";

/**
 * Field border contrast matches WCAG 1.4.11 (3:1 on UI components).
 * --faint sits at 3.05:1 against --bg-panel.
 */
const fieldClasses = [
  "w-full rounded-sq border border-faint bg-bg px-4 py-3",
  "text-[14px] text-fg transition-colors",
  "hover:border-muted focus:border-accent",
  "aria-[invalid=true]:border-down",
].join(" ");

/* -------------------------------------------------------------------------- */
/*  Field wrapper                                                              */
/* -------------------------------------------------------------------------- */
function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-[12.5px] font-medium text-fg">
          {label}
        </label>
        {hint && (
          <span id={`${id}-hint`} className="num text-[11px] text-muted">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-[12px] leading-snug text-down">
          {error}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form                                                                       */
/* -------------------------------------------------------------------------- */
type Status = "idle" | "sending" | "success" | "error";

type FieldErrors = Partial<Record<"name" | "email" | "message", string>>;

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (name.trim().length < 2) errors.name = "Tell me who you are, at least two characters.";
  else if (name.trim().length > NAME_MAX) errors.name = `Keep this under ${NAME_MAX} characters.`;

  const emailPattern = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
  if (!email.trim()) errors.email = "I need an address to reply to.";
  else if (email.trim().length > EMAIL_MAX || !emailPattern.test(email.trim()))
    errors.email = "That does not look like an email address.";

  if (message.trim().length < MESSAGE_MIN)
    errors.message = `A little more detail, please. At least ${MESSAGE_MIN} characters.`;
  else if (message.trim().length > MESSAGE_MAX)
    errors.message = `That is over the ${MESSAGE_MAX} character limit.`;

  return errors;
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const confirmRef = useRef<HTMLParagraphElement>(null);

  const [status, setStatus]       = useState<Status>("idle");
  const [fieldErrors, setErrors]  = useState<FieldErrors>({});
  const [errorMsg, setErrorMsg]   = useState("");
  const [msgLength, setMsgLength] = useState(0);
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const name    = String(data.get("name")    ?? "");
    const email   = String(data.get("email")   ?? "");
    const message = String(data.get("message") ?? "");
    const honeypot = String(data.get("company") ?? "").trim();

    // Honeypot — silent success for bots
    if (honeypot) { setStatus("success"); return; }

    const errors = validate(name, email, message);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    setErrors({});

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus("error");
      setErrorMsg(`EmailJS is not configured yet. Email me directly at ${profile.email}.`);
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { name, email, message },
        { publicKey: PUBLIC_KEY },
      );
      setSenderName(name);
      setSenderEmail(email);
      setStatus("success");
      setTimeout(() => confirmRef.current?.focus(), 50);
    } catch (err: unknown) {
      const details = err && typeof err === "object"
        ? JSON.stringify(err)
        : String(err);
      console.error("[contact] EmailJS error", details);
      setStatus("error");
      setErrorMsg(`The message did not go through (${details}). Email me directly at ${profile.email}.`);
    }
  }

  function handleReset() {
    setStatus("idle");
    setErrors({});
    setErrorMsg("");
    setMsgLength(0);
    formRef.current?.reset();
  }

  /* ── Success state ───────────────────────────────────────────────────── */
  if (status === "success") {
    return (
      <div className="panel" role="status">
        <div className="flex items-center gap-3 border-b border-line bg-raise px-5 py-3 md:px-6">
          <CheckCircle size={16} weight="fill" className="shrink-0 text-ok" />
          <p className="label text-ok">Message sent</p>
        </div>
        <div className="p-5 md:p-6">
          <p ref={confirmRef} tabIndex={-1} className="max-w-[46ch] text-[15px] leading-relaxed text-fg">
            Thanks{senderName ? `, ${senderName.trim()}` : ""}. It landed, and the reply
            will go to <span className="num text-fg-2">{senderEmail}</span>.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className="mt-6 inline-flex items-center gap-2 rounded-sq border border-line-2 px-4 py-2.5 text-[13px] leading-none text-fg-2 transition-colors hover:border-line-3 hover:text-fg"
          >
            <ArrowCounterClockwise size={14} weight="bold" />
            Send another
          </button>
        </div>
      </div>
    );
  }

  /* ── Form state ──────────────────────────────────────────────────────── */
  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="panel">
      <div className="border-b border-line bg-raise px-5 py-3 md:px-6">
        <p className="label">Send a message</p>
      </div>

      <div className="grid gap-5 p-5 md:p-6">
        {/* Form-level error */}
        {status === "error" && errorMsg && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-sq border border-down/40 bg-down/[0.08] px-4 py-3"
          >
            <WarningCircle size={16} weight="fill" className="mt-px shrink-0 text-down" />
            <p className="text-[13px] leading-relaxed text-fg-2">{errorMsg}</p>
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="name" label="Name" error={fieldErrors.name}>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={NAME_MAX}
              autoComplete="name"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              className={fieldClasses}
            />
          </Field>

          <Field id="email" label="Email" error={fieldErrors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={EMAIL_MAX}
              autoComplete="email"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={fieldClasses}
            />
          </Field>
        </div>

        <Field
          id="message"
          label="Message"
          hint={
            msgLength === 0
              ? `${MESSAGE_MIN} characters minimum`
              : `${msgLength} / ${MESSAGE_MAX}`
          }
          error={fieldErrors.message}
        >
          <textarea
            id="message"
            name="message"
            required
            rows={6}
            minLength={MESSAGE_MIN}
            maxLength={MESSAGE_MAX}
            onChange={(e) => setMsgLength(e.target.value.length)}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={
              fieldErrors.message ? "message-error message-hint" : "message-hint"
            }
            className={`${fieldClasses} resize-y leading-relaxed`}
          />
        </Field>

        {/* Honeypot */}
        <div className="hidden" aria-hidden>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
          <button
            type="submit"
            disabled={status === "sending"}
            aria-busy={status === "sending"}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sq bg-accent px-5 py-3 text-sm font-medium leading-none text-accent-fg transition-colors duration-200 hover:bg-accent-hover active:translate-y-px disabled:pointer-events-none disabled:opacity-60"
          >
            {status === "sending" ? (
              <>Sending <CircleNotch size={15} weight="bold" className="animate-spin" /></>
            ) : (
              <>Send message <PaperPlaneTilt size={15} weight="bold" /></>
            )}
          </button>
          <p className="text-[12px] leading-snug text-muted">
            Goes straight to my inbox. Nothing else is stored.
          </p>
        </div>
      </div>
    </form>
  );
}
