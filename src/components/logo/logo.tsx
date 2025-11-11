"use client";

import { cn } from "@/lib/cn";
import { useTheme } from "next-themes";
import Image from "next/image";
import type { PropsWithChildren } from "react";
import { startTransition, useEffect, useState } from "react";
import LogoHorizontalDark from "./logos/settlemint-logo-h-dm.svg";
import LogoHorizontalLight from "./logos/settlemint-logo-h-lm.svg";
import LogoIconDark from "./logos/settlemint-logo-i-dm.svg";
import LogoIconLight from "./logos/settlemint-logo-i-lm.svg";
import LogoVerticalDark from "./logos/settlemint-logo-v-dm.svg";
import LogoVerticalLight from "./logos/settlemint-logo-v-lm.svg";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "vertical" | "icon";
}

export function Logo({
  className = "",
  variant = "horizontal",
}: PropsWithChildren<LogoProps>) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    startTransition(() => {
      setMounted(true);
    });
  }, []);

  if (!mounted) {
    return null;
  }

  const getLogoSrc = () => {
    const isDark = resolvedTheme === "dark";
    switch (variant) {
      case "horizontal":
        return isDark ? LogoHorizontalDark : LogoHorizontalLight;
      case "vertical":
        return isDark ? LogoVerticalDark : LogoVerticalLight;
      case "icon":
        return isDark ? LogoIconDark : LogoIconLight;
      default:
        return LogoHorizontalLight;
    }
  };

  return (
    <div className={cn("relative", className)}>
      <Image src={getLogoSrc()} alt="SettleMint" priority />
    </div>
  );
}
