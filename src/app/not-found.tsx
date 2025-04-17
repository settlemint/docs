"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after a short delay
    const redirectTimer = setTimeout(() => {
      router.push("/");
    }, 100);

    return () => clearTimeout(redirectTimer);
  }, [router]);

  return null; // No UI needed as we're redirecting immediately
}
