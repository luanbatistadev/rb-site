type IconProps = { className?: string };

const BASE_CLASS = "h-6 w-6 shrink-0";

type SvgIconProps = IconProps & {
  children: React.ReactNode;
  strokeWidth?: number;
  baseClass?: string;
};

function SvgIcon({
  className = "",
  children,
  strokeWidth = 1.6,
  baseClass = BASE_CLASS,
}: SvgIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`${baseClass} ${className}`.trim()}
    >
      {children}
    </svg>
  );
}

export function MailIcon({ className = "" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </SvgIcon>
  );
}

export function PhoneIcon({ className = "" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </SvgIcon>
  );
}

export function ChatIcon({ className = "" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </SvgIcon>
  );
}

export function LinkedInIcon({ className = "" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </SvgIcon>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.4A4 4 0 1 1 12.6 8 4 4 0 0 1 16 11.4Z" />
      <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
    </SvgIcon>
  );
}

export function PinIcon({ className = "" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
      <circle cx="12" cy="10" r="3" />
    </SvgIcon>
  );
}

export function ClockIcon({ className = "" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </SvgIcon>
  );
}

export function ArrowIcon({ className = "" }: IconProps) {
  return (
    <SvgIcon className={className} strokeWidth={2} baseClass="">
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </SvgIcon>
  );
}
