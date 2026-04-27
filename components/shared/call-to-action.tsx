import Link from "next/link"
import { Button } from "../ui/button"
import { CallMeForm } from "../form/call-me-form"
import {
  TronCard,
  TronCardHeader,
  TronCardTitle,
  TronCardDescription,
  TronCardContent,
} from "../thegridcn/card"

interface CallToActionProps {
  title: string
  description: string
  primaryAction?: string
  secondaryAction?: {
    label: string
    url: string
  }
}

export function CallToAction({
  title,
  description,
  primaryAction,
  secondaryAction,
}: CallToActionProps) {
  return (
    <TronCard className="mx-auto w-full max-w-5xl px-4">
      <TronCardHeader className="text-center">
        <TronCardTitle>{title}</TronCardTitle>
        <TronCardDescription>{description}</TronCardDescription>
      </TronCardHeader>
      <TronCardContent className="flex flex-col items-center justify-center gap-4 md:flex-row">
        {primaryAction ? <CallMeForm modalButtonText={primaryAction} /> : ""}
        {secondaryAction ? (
          <Button
            asChild
            variant={"outline"}
            size={"lg"}
            className="rounded border border-primary/30 px-5 py-2 font-mono text-[10px] tracking-widest text-foreground/60 uppercase transition-colors hover:border-primary/50 hover:text-primary"
          >
            <Link href={secondaryAction.url}>{secondaryAction.label}</Link>
          </Button>
        ) : (
          ""
        )}
      </TronCardContent>
    </TronCard>
  )
}
