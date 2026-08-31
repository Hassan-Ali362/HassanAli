import { profile } from "@/lib/data";

const YEAR = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="wrap flex items-center justify-center">
        <p className="num text-[11px] text-muted">
          {profile.name}
          <span className="mx-2 text-muted">/</span>
          {YEAR}
        </p>
      </div>
    </footer>
  );
}
