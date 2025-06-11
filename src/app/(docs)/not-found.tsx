"use client";

import Link from "next/link";
import { FileSearch } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <FileSearch className="mb-6 h-16 w-16 text-muted-foreground" />
      <h1 className="mb-2 text-4xl font-bold">Page Not Found</h1>
      <p className="mb-6 max-w-md text-muted-foreground">
        The documentation page you're looking for doesn't exist or has been moved.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
        >
          Go to Docs Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="rounded-md border border-border px-4 py-2 hover:bg-accent"
        >
          Go Back
        </button>
      </div>
    </div>
  );
}
