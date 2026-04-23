"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

const STAGES = ["Lead", "Call", "Proposal", "Won"] as const;
type Stage = (typeof STAGES)[number];

interface Deal {
  id: string;
  name: string;
  value: number;
  stage: Stage;
}

const STORAGE_KEY = "feather_deals";

function loadDeals(): Deal[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Deal[]) : [];
  } catch {
    return [];
  }
}

function saveDeals(deals: Deal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(deals));
}

export default function TryPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [mounted, setMounted] = useState(false);

  // Form state
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [stage, setStage] = useState<Stage>("Lead");

  useEffect(() => {
    setDeals(loadDeals());
    setMounted(true);
  }, []);

  const persist = useCallback((next: Deal[]) => {
    setDeals(next);
    saveDeals(next);
  }, []);

  function addDeal(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    const deal: Deal = {
      id: crypto.randomUUID(),
      name: name.trim(),
      value: parseFloat(value) || 0,
      stage,
    };
    persist([...deals, deal]);
    setName("");
    setValue("");
    setStage("Lead");
  }

  function moveDeal(id: string, direction: -1 | 1) {
    persist(
      deals.map((d) => {
        if (d.id !== id) return d;
        const idx = STAGES.indexOf(d.stage);
        const next = idx + direction;
        if (next < 0 || next >= STAGES.length) return d;
        return { ...d, stage: STAGES[next] };
      }),
    );
  }

  function removeDeal(id: string) {
    persist(deals.filter((d) => d.id !== id));
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center text-neutral-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Nav */}
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-500" />
          Feather
        </Link>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          Try mode &middot; localStorage only
        </span>
      </nav>

      <div className="mx-auto max-w-7xl px-6 pb-16">
        {/* Add deal form */}
        <form
          onSubmit={addDeal}
          className="mb-8 flex flex-wrap items-end gap-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
        >
          <div className="flex-1 min-w-[160px]">
            <label className="mb-1 block text-xs font-medium text-neutral-500">
              Deal name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Acme Corp redesign"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            />
          </div>
          <div className="w-32">
            <label className="mb-1 block text-xs font-medium text-neutral-500">
              Value ($)
            </label>
            <input
              type="number"
              min="0"
              step="any"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="5000"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm placeholder-neutral-400 focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            />
          </div>
          <div className="w-36">
            <label className="mb-1 block text-xs font-medium text-neutral-500">
              Stage
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value as Stage)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900/10"
            >
              {STAGES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="rounded-lg bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
          >
            Add deal
          </button>
        </form>

        {/* Kanban */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STAGES.map((stageCol) => {
            const colDeals = deals.filter((d) => d.stage === stageCol);
            const stageIdx = STAGES.indexOf(stageCol);
            return (
              <div
                key={stageCol}
                className="rounded-2xl border border-neutral-200 bg-white shadow-sm"
              >
                <div className="flex items-center justify-between border-b border-neutral-200 px-4 py-3">
                  <h3 className="text-sm font-semibold text-neutral-900">
                    {stageCol}
                  </h3>
                  <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-500">
                    {colDeals.length}
                  </span>
                </div>
                <div className="flex flex-col gap-2 p-3 min-h-[120px]">
                  {colDeals.length === 0 && (
                    <p className="py-6 text-center text-xs text-neutral-400">
                      No deals
                    </p>
                  )}
                  {colDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="rounded-xl border border-neutral-200 bg-neutral-50 p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-neutral-900">
                            {deal.name}
                          </p>
                          {deal.value > 0 && (
                            <p className="mt-0.5 text-xs text-neutral-500">
                              ${deal.value.toLocaleString()}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => removeDeal(deal.id)}
                          className="text-xs text-neutral-400 hover:text-red-500"
                          title="Remove deal"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="mt-2 flex gap-1">
                        {stageIdx > 0 && (
                          <button
                            onClick={() => moveDeal(deal.id, -1)}
                            className="rounded-md bg-white border border-neutral-200 px-2 py-1 text-xs text-neutral-600 transition hover:bg-neutral-100"
                          >
                            &larr; {STAGES[stageIdx - 1]}
                          </button>
                        )}
                        {stageIdx < STAGES.length - 1 && (
                          <button
                            onClick={() => moveDeal(deal.id, 1)}
                            className="rounded-md bg-white border border-neutral-200 px-2 py-1 text-xs text-neutral-600 transition hover:bg-neutral-100"
                          >
                            {STAGES[stageIdx + 1]} &rarr;
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Back to home + waitlist CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-neutral-500">
            This is a v0 demo &mdash; data lives in your browser only.
          </p>
          <div className="mt-4 flex items-center justify-center gap-4">
            <Link
              href="/"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              &larr; Back to home
            </Link>
            <a
              href="/#waitlist"
              className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-neutral-700"
            >
              Join the waitlist
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
