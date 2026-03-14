"use client";

import Image from "next/image";

const BORDER = "border-[#cccccc]";

const divisions = [
  {
    id: "ID_01",
    unit: "OPS",
    tag: "SOFTWARE-AGENTEN",
    function: "Autonome Prozess-Orchestrierung via API-Middleware. Kein manueller Eingriff.",
  },
  {
    id: "ID_02",
    unit: "SIGNALS",
    tag: "INTENT-DATEN",
    function: "Proprietäre B2B-Kaufsignale. Echtzeit. Vor dem Wettbewerb.",
  },
  {
    id: "ID_03",
    unit: "CORE",
    tag: "BITS TO ATOMS",
    function: "Cloud-Steuerung trifft Produktion. Edge Computing. Industrieautomation.",
  },
];

const params = [
  { key: "ARCHITEKTUR", value: "AUTONOM / DEZENTRAL" },
  { key: "ZIELGRUPPE", value: "B2B ENTERPRISE" },
  { key: "BETRIEB", value: "KONTINUIERLICH" },
  { key: "DATENHALTUNG", value: "ON-PREMISE / HYBRID" },
  { key: "QUALITÄTSSTUFE", value: "PRODUCTION-GRADE" },
  { key: "REAKTIONSZEIT", value: "< 24H" },
];

export default function Home() {
  return (
    <div className={`min-h-screen bg-[#e8e8e8] text-[#0a0a0a] font-sans antialiased`}>

      {/* ── HEADER ───────────────────────────────────────────── */}
      <header className={`border-b ${BORDER}`}>
        <div className="grid grid-cols-[1fr_auto] items-center px-0">
          <div className={`border-r ${BORDER} px-6 py-4`}>
            <Image
              src="/rawlogic-font-web3-black.png"
              alt="RawLogic"
              width={130}
              height={34}
              className="object-contain"
              priority
            />
          </div>
          <div className="px-6 py-4">
            <a href="#kontakt" className="font-mono text-[11px] tracking-[0.18em] text-[#0a0a0a]/50 uppercase transition-colors hover:text-[#0a0a0a]">
              [ KONTAKT ]
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={`border-b ${BORDER}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px]">

          {/* Left: Headline */}
          <div className={`border-b lg:border-b-0 lg:border-r ${BORDER} px-6 pt-16 pb-14`}>
            <h1 className="text-[clamp(2.6rem,7.5vw,6.5rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#0a0a0a] uppercase mb-10">
              AUTONOME<br />INFRA-<br />STRUKTUR.
            </h1>
            <div className="flex items-center gap-3 mb-12">
              <span className="h-2 w-2 rounded-full bg-red-600 shrink-0" />
              <p className="font-mono text-[11px] tracking-[0.1em] text-[#0a0a0a]/45">
                [ STAND: 14.03.2026 // SYSTEM_STATUS: ONLINE ]
              </p>
            </div>
            <a
              href="#kontakt"
              className={`inline-block border ${BORDER} border-[#0a0a0a] px-6 py-3 font-mono text-[11px] tracking-[0.2em] uppercase text-[#0a0a0a] transition-all hover:bg-[#0a0a0a] hover:text-[#e8e8e8]`}
            >
              [ ZUGANG_ANFRAGEN ]
            </a>
          </div>

          {/* Right: System block */}
          <div className="px-6 pt-8 pb-8">
            <p className={`font-mono text-[9px] tracking-[0.22em] text-[#0a0a0a]/30 uppercase mb-0 pb-3 border-b ${BORDER}`}>
              SYSTEMPARAMETER
            </p>
            <div className="divide-y divide-[#cccccc]">
              {params.map(({ key, value }) => (
                <div key={key} className="flex justify-between items-baseline py-3">
                  <span className="font-mono text-[10px] text-[#0a0a0a]/35">{key}</span>
                  <span className="font-mono text-[10px] text-[#0a0a0a]/70">{value}</span>
                </div>
              ))}
            </div>

            <div className={`mt-6 pt-6 border-t ${BORDER}`}>
              <p className={`font-mono text-[9px] tracking-[0.18em] text-[#0a0a0a]/25 uppercase mb-3`}>MISSION_STATEMENT</p>
              <p className="font-mono text-[11px] leading-[1.75] text-[#0a0a0a]/50">
                WIR ERSETZEN KEINE MENSCHEN.<br />
                WIR ERSETZEN ROBOTERHAFTE PROZESSE.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── DIVISIONS ────────────────────────────────────────── */}
      <section id="divisionen" className={`border-b ${BORDER}`}>

        {/* Section header row */}
        <div className={`grid grid-cols-[4rem_6rem_10rem_1fr] border-b ${BORDER} bg-[#0a0a0a]/[0.03]`}>
          {["ID", "EINHEIT", "FUNKTION", "BESCHREIBUNG"].map((h, i) => (
            <div
              key={h}
              className={`px-4 py-3 font-mono text-[9px] tracking-[0.2em] text-[#0a0a0a]/30 uppercase ${i < 3 ? `border-r ${BORDER}` : ""}`}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        <div className={`divide-y divide-[#cccccc]`}>
          {divisions.map(({ id, unit, tag, function: fn }) => (
            <div key={id} className="grid grid-cols-[4rem_6rem_10rem_1fr]">
              <div className={`px-4 py-5 border-r ${BORDER} font-mono text-[10px] text-[#0a0a0a]/30 self-start pt-5`}>
                {id}
              </div>
              <div className={`px-4 py-5 border-r ${BORDER} font-black text-sm tracking-[0.04em] text-[#0a0a0a] self-start`}>
                {unit}
              </div>
              <div className={`px-4 py-5 border-r ${BORDER} self-start`}>
                <span className={`inline-block border ${BORDER} px-2 py-1 font-mono text-[9px] tracking-[0.14em] text-[#0a0a0a]/50`}>
                  [ {tag} ]
                </span>
              </div>
              <div className="px-4 py-5 font-mono text-[11px] leading-[1.7] text-[#0a0a0a]/50 self-start">
                {fn}
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── KONTAKT ──────────────────────────────────────────── */}
      <section id="kontakt" className={`border-b ${BORDER}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2">

          <div className={`border-b lg:border-b-0 lg:border-r ${BORDER} px-6 py-16`}>
            <p className="font-mono text-[9px] tracking-[0.22em] text-[#0a0a0a]/25 uppercase mb-6">
              KONTAKT_AUFNEHMEN
            </p>
            <h2 className="text-4xl font-black leading-[0.92] tracking-tight text-[#0a0a0a] uppercase sm:text-5xl mb-8">
              ROBOTER-<br />HAFTE<br />PROZESSE<br />ELIMINIEREN.
            </h2>
            <a
              href="mailto:hello@rawlogic.io"
              className={`inline-block border ${BORDER} border-[#0a0a0a] px-6 py-3 font-mono text-[11px] tracking-[0.2em] uppercase text-[#0a0a0a] transition-all hover:bg-[#0a0a0a] hover:text-[#e8e8e8]`}
            >
              [ ZUGANG_ANFRAGEN ]
            </a>
          </div>

          <div className="px-6 py-16">
            <p className="font-mono text-[9px] tracking-[0.22em] text-[#0a0a0a]/25 uppercase mb-6">
              DIREKTKONTAKT
            </p>
            <div className={`divide-y divide-[#cccccc]`}>
              {[
                { label: "E-MAIL", value: "hello@rawlogic.io" },
                { label: "ANTWORTZEIT", value: "< 24 STUNDEN" },
                { label: "FORMAT", value: "STRATEGIEGESPRÄCH" },
                { label: "KOSTEN", value: "UNVERBINDLICH" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-baseline py-4">
                  <span className="font-mono text-[10px] text-[#0a0a0a]/30">{label}</span>
                  <span className="font-mono text-[10px] text-[#0a0a0a]/65">{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer>
        <div className="grid grid-cols-[1fr_auto] items-center px-0">
          <div className={`border-r ${BORDER} px-6 py-5`}>
            <Image
              src="/rawlogic-font-web3-black.png"
              alt="RawLogic"
              width={90}
              height={24}
              className="object-contain opacity-20"
            />
          </div>
          <div className="px-6 py-5">
            <span className="font-mono text-[10px] tracking-[0.14em] text-[#0a0a0a]/25">
              © 2026 RAWLOGIC
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
