interface IconProps {
  size?: number;
  className?: string;
}

function Svg({ size = 24, className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 5v14M5 12h14" />
    </Svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M5 12h14" />
    </Svg>
  );
}

export function SlidersIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M4 7h10M18 7h2M4 12h3M11 12h9M4 17h12M20 17h0" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="9" cy="12" r="2" />
      <circle cx="18" cy="17" r="2" />
    </Svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </Svg>
  );
}
export function GitHubIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M15.5 21v-3.2c0-1-.3-1.7-.7-2.1 2.6-.3 5.2-1.3 5.2-5.7 0-1.3-.4-2.3-1.2-3.1.1-.3.5-1.5-.1-3.1 0 0-1-.3-3.2 1.2a11 11 0 0 0-5.8 0C7.5 3.5 6.5 3.8 6.5 3.8c-.6 1.6-.2 2.8-.1 3.1-.8.8-1.2 1.8-1.2 3.1 0 4.4 2.6 5.4 5.2 5.7-.3.3-.6.8-.7 1.6V21" />
      <path d="M9.7 17.6c-2.6.8-3.5-1.1-4.7-1.5" />
    </Svg>
  );
}
