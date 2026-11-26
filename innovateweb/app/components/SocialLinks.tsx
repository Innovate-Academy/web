import { SOCIALS } from "../lib/social";

export default function SocialLinks({
  variant = "footer",
}: {
  variant?: "footer" | "cards";
}) {
  if (variant === "cards") {
    return (
      <div className="grid gap-4 sm:grid-cols-2">
        {SOCIALS.map((social) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 rounded-xl border border-border bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-sm motion-reduce:transform-none"
          >
            <span>
              <span className="block text-sm font-bold text-foreground">
                {social.name}
              </span>
              <span className="mt-1 block text-xs text-muted">
                {social.handle}
              </span>
            </span>
            <span
              aria-hidden="true"
              className="text-lg text-brand transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none"
            >
              ↗
            </span>
          </a>
        ))}
      </div>
    );
  }

  return (
    <ul className="mt-4 flex flex-col gap-2 text-xs text-muted">
      {SOCIALS.map((social) => (
        <li key={social.name}>
          <a
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-wrap items-baseline gap-x-1.5 hover:text-foreground"
          >
            <span className="font-medium">{social.name}</span>
            <span className="text-[11px]">{social.handle}</span>
            <span
              aria-hidden="true"
              className="text-brand opacity-0 transition-opacity group-hover:opacity-100"
            >
              ↗
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
