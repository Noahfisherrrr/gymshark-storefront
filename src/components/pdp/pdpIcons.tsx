import type { ReactNode, SVGProps } from 'react'

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number
  children?: ReactNode
}

function Icon({ size = 20, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  )
}

export function StarIcon({
  size = 16,
  filled = true,
  className = '',
}: {
  size?: number
  filled?: boolean
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function RulerIcon(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="m21.12 6.88-3.76-3.76a2.12 2.12 0 0 0-3 0L2.88 14.6a2.12 2.12 0 0 0 0 3l3.76 3.76a2.12 2.12 0 0 0 3 0L21.12 9.88a2.12 2.12 0 0 0 0-3Z" />
      <path d="m6.5 11.5 2 2" />
      <path d="m9.5 8.5 2 2" />
      <path d="m12.5 5.5 2 2" />
      <path d="m15.5 2.5 2 2" />
    </Icon>
  )
}

export function TruckIcon(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.62l-3.48-4.35A1 1 0 0 0 17.52 8H14v10" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </Icon>
  )
}

export function RefreshIcon(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      <path d="M3 21v-5h5" />
    </Icon>
  )
}

export function ShareIcon(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </Icon>
  )
}

export function ZoomIcon(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
      <line x1="11" y1="8" x2="11" y2="14" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </Icon>
  )
}

export function CheckCircleIcon(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </Icon>
  )
}

export function ShieldIcon(p: IconProps) {
  return (
    <Icon {...p}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </Icon>
  )
}

export function ThumbsUpIcon({ filled = false, ...p }: IconProps & { filled?: boolean }) {
  return (
    <Icon {...p} fill={filled ? 'currentColor' : 'none'}>
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h3v0a4 4 0 0 0 .8-2.4L8.76 3.6a2 2 0 0 1 3.92.88L12 9" />
    </Icon>
  )
}

export function PlayIcon(p: IconProps) {
  return (
    <Icon {...p} fill="currentColor">
      <polygon points="5 3 19 12 5 21 5 3" />
    </Icon>
  )
}

export function PauseIcon(p: IconProps) {
  return (
    <Icon {...p} fill="currentColor">
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </Icon>
  )
}

export function InfoIcon(p: IconProps) {
  return (
    <Icon {...p}>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 11v5" />
      <circle cx="12" cy="8" r="0.6" fill="currentColor" />
    </Icon>
  )
}

export function VolumeIcon({ muted = false, ...p }: IconProps & { muted?: boolean }) {
  return (
    <Icon {...p}>
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      {muted ? (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </>
      )}
    </Icon>
  )
}
