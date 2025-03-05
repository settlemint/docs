"use client";

import Script from "next/script";

export function PlainChat() {
  return (
    <Script
      src="https://chat.cdn-plain.com/index.js"
      strategy="afterInteractive"
      onLoad={() => {
        // @ts-expect-error: Plain is not typed
        Plain.init({
          appId: "liveChatApp_01JNGR79CXQ8D26364V6CDD6WQ",
          requireAuthentication: true,
          hideBranding: true,
        });
      }}
    />
  );
}
