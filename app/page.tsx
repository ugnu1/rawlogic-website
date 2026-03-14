"use client";

import Image from "next/image";
import LatticeSection from "./components/LatticeSection";

const divisions = [
  {
    name: "RAWLOGIC OPS",
    tag: "Agenten & Middleware",
    hook: "Stoppt manuelle Routineaufgaben.",
    description:
      "Autonome Software-Agenten übernehmen repetitive Prozesse vollständig — von der API-Integration bis zur Workflow-Orchestrierung. Ihr Team fokussiert sich auf das, was wirklich zählt.",
  },
  {
    name: "RAWLOGIC SIGNALS",
    tag: "Proprietäre Intent-Daten",
    hook: "Findet Kunden, bevor sie suchen.",
    description:
      "Proprietäre Echtzeit-Signale aus dem digitalen Kaufverhalten Ihrer Zielgruppe. Wir verwandeln Marktlärm in präzise Kaufabsichten — und liefern sie, bevor Ihr Wettbewerb reagiert.",
  },
  {
    name: "RAWLOGIC CORE",
    tag: "Bits to Atoms",
    hook: "Verbindet digitale Logik mit physischer Produktion.",
    description:
      "Wir schließen die Lücke zwischen Cloud-Systemen und industrieller Fertigung: Steuerungslogik, Edge Computing und Produktionsautomation aus einer Hand.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#e8e8e8] text-zinc-900 font-sans antialiased">

      {/* ── HEADER ─────────────────────────────────────────── */}
      <header className="border-b border-zinc-300">
        <div className="flex items-stretch">
          <div className="flex-1 border-r border-zinc-300 px-6 py-5">
            <Image
              src="/rawlogic-font-web3-black.png"
              alt="RawLogic"
              width={130}
              height={34}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center px-6 py-5">
            <a
              href="#kontakt"
              className="font-mono text-xs tracking-widest text-zinc-600 uppercase transition-colors hover:text-zinc-900"
            >
              Kontakt
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section className="border-b border-zinc-300">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-0">

          {/* Headline */}
          <div className="border-b lg:border-b-0 lg:border-r border-zinc-300 p-8 sm:p-12 lg:p-16">
            <h1 className="text-[2.6rem] sm:text-[3.8rem] lg:text-[5rem] font-black leading-[0.9] tracking-[-0.03em] text-zinc-900 uppercase mb-8">
              AUTONOME<br />INFRA-<br />STRUKTUR.
            </h1>

            <p className="text-xl sm:text-2xl leading-relaxed text-zinc-800 mb-12 max-w-lg font-normal">
              Infrastruktur, die sich selbst verwaltet und aktiv skaliert.
            </p>

            <a
              href="#kontakt"
              className="inline-block bg-zinc-900 text-white px-8 py-4 text-sm font-semibold tracking-wide rounded-sm transition-colors hover:bg-zinc-700"
            >
              Zugang anfragen
            </a>
          </div>

          {/* System params */}
          <div className="p-8 sm:p-10">
            <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase pb-4 border-b border-zinc-300">
              Systemparameter
            </p>
            <div className="divide-y divide-zinc-300">
              {[
                { key: "Architektur", value: "Autonom / Dezentral" },
                { key: "Zielgruppe", value: "B2B Enterprise" },
                { key: "Betrieb", value: "Kontinuierlich" },
                { key: "Datenhaltung", value: "On-Premise / Hybrid" },
                { key: "Qualitätsstufe", value: "Production-Grade" },
                { key: "Reaktionszeit", value: "< 24 Stunden" },
              ].map(({ key, value }) => (
                <div key={key} className="flex justify-between items-baseline py-3.5 gap-4">
                  <span className="font-mono text-xs text-zinc-500 shrink-0">{key}</span>
                  <span className="font-mono text-xs text-zinc-900 text-right font-semibold">{value}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-8 border-t border-zinc-300">
              <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-4">Mission</p>
              <p className="text-base leading-relaxed text-zinc-700">
                Wir ersetzen keine Menschen.{" "}
                <span className="text-zinc-900 font-semibold">Wir ersetzen roboterhafte Prozesse.</span>
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── LATTICE ANIMATION ──────────────────────────────── */}
      <LatticeSection />

      {/* ── TRUST STRIP ────────────────────────────────────── */}
      <div className="border-b border-zinc-300 bg-zinc-200/60 px-6 py-4">
        <p className="font-mono text-xs tracking-widest text-zinc-600 uppercase text-center">
          Zertifizierte Datensicherheit &nbsp;·&nbsp; Hosted in Germany
        </p>
      </div>

      {/* ── DIVISIONEN ─────────────────────────────────────── */}
      <section id="divisionen" className="border-b border-zinc-300">

        <div className="border-b border-zinc-300 bg-zinc-200/60 px-8 py-5 sm:px-12">
          <p className="font-mono text-xs tracking-widest text-zinc-600 uppercase">
            Divisionen &nbsp;·&nbsp; 03 Einheiten aktiv
          </p>
        </div>

        <div className="divide-y divide-zinc-300">
          {divisions.map(({ name, tag, hook, description }) => (
            <div key={name} className="p-8 sm:p-12">
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-5 mb-4">
                <h3 className="text-2xl font-black tracking-tight text-zinc-900 uppercase">
                  {name}
                </h3>
                <span className="font-mono text-xs tracking-wide text-zinc-500 border border-zinc-300 px-2.5 py-1 self-start sm:self-auto">
                  {tag}
                </span>
              </div>
              <p className="text-lg font-semibold text-zinc-900 mb-3">{hook}</p>
              <p className="text-base leading-relaxed text-zinc-700 max-w-2xl">
                {description}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* ── KENNZAHLEN ─────────────────────────────────────── */}
      <section className="border-b border-zinc-300">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-300">
          {[
            { label: "Zero Human Bottleneck", sub: "Prozesse ohne manuelle Freigaben" },
            { label: "Data Sovereignty", sub: "Ihre Daten, Ihre Kontrolle" },
            { label: "Production-Grade", sub: "Enterprise-Qualität ab Tag 1" },
          ].map(({ label, sub }) => (
            <div key={label} className="p-8 sm:p-10">
              <p className="text-base font-bold text-zinc-900 mb-1.5">{label}</p>
              <p className="font-mono text-xs text-zinc-500">{sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── KONTAKT ────────────────────────────────────────── */}
      <section id="kontakt" className="border-b border-zinc-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          <div className="border-b lg:border-b-0 lg:border-r border-zinc-300 p-8 sm:p-12 lg:p-16">
            <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-6">
              Kontakt aufnehmen
            </p>
            <h2 className="text-3xl sm:text-4xl font-black leading-[0.95] tracking-tight text-zinc-900 uppercase mb-10">
              ROBOTERHAFTE<br />PROZESSE<br />ELIMINIEREN.
            </h2>
            <a
              href="mailto:hello@rawlogic.io"
              className="inline-block bg-zinc-900 text-white px-8 py-4 text-sm font-semibold tracking-wide rounded-sm transition-colors hover:bg-zinc-700"
            >
              Zugang anfragen
            </a>
          </div>

          <div className="p-8 sm:p-12 lg:p-16">
            <p className="font-mono text-xs tracking-widest text-zinc-500 uppercase mb-6">
              Direktkontakt
            </p>
            <div className="divide-y divide-zinc-300">
              {[
                { label: "E-Mail", value: "hello@rawlogic.io" },
                { label: "Antwortzeit", value: "< 24 Stunden" },
                { label: "Format", value: "Strategiegespräch" },
                { label: "Kosten", value: "Unverbindlich" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-baseline py-5 gap-4">
                  <span className="font-mono text-xs text-zinc-500 shrink-0">{label}</span>
                  <span className="text-sm font-semibold text-zinc-900 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────────── */}
      <footer>
        <div className="flex items-stretch">
          <div className="flex-1 border-r border-zinc-300 px-6 py-6">
            <Image
              src="/rawlogic-font-web3-black.png"
              alt="RawLogic"
              width={90}
              height={24}
              className="object-contain opacity-25"
            />
          </div>
          <div className="flex items-center px-6 py-6">
            <span className="font-mono text-xs text-zinc-500">
              © 2026 RawLogic
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
