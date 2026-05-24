import Link from "next/link";

type ContactMethodProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

export function ContactMethod({ icon, label, value, href, external }: ContactMethodProps) {
  const content = (
    <span className="flex items-start gap-4">
      <span className="mt-0.5 text-white/60 transition-colors duration-200 group-hover:text-white">
        {icon}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm text-white/50">{label}</span>
        <span className="text-base text-white/80 transition-colors duration-200 group-hover:text-white">
          {value}
        </span>
      </span>
    </span>
  );

  if (!href) {
    return <div className="group flex items-start">{content}</div>;
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="group flex items-start">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="group flex items-start">
      {content}
    </Link>
  );
}
