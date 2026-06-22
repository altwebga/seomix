import QRCode from "react-qr-code"

export default function SeomixQRCode() {
  const vCard = `BEGIN:VCARD
VERSION:3.0
N:;SEOMIX;;;
FN:SEOMIX
TEL:+79991234567
URL:https://seomix.ru/
END:VCARD`

  return (
    <div className="inline-flex rounded-xl bg-white p-4 shadow-lg">
      <QRCode value={vCard} size={256} className="h-64 w-64" />
    </div>
  )
}
