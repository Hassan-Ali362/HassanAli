import { profile } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="num text-[11px] text-muted">
          {profile.name}
          <span className="mx-2 text-muted">/</span>
          {new Date().getFullYear()}
        </p>
        <p className="text-[11px] text-muted">
          Built with Next.js and Tailwind.
        </p>
      </div>
    </footer>
  );
}
