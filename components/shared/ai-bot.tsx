import Script from "next/script"

export function AIBot() {
  return (
    <Script
      id="timeweb-ai-bot"
      async
      src="https://timeweb.cloud/api/v1/cloud-ai/agents/691eb2a3-0546-4f7b-8810-e0288b58e52d/embed.js?collapsed=true"
      strategy="afterInteractive"
    />
  )
}
