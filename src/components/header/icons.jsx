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

// Footer social links — generic glyphs for each platform, not Gymshark's
// icon font.
export const DiscordIcon = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M8.3 6.8C9.8 6.1 11.3 6.1 12 6.1s2.2 0 3.7.7c1.3-1 2.7-1.2 2.7-1.2s.9 1.7 1 4.3c1 1.5 1 3.3 1 3.3s-1.3 2.3-4 2.9c0 0-.4-.5-.7-.9 1.3-.4 1.9-1 1.9-1-.5.3-1 .5-1.4.7-.6.3-1.2.5-1.8.6-1.2.3-2.4.3-3.5.3-1.2 0-2.3 0-3.5-.3-.6-.1-1.2-.3-1.8-.6-.4-.2-.9-.4-1.4-.7 0 0 .6.6 1.9 1-.3.4-.7.9-.7.9-2.7-.6-4-2.9-4-2.9s0-1.8 1-3.3c.2-2.6 1-4.3 1-4.3s1.4.2 2.7 1.2Zm.2 4.1c-.6 0-1.1.6-1.1 1.3s.5 1.3 1.1 1.3c.7 0 1.2-.6 1.2-1.3s-.5-1.3-1.2-1.3Zm6.9 0c-.6 0-1.1.6-1.1 1.3s.5 1.3 1.1 1.3c.7 0 1.2-.6 1.2-1.3s-.5-1.3-1.2-1.3Z" />
  </Icon>
)

export const FacebookIcon = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M14 8.5h1.75V5.9h-2.1C11.3 5.9 10 7.3 10 9.5v1.8H8v2.7h2v6.1h2.9v-6.1h2.1l.4-2.7h-2.5V9.6c0-.7.2-1.1 1.1-1.1Z" />
  </Icon>
)

export const PinterestIcon = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M12 4.5C7.9 4.5 5 7.3 5 10.7c0 2 .9 3.6 2.4 4.3.2.1.4 0 .5-.2l.2-.8c.1-.2 0-.3-.1-.5-.3-.4-.6-1-.6-1.9 0-2.4 1.9-4.6 4.9-4.6 2.6 0 4.1 1.6 4.1 3.7 0 2.8-1.2 5.1-3 5.1-1 0-1.7-.8-1.5-1.8.3-1.2.9-2.5.9-3.4 0-.8-.4-1.4-1.3-1.4-1 0-1.8 1.1-1.8 2.5 0 .9.3 1.5.3 1.5s-1 4.4-1.2 5.2c-.4 1.6-.1 3.5 0 3.7 0 .1.2.1.2 0 .1-.1 1.6-2 2.1-3.8.1-.5.7-2.7.7-2.7.3.7 1.3 1.3 2.3 1.3 3.1 0 5.2-2.8 5.2-6.6 0-2.9-2.4-5.6-6.3-5.6Z" />
  </Icon>
)

export const YoutubeIcon = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M20.5 8.6s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.8C15 5.6 12 5.6 12 5.6s-3 0-5.8.2c-.4 0-1.2 0-1.9.8-.6.6-.8 2-.8 2S3.3 10.2 3.3 11.9v1.6c0 1.7.2 3.3.2 3.3s.2 1.4.8 2c.7.8 1.7.7 2.1.8 1.5.1 6.6.2 6.6.2s3-.1 5.8-.2c.4 0 1.2 0 1.9-.8.6-.6.8-2 .8-2s.2-1.6.2-3.3v-1.6c0-1.7-.2-3.3-.2-3.3Zm-10.9 6V9.1l5.2 2.8-5.2 2.7Z" />
  </Icon>
)

export const InstagramIcon = (p) => (
  <Icon {...p}>
    <rect x="4.5" y="4.5" width="15" height="15" rx="4" />
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="16.3" cy="7.7" r="0.6" fill="currentColor" stroke="none" />
  </Icon>
)

export const TwitterIcon = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M20 6.4c-.6.3-1.3.5-2 .6.7-.4 1.3-1.1 1.5-2-.7.4-1.5.7-2.3.9a3.3 3.3 0 0 0-5.6 3v.4A8.2 8.2 0 0 1 5 6.6a3.3 3.3 0 0 0 1 4.4 3.2 3.2 0 0 1-1.5-.4c0 1.6 1.1 2.9 2.6 3.2a3.3 3.3 0 0 1-1.5.1 3.3 3.3 0 0 0 3.1 2.3 6.6 6.6 0 0 1-4.1 1.4H4a9.3 9.3 0 0 0 5 1.5c6 0 9.3-5 9.3-9.3v-.4c.7-.5 1.3-1.1 1.7-1.9Z" />
  </Icon>
)

export const TiktokIcon = (p) => (
  <Icon {...p} fill="currentColor" stroke="none">
    <path d="M15.5 4.5h-2.7v10.8a2.2 2.2 0 1 1-2.2-2.2c.2 0 .4 0 .5.1v-2.8a5 5 0 1 0 4.4 5V9.3a6 6 0 0 0 3.5 1.2V7.8a3.2 3.2 0 0 1-3.5-3.3Z" />
  </Icon>
)
