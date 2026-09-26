"use client";

import { useId, useState, type FormEvent } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterForm({
  finePrint,
}: {
  finePrint?: string;
}) {
  const reactId = useId();
  const inputId = `email-${reactId}`;
  const errorId = `email-error-${reactId}`;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    if (!emailPattern.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  if (status === "success") {
    return (
      <p role="status" className="font-serif text-3xl leading-tight">
        You are on the list. We write on Sundays.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <label
        htmlFor={inputId}
        className="mb-2 block text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted"
      >
        Email
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          id={inputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="Your email"
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? errorId : undefined}
          className="h-12 w-full border-b border-ink/35 bg-transparent text-base text-ink outline-none placeholder:text-muted focus:border-ink sm:max-w-sm"
        />
        <button type="submit" className="btn-primary sm:shrink-0">
          Subscribe
        </button>
      </div>
      {status === "error" ? (
        <p id={errorId} role="alert" className="mt-3 text-sm">
          That email does not look right.
        </p>
      ) : null}
      {finePrint ? <p className="mt-4 text-sm text-muted">{finePrint}</p> : null}
    </form>
  );
}
