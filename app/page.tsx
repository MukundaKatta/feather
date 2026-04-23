"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
    } catch {
      // silently fail — user already sees confirmation
    }
  }

  return (
    <>
      {/* Nav */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-500" />
          Feather
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <a href="#demo" className="hidden sm:inline hover:opacity-70">
            See a demo
          </a>
          <Link
            href="/try"
            className="hidden sm:inline hover:opacity-70"
          >
            Try it
          </Link>
          <a
            href="#waitlist"
            className="rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Get early access
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[500px] bg-gradient-to-b from-slate-100 via-slate-50 to-transparent opacity-60" />
        <div className="mx-auto max-w-4xl px-6 pt-20 pb-20 text-center sm:pt-28">
          <p className="mb-5 inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700">
            Productivity
          </p>
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-7xl">
            The CRM built for a team of one.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600 sm:text-xl">
            Freelancers, consultants, solo founders. Track clients, deals, and
            follow-ups without Salesforce-level pain.
          </p>

          {!submitted ? (
            <form
              id="waitlist"
              onSubmit={handleSubmit}
              className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
            >
              <input
                type="email"
                placeholder="you@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-full border border-neutral-300 bg-white px-5 py-3.5 text-base placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-4 focus:ring-neutral-900/10 sm:w-80"
              />
              <button
                type="submit"
                className="rounded-full bg-neutral-900 px-7 py-3.5 font-medium text-white transition hover:bg-neutral-700"
              >
                Join the waitlist
              </button>
            </form>
          ) : (
            <p className="mt-12 text-sm font-medium text-slate-700">
              Thanks. We will ping you the day we launch.
            </p>
          )}

          <p className="mt-6 text-xs text-neutral-400">
            Early access list is open. First 100 get in free forever.
          </p>
        </div>
      </section>

      {/* Demo */}
      <section id="demo" className="border-y border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
              Live preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              See it in action
            </h2>
          </div>
          <div className="mt-12">
            <div className="mx-auto max-w-2xl rounded-3xl border border-neutral-200 bg-white shadow-sm overflow-hidden">
              <div className="border-b border-neutral-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900">
                Nudges waiting for you &middot; 3
              </div>
              <div className="divide-y divide-neutral-200">
                <DemoRow
                  gradient="from-slate-400 to-slate-600"
                  name="Sarah at Figma"
                  detail="haven&rsquo;t spoken in 43 days"
                  sub="Last chat: she was hiring a PM. Check in?"
                  action="Draft email"
                />
                <DemoRow
                  gradient="from-amber-300 to-red-400"
                  name="Jordan Patel"
                  detail="invoice overdue 14 days"
                  sub="$4,200 · usually pays within a week of prompt"
                  action="Send reminder"
                />
                <DemoRow
                  gradient="from-emerald-300 to-teal-500"
                  name="Priya Desai"
                  detail="birthday tomorrow"
                  sub="Her son's name is Arun. She just moved to Austin."
                  action="Write note"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What you get
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <Feature
              icon="💼"
              title="Contacts that remember"
              desc="Last conversation, birthday, kids' names, what they invoice. All one click away."
            />
            <Feature
              icon="🔔"
              title="Nudges when it matters"
              desc="Haven't spoken to your best client in six weeks? We'll tell you. Gently."
            />
            <Feature
              icon="📊"
              title="Pipeline at a glance"
              desc="Six deals in flight, three at risk, ten in onboarding. See it all on one screen."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-neutral-200 bg-neutral-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-slate-600">
              How it works
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps. No learning curve.
            </h2>
          </div>
          <div className="mt-12 grid gap-12 sm:grid-cols-3">
            <Step n={1} title="Sign up in seconds" desc="Email only. No credit card. You're in before you can overthink it." />
            <Step n={2} title="Set up your context" desc="Tell us what you're working on. The whole product tunes around that." />
            <Step n={3} title="Get value on day one" desc="Not week two. Day one. That's how fast you'll know it's working." />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-4xl px-6 py-28 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
          Be the first in line.
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-neutral-600">
          Early access starts soon. Get on the list and we will reach out the
          moment we open the doors.
        </p>
        <a
          href="#waitlist"
          className="mt-8 inline-block rounded-full bg-slate-600 px-7 py-3.5 font-medium text-white transition hover:bg-slate-700"
        >
          Reserve my spot
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-slate-500" />
            Feather
          </p>
          <p>&copy; 2026</p>
        </div>
      </footer>
    </>
  );
}

function DemoRow({
  gradient,
  name,
  detail,
  sub,
  action,
}: {
  gradient: string;
  name: string;
  detail: string;
  sub: string;
  action: string;
}) {
  return (
    <div className="flex items-start gap-3 p-4">
      <div className={`h-8 w-8 rounded-full bg-gradient-to-br ${gradient}`} />
      <div className="flex-1 text-sm">
        <div>
          <strong>{name}</strong> &middot; {detail}
        </div>
        <div className="mt-1 text-xs text-neutral-500">{sub}</div>
      </div>
      <button className="text-xs text-slate-600 hover:text-slate-900">
        {action}
      </button>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div>
      <div className="text-3xl">{icon}</div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 leading-relaxed text-neutral-600">{desc}</p>
    </div>
  );
}

function Step({ n, title, desc }: { n: number; title: string; desc: string }) {
  return (
    <div>
      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-slate-700">
        {n}
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 leading-relaxed text-neutral-600">{desc}</p>
    </div>
  );
}
