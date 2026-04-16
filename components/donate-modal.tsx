"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { Dictionary, profile } from "@/lib/i18n";

export function DonateModal({ dict }: { dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-full border border-zinc-300 px-5 py-3 text-sm text-zinc-700 transition-all hover:border-zinc-900 hover:text-zinc-950"
      >
        {dict.modal.open}
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-6">
          <div className="w-full max-w-xl rounded-[2rem] border border-zinc-200 bg-stone-50 p-8 shadow-2xl">
            <div className="mb-8 flex items-start justify-between gap-6">
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">
                  {dict.modal.eyebrow}
                </p>
                <h3 className="font-editorial text-3xl text-zinc-950">
                  {dict.modal.title}
                </h3>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-zinc-300 p-2 text-zinc-600 transition-colors hover:text-zinc-950"
                aria-label={dict.modal.close}
              >
                <X size={18} />
              </button>
            </div>

            <p className="max-w-2xl text-base leading-8 text-zinc-700">
              {dict.donate.intro}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={profile.links.paypal}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center rounded-full bg-zinc-950 px-6 py-3 text-sm text-white transition-opacity hover:opacity-90"
              >
                {dict.modal.paypal}
              </a>

              <button
                onClick={() => setOpen(false)}
                className="inline-flex items-center rounded-full border border-zinc-300 px-6 py-3 text-sm text-zinc-700 transition-all hover:border-zinc-900 hover:text-zinc-950"
              >
                {dict.modal.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
