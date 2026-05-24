import { LogoRB } from "@/components/ui/logo-rb";
import { ContactMethod } from "@/components/ui/contact-method";
import {
  MailIcon,
  PhoneIcon,
  ChatIcon,
  LinkedInIcon,
  InstagramIcon,
  PinIcon,
  ClockIcon,
} from "@/components/ui/contact-icons";

type ContactInfoDict = {
  infoTitle: string;
  infoSubtitle: string;
  methods: {
    email: string;
    phone: string;
    whatsapp: string;
    whatsappValue: string;
    linkedin: string;
    linkedinValue: string;
    instagram: string;
    instagramValue: string;
    location: string;
    locationValue: string;
    hours: string;
    hoursValue: string;
  };
};

type ContactInfoProps = {
  dict: ContactInfoDict;
};

const EMAIL = "luanbatistadev@gmail.com";
const PHONE_DISPLAY = "+55 69 99295-0959";
const PHONE_TEL = "+5569992950959";
const WHATSAPP_URL = "https://wa.me/5569992950959";
const LINKEDIN_URL = "https://linkedin.com/company/rb-computing-development";
const INSTAGRAM_URL = "https://www.instagram.com/rbcdevelopment";

type MethodItem = {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

function buildMethods(dict: ContactInfoDict): MethodItem[] {
  const { methods } = dict;
  return [
    { icon: <MailIcon />, label: methods.email, value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: <PhoneIcon />, label: methods.phone, value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
    { icon: <ChatIcon />, label: methods.whatsapp, value: methods.whatsappValue, href: WHATSAPP_URL, external: true },
    { icon: <LinkedInIcon />, label: methods.linkedin, value: methods.linkedinValue, href: LINKEDIN_URL, external: true },
    { icon: <InstagramIcon />, label: methods.instagram, value: methods.instagramValue, href: INSTAGRAM_URL, external: true },
    { icon: <PinIcon />, label: methods.location, value: methods.locationValue },
    { icon: <ClockIcon />, label: methods.hours, value: methods.hoursValue },
  ];
}

export function ContactInfo({ dict }: ContactInfoProps) {
  const methods = buildMethods(dict);

  return (
    <div data-testid="contact-info" className="flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <LogoRB width={49} height={44} className="text-white opacity-70" />
        <div className="flex flex-col leading-[1.4] text-left">
          <span className="text-[12.74px] text-white/60">Computing</span>
          <span className="text-[12.74px] text-white/60">Development.</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[32px] font-medium leading-[1.2] tracking-[-0.32px] text-white">
          {dict.infoTitle}
        </h2>
        <p className="max-w-md text-[16px] leading-[1.5] text-white/70">
          {dict.infoSubtitle}
        </p>
      </div>

      <ul className="flex flex-col gap-5">
        {methods.map((method) => (
          <li key={method.label}>
            <ContactMethod {...method} />
          </li>
        ))}
      </ul>
    </div>
  );
}
