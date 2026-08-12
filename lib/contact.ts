/**
 * Shared contract for the contact form: the shape the server action returns and
 * the validation both sides agree on.
 *
 * This lives outside the action file on purpose. A module marked "use server"
 * may only export async functions, so the types, constants, and the validator
 * cannot live there, and the client component needs all three.
 *
 * Validation runs on the server. The client mirrors the same limits as native
 * attributes for immediate feedback, but nothing here is trusted from the
 * browser: the action re-checks every field before it sends anything.
 */

export type ContactField = "name" | "email" | "message";

export type ContactValues = Record<ContactField, string>;

export type ContactState = {
  status: "idle" | "success" | "error";
  /** Form-level text. Never empty when status is "error". */
  message: string;
  fieldErrors: Partial<Record<ContactField, string>>;
  /** Echoed back so a rejected submission does not lose what was typed. */
  values: ContactValues;
  /**
   * True when delivery failed for a reason the visitor cannot fix, so the UI
   * offers the direct email address instead of asking them to try again.
   */
  offerFallback?: boolean;
  /** On success, the address the reply will go to, so the UI can name it. */
  replyTo?: string;
};

export const NAME_MAX = 80;
export const EMAIL_MAX = 254;
export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 4000;

export const emptyValues: ContactValues = { name: "", email: "", message: "" };

export const idleContactState: ContactState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: emptyValues,
};

/**
 * Deliberately permissive. The only address format worth rejecting at this
 * stage is one that cannot possibly route, and the real proof of a working
 * address is a reply landing in it.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function validateContact(values: ContactValues) {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (name.length < 2) {
    fieldErrors.name = "Tell me who you are, at least two characters.";
  } else if (name.length > NAME_MAX) {
    fieldErrors.name = `Keep this under ${NAME_MAX} characters.`;
  }

  if (!email) {
    fieldErrors.email = "I need an address to reply to.";
  } else if (email.length > EMAIL_MAX || !EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "That does not look like an email address.";
  }

  if (message.length < MESSAGE_MIN) {
    fieldErrors.message = `A little more detail, please. At least ${MESSAGE_MIN} characters.`;
  } else if (message.length > MESSAGE_MAX) {
    fieldErrors.message = `That is over the ${MESSAGE_MAX} character limit.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false as const, fieldErrors };
  }

  return { ok: true as const, data: { name, email, message } };
}
