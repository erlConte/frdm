"use client";

import { FormEvent, useState } from "react";
import { Dictionary, profile } from "@/lib/i18n";

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const safeSubject = encodeURIComponent(
      subject || dict.contact.form.fallbackSubject
    );
    const safeBody = encodeURIComponent(
      `Name: ${name || "-"}\n\nMessage:\n${message || "-"}`
    );

    window.location.href = `mailto:${profile.email}?subject=${safeSubject}&body=${safeBody}`;
  };

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="mb-2 block text-sm text-zinc-700">
          {dict.contact.form.name}
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
          placeholder={dict.contact.form.placeholderName}
        />
      </div>

      <div>
        <label htmlFor="subject" className="mb-2 block text-sm text-zinc-700">
          {dict.contact.form.subject}
        </label>
        <input
          id="subject"
          type="text"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
          placeholder={dict.contact.form.placeholderSubject}
        />
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm text-zinc-700">
          {dict.contact.form.message}
        </label>
        <textarea
          id="message"
          rows={7}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-900"
          placeholder={dict.contact.form.placeholderMessage}
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center rounded-full bg-zinc-950 px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
      >
        {dict.contact.form.submit}
      </button>
    </form>
  );
}
