// Small badge-style payment icons for the footer. These are generic,
// hand-drawn approximations of each network's colors/wordmark — not traced
// copies of the official brand assets — so the footer reads as "which
// networks" without pretending to be Gymshark's or the networks' own art.
// See config/store.js for the "no live integration implied" note (Brief.md #9).

import type { ReactNode } from 'react'

function Badge({ bg = '#FFFFFF', children }: { bg?: string; children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 30" className="h-6 w-10 shrink-0" aria-hidden="true" focusable="false">
      <rect x="0.5" y="0.5" width="47" height="29" rx="4" fill={bg} stroke="rgba(0,0,0,0.08)" />
      {children}
    </svg>
  )
}

interface WordmarkProps {
  children: ReactNode
  fill: string
  italic?: boolean
  size?: number | string
  letterSpacing?: number | string
}

function Wordmark({ children, fill, italic = false, size = 11, letterSpacing = 0 }: WordmarkProps) {
  return (
    <text
      x="24"
      y="19.5"
      textAnchor="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight="700"
      fontStyle={italic ? 'italic' : 'normal'}
      fontSize={size}
      letterSpacing={letterSpacing}
      fill={fill}
    >
      {children}
    </text>
  )
}

export const VisaIcon = () => (
  <Badge>
    <Wordmark fill="#1A1F71" italic size={13}>
      VISA
    </Wordmark>
  </Badge>
)

export const MastercardIcon = () => (
  <Badge>
    <circle cx="20" cy="15" r="8.5" fill="#EB001B" />
    <circle cx="28" cy="15" r="8.5" fill="#F79E1B" fillOpacity="0.9" />
  </Badge>
)

export const PaypalIcon = () => (
  <Badge>
    <text x="24" y="19" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontStyle="italic" fontSize="10.5">
      <tspan fill="#003087">Pay</tspan>
      <tspan fill="#009CDE">Pal</tspan>
    </text>
  </Badge>
)

export const ApplePayIcon = () => (
  <Badge>
    <path
      d="M14.3 11.8c.6-.7 1-1.7.9-2.7-.9.1-1.9.6-2.5 1.3-.5.6-1 1.6-.9 2.5 1 .1 1.9-.5 2.5-1.1Z"
      fill="#000000"
    />
    <path
      d="M14.7 12.2c-1.4-.1-2.5.8-3.2.8-.6 0-1.6-.7-2.6-.7-1.4 0-2.7.8-3.4 2.1-1.4 2.5-.4 6.3 1.1 8.4.7 1 1.5 2.1 2.6 2.1 1 0 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1 0 1.9-1 2.5-2 .4-.6.6-1 1-1.6-2.6-1-2.6-4.3-.5-5.6-.6-.9-1.9-1.4-2.7-1.5Z"
      fill="#000000"
    />
    <text x="31" y="19" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="600" fontSize="10" fill="#000000">
      Pay
    </text>
  </Badge>
)

export const AmexIcon = () => (
  <Badge bg="#2E77BC">
    <Wordmark fill="#FFFFFF" size="8.5" letterSpacing="0.3">
      AMEX
    </Wordmark>
  </Badge>
)

export const KlarnaIcon = () => (
  <Badge bg="#FFB3C7">
    <Wordmark fill="#17120F" size="9.5">
      Klarna
    </Wordmark>
  </Badge>
)

export const AfterpayIcon = () => (
  <Badge bg="#B2FCE4">
    <text x="24" y="19" textAnchor="middle" fontFamily="Arial, Helvetica, sans-serif" fontWeight="700" fontSize="8.5" fill="#000000">
      afterpay
    </text>
  </Badge>
)

export const SezzleIcon = () => (
  <Badge bg="#8339EC">
    <Wordmark fill="#FFFFFF" size="9.5">
      Sezzle
    </Wordmark>
  </Badge>
)
