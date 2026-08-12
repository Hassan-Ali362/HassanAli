"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import type { ReactNode } from "react";
import {
  ArrowCounterClockwise,
  CheckCircle,
  CircleNotch,
  PaperPlaneTilt,
  WarningCircle,
} from "@phosphor-icons/react";
import { sendMessage } from "@/app/actions/contact";
import { profile } from "@/lib/data";
import {
  EMAIL_MAX,
  MESSAGE_MAX,
  MESSAGE_MIN,
  NAME_MAX,
  idleContactState,
} from "@/lib/contact";

/**
 * The field border is --faint rather than the --line hairline used elsewhere on
 * this site, and that is deliberate. A hairline at 0.07 alpha measures about
 * 1.3:1 against the panel behind it, and WCAG 1.4.11 asks for 3:1 on the
 * boundary of a control. --faint is the token documented for exactly this: 2.98:1
 * against --bg-panel and 3.05:1 against the field's own darker interior. It also
 * does real work, separating a control you can type into from a rule that is
 * only decoration.
 */
const fieldClasses = [
  "w-full rounded-sq border border-faint bg-bg px-4 py-3",
  "text-[14px] text-fg transition-colors",
  "hover:border-muted",
  // The global :focus-visible rule draws the actual 2px accent ring. This warms
  // the border underneath it so the active field still reads at a glance.
  "focus:border-accent",
  // Errors are announced by aria-invalid. The border repeats it, and the message
  // below the field carries it in text, so color is never the only signal.
  "aria-[invalid=true]:border-down",
].join(" ");

/* -------------------------------------------------------------------------- */
/*  Field wrapper. Label above, error below, per the form conventions on this  */
/*  site. Never a placeholder standing in for a label.                        */
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
        {/* The hint stays up while an error is showing. A server action only
            clears the error on the next submit, and the character count is most
            useful in exactly that window, while a too-short message is being
            fixed. They answer different questions, so both stay. */}
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

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sq bg-accent px-5 py-3 text-sm font-medium leading-none text-accent-fg transition-colors duration-200 hover:bg-accent-hover active:translate-y-px disabled:pointer-events-none disabled:opacity-60"
    >
      {pending ? (
        <>
          Sending
          <CircleNotch size={15} weight="bold" className="animate-spin" />
        </>
      ) : (
        <>
          Send message
          <PaperPlaneTilt size={15} weight="bold" />
        </>
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Form                                                                      */
/* -------------------------------------------------------------------------- */
function Form({ onReset }: { onReset: () => void }) {
  const [state, formAction] = useActionState(sendMessage, idleContactState);
  const [length, setLength] = useState(0);
  const confirmation = useRef<HTMLParagraphElement>(null);

  // On success the fields are replaced by the receipt, so focus has nowhere to
  // return to. Move it to the confirmation instead of dropping it to the top.
  useEffect(() => {
    if (state.status === "success") confirmation.current?.focus();
  }, [state.status]);

  if (state.status === "success") {
    return (
      <div className="panel" role="status">
        <div className="flex items-center gap-3 border-b border-line bg-raise px-5 py-3 md:px-6">
          <CheckCircle size={16} weight="fill" className="shrink-0 text-ok" />
          <p className="label text-ok">Message sent</p>
        </div>
        <div className="p-5 md:p-6">
          <p
            ref={confirmation}
            tabIndex={-1}
            className="max-w-[46ch] text-[15px] leading-relaxed text-fg"
          >
            Thanks{state.values.name ? `, ${state.values.name.trim()}` : ""}. It
            landed, and the reply will go to{" "}
            <span className="num text-fg-2">{state.replyTo}</span>.
          </p>
          <button
            type="button"
            onClick={onReset}
            className="mt-6 inline-flex items-center gap-2 rounded-sq border border-line-2 px-4 py-2.5 text-[13px] leading-none text-fg-2 transition-colors hover:border-line-3 hover:text-fg"
          >
            <ArrowCounterClockwise size={14} weight="bold" />
            Send another
          </button>
        </div>
      </div>
    );
  }

  const { fieldErrors, values } = state;
  const formError = state.status === "error" && !!state.message;

  return (
    <form action={formAction} noValidate className="panel">
      <div className="border-b border-line bg-raise px-5 py-3 md:px-6">
        <p className="label">Send a message</p>
      </div>

      <div className="grid gap-5 p-5 md:p-6">
        {/* Form-level failures only. Anything a field can explain is explained
            at the field, so this never repeats what is already below. */}
        {formError && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-sq border border-down/40 bg-down/[0.08] px-4 py-3"
          >
            <WarningCircle size={16} weight="fill" className="mt-px shrink-0 text-down" />
            <p className="text-[13px] leading-relaxed text-fg-2">
              {state.message}
              {state.offerFallback && (
                <>
                  {" "}
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-accent underline underline-offset-2 hover:text-accent-hover"
                  >
                    Open your mail client
                  </a>
                  .
                </>
              )}
            </p>
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
              defaultValue={values.name}
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
              defaultValue={values.email}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={fieldClasses}
            />
          </Field>
        </div>

        <Field
          id="message"
          label="Message"
          /* States the floor before anything is typed, which is the number that
             actually gates the submit, then switches to the ceiling once it
             matters. "0 / 4000" up front tells the visitor nothing. */
          hint={
            length === 0 && !values.message
              ? `${MESSAGE_MIN} characters minimum`
              : `${Math.max(length, values.message.length)} / ${MESSAGE_MAX}`
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
            defaultValue={values.message}
            onChange={(event) => setLength(event.target.value.length)}
            aria-invalid={!!fieldErrors.message}
            /* Error first so it is read before the count, and the count is
               always announced because it is always on screen. */
            aria-describedby={
              fieldErrors.message
                ? "message-error message-hint"
                : "message-hint"
            }
            className={`${fieldClasses} resize-y leading-relaxed`}
          />
        </Field>

        {/* Honeypot. display:none keeps it out of the tab order and away from
            screen readers, so anything typed here came from a bot. */}
        <div className="hidden" aria-hidden>
          <label htmlFor="company">Company</label>
          <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
          <SubmitButton />
          <p className="text-[12px] leading-snug text-muted">
            Goes straight to my inbox. Nothing else is stored.
          </p>
        </div>
      </div>
    </form>
  );
}

/**
 * The reset wrapper. useActionState has no reset, so "Send another" bumps a key
 * and the form remounts with a clean state instead of keeping a stale receipt.
 */
export function ContactForm() {
  const [instance, setInstance] = useState(0);

  return <Form key={instance} onReset={() => setInstance((n) => n + 1)} />;
}
