import Image from "next/image";
import type { ReactNode } from "react";
import LetsTalkButton from "./LetsTalkButton";

type Props = {
  title?: ReactNode;
  subtitle?: string;
  buttonText?: string;
  icon?: "logo" | "plane" | "headset";
};

function Icon({ icon }: { icon: "logo" | "plane" | "headset" }) {
  if (icon === "logo") {
    return (
      <Image
        src="/logo/faah_logo_512x512.png"
        alt=""
        width={44}
        height={44}
        className="hidden h-11 w-11 shrink-0 object-contain sm:block"
      />
    );
  }

  const path =
    icon === "plane" ? (
      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
    ) : (
      <>
        <path d="M4 15v-3a8 8 0 0116 0v3" />
        <rect x="2" y="14" width="5" height="7" rx="1.5" />
        <rect x="17" y="14" width="5" height="7" rx="1.5" />
        <path d="M20 21a4 4 0 01-4 3h-2" />
      </>
    );

  return (
    <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/50 text-gold sm:flex">
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {path}
      </svg>
    </span>
  );
}

export default function CtaBanner({
  title = (
    <>
      Have a Project in Mind? <span className="text-gold">Let&apos;s Talk.</span>
    </>
  ),
  subtitle = "Share your vision with us, and we'll help you bring it to life with creative technology solutions.",
  buttonText = "LET'S TALK",
  icon = "logo",
}: Props) {
  return (
    <div className="section pt-0">
      <div
        className="rgb-box relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-xl px-8 py-10 sm:flex-row"
        style={{ ["--box-fill" as string]: "#ffffff" }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl"
        />
        <div className="relative flex items-center gap-4 text-center sm:text-left">
          <Icon icon={icon} />
          <div>
            <h3 className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {title}
            </h3>
            <p className="mt-1 text-sm text-muted">{subtitle}</p>
          </div>
        </div>
        <LetsTalkButton label={buttonText} wrapperClassName="relative shrink-0" />
      </div>
    </div>
  );
}
