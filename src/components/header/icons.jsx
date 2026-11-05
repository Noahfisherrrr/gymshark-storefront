function Icon({ size = 24, children, ...props }) {
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

export const SearchIcon = (p) => (
  <Icon {...p}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="M15.5 15.5 20 20" />
  </Icon>
)

export const HeartIcon = (p) => (
  <Icon {...p}>
    <path d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.1a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
  </Icon>
)

export const HeartFilledIcon = (p) => (
  <Icon {...p} fill="currentColor">
    <path d="M12 20s-7.5-4.6-7.5-10.1A4.4 4.4 0 0 1 12 7.1a4.4 4.4 0 0 1 7.5 2.8C19.5 15.4 12 20 12 20Z" />
  </Icon>
)

export const ProfileIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="8" r="3.75" />
    <path d="M4.75 20c.6-3.6 3.6-6 7.25-6s6.65 2.4 7.25 6" />
  </Icon>
)

export const BagIcon = (p) => (
  <Icon {...p}>
    <path d="M5.25 8.25h13.5l-1 11.5H6.25l-1-11.5Z" />
    <path d="M8.75 8.25V7a3.25 3.25 0 0 1 6.5 0v1.25" />
  </Icon>
)

export const BagFilledIcon = (p) => (
  <Icon {...p}>
    <path d="M5.25 8.25h13.5l-1 11.5H6.25l-1-11.5Z" fill="currentColor" />
    <path d="M8.75 8.25V7a3.25 3.25 0 0 1 6.5 0v1.25" />
  </Icon>
)

export const MinusIcon = (p) => (
  <Icon {...p}>
    <path d="M6 12h12" />
  </Icon>
)

export const PlusIcon = (p) => (
  <Icon {...p}>
    <path d="M6 12h12M12 6v12" />
  </Icon>
)

export const InfoIcon = (p) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8.25" />
    <path d="M12 11v5" />
    <circle cx="12" cy="8" r="0.6" fill="currentColor" />
  </Icon>
)

export const MenuIcon = (p) => (
  <Icon {...p}>
    <path d="M3.75 7.5h16.5M3.75 12h16.5M3.75 16.5h16.5" />
  </Icon>
)

export const CloseIcon = (p) => (
  <Icon {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Icon>
)

export const ChevronRightIcon = (p) => (
  <Icon {...p}>
    <path d="m9.5 6 6 6-6 6" />
  </Icon>
)

export const ChevronLeftIcon = (p) => (
  <Icon {...p}>
    <path d="m14.5 6-6 6 6 6" />
  </Icon>
)

export const ChevronDownIcon = (p) => (
  <Icon {...p}>
    <path d="m6 9.5 6 6 6-6" />
  </Icon>
)

export const PauseIcon = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <rect x="7" y="5.5" width="3.25" height="13" rx="0.5" />
    <rect x="13.75" y="5.5" width="3.25" height="13" rx="0.5" />
  </Icon>
)

export const PlayIcon = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M8 5.5v13l10.5-6.5L8 5.5Z" />
  </Icon>
)
