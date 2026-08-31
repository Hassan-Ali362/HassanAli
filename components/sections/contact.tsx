import { ArrowUpRight, GithubLogo, LinkedinLogo, ReadCvLogo, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/ui/contact-form";
import { contact, profile } from "@/lib/data";

const channels = [
  {
    label: "LinkedIn",
    href: profile.socials.linkedin,
    Icon: LinkedinLogo,
    external: true,
    iconBg: "bg-[#0A66C2]",
    iconColor: "text-white",
    showArrow: true,
  },
  {
    label: "GitHub",
    href: profile.socials.github,
    Icon: GithubLogo,
    external: true,
    iconBg: "bg-[#24292e]",
    iconColor: "text-[#e6edf3]",
    showArrow: true,
  },
  {
    label: "hassanalimalikk@gmail.com",
    href: "mailto:hassanalimalikk@gmail.com",
    Icon: EnvelopeSimple,
    external: false,
    iconBg: "bg-[#EA4335]",
    iconColor: "text-white",
    showArrow: false,
  },
  {
    label: "0341-8340139",
    href: "tel:+923418340139",
    Icon: Phone,
    external: false,
    iconBg: "bg-[#25D366]",
    iconColor: "text-white",
    showArrow: false,
  },
  {
    label: "Resume, PDF",
    href: profile.resumeUrl,
    Icon: ReadCvLogo,
    external: false,
    iconBg: "bg-[#F40F02]",
    iconColor: "text-white",
    showArrow: true,
  },
];

/**
 * Closing section. A stacked header carrying the address, then the form beside
 * the direct channels, which is a different composition from the hero's split
 * so the page does not end on the same layout it opened with.
 *
 * The email address sits above the form on purpose. It works with no JavaScript
 * and no mail service configured, and it is what a recruiter on a phone reaches
 * for first. The form is the considered option, not the only one.
 */
export function Contact() {
  return (
    <section id="contact" className="border-t border-line py-16 md:py-24">
      <div className="wrap">
        <Reveal>
          <h2 className="h-display max-w-[24ch] text-balance text-[clamp(2rem,5vw,3.5rem)] text-fg">
            {contact.heading}
          </h2>
        </Reveal>

        <Reveal i={1}>
          <p className="mt-6 max-w-[52ch] text-[15px] leading-relaxed text-fg-2">
            {contact.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal i={2} className="lg:col-span-7">
            <ContactForm />
          </Reveal>

          <Reveal i={3} className="lg:col-span-5">
            <div className="panel overflow-hidden">
              <div className="border-b border-line bg-raise px-5 py-3">
                <p className="label">Elsewhere</p>
              </div>

              <ul className="divide-y divide-line">
                {channels.map(({ label, href, Icon, external, iconBg, iconColor, showArrow }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                      className="group flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-raise"
                    >
                      <span className="inline-flex items-center gap-3 text-[13px] text-fg">
                        <span className={`grid size-5 shrink-0 place-items-center rounded-[3px] ${iconBg}`}>
                          <Icon size={12} className={iconColor} />
                        </span>
                        {label}
                      </span>
                      {showArrow && (
                        <ArrowUpRight
                          size={14}
                          weight="bold"
                          className="text-faint transition-colors group-hover:text-accent"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-baseline justify-between gap-4 border-t border-line px-5 py-4">
                <p className="label shrink-0">Based</p>
                <p className="num text-[13px] text-fg-2">{profile.location}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
