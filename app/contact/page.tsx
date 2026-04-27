import { ContactForm } from "@/components/form/contact-form"
import { PageHeading } from "@/components/shared/page-heading"
import { socialLinks } from "@/lib/social-links"
import Image from "next/image"
import { Divider } from "@/components/thegridcn/divider"
import { GlowContainer } from "@/components/thegridcn/glow-container"

import type { Metadata } from "next"
import { getMetadataBySlug } from "@/lib/get-metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getMetadataBySlug("pages", "contact")
}

export default function ContactPage() {
  return (
    <div className="container mx-auto my-8 px-4">
      <PageHeading
        title="Контакты"
        description="Свяжитесь с нами — обсудим ваш проект и подберём оптимальное решение."
      />
      <div className="my-4 flex flex-col gap-8 md:flex-row">
        <div className="w-full space-y-2">
          {/* Social Links */}
          <Divider label="Social Links" />
          <div className="flex flex-col gap-3 md:flex-row">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center gap-3 rounded border border-primary/30 px-4 py-3 font-mono text-sm tracking-wider text-foreground transition-all hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
              >
                <Image
                  src={link.icon}
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden="true"
                />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
          <GlowContainer
            pulse
            className="flex flex-col items-center justify-center gap-4"
          >
            <Image
              src={"/img/qrcode.min.svg"}
              alt="QR-код для добавления SEOMIX в контакты"
              width={600}
              height={600}
              className="aspect-square max-h-80 object-contain"
            />
            <p className="text-center">
              Отсканируйте QR-код, чтобы добавить нас в контакты
            </p>
          </GlowContainer>
        </div>
        <div className="w-full space-y-2">
          <Divider label="Contact Form" />
          <div className="flex w-full justify-center">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
