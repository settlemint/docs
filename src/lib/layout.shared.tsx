import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Logo } from "@/components/logo/logo";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Logo className="w-32 mb-6" />,
    },
  };
}
