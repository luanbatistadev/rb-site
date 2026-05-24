"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import { pickRandomBg } from "@/lib/background-images";
import { ContactInfo } from "@/components/sections/contact-info";
import { ContactForm } from "@/components/sections/contact-form";

type ContactSectionProps = {
  dict: React.ComponentProps<typeof ContactInfo>["dict"] &
    React.ComponentProps<typeof ContactForm>["dict"];
};

export function ContactSection({ dict }: ContactSectionProps) {
  const [bgSrc, setBgSrc] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: defer random pick to client to avoid hydration mismatch
    setBgSrc(pickRandomBg());
  }, []);

  return (
    <section data-testid="contact-section" className="bg-background px-6 pb-20 pt-10">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        className="relative mx-auto max-w-300 overflow-hidden rounded-xl"
      >
        <div className="absolute inset-0">
          {bgSrc && (
            <Image
              src={bgSrc}
              alt=""
              fill
              sizes="100vw"
              className="object-cover animate-fade-in"
            />
          )}
          <div className="absolute inset-0 bg-[#0b0b0b]/85" />
        </div>

        <motion.div
          variants={fadeInUp}
          className="relative z-10 grid grid-cols-1 gap-10 px-6 py-12 md:px-10 md:py-15 lg:grid-cols-12 lg:gap-12"
        >
          <div className="lg:col-span-5">
            <ContactInfo dict={dict} />
          </div>
          <div className="lg:col-span-7">
            <ContactForm dict={dict} />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
