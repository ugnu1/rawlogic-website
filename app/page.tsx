"use client";

import Image from "next/image";

const BORDER = "border-[#cccccc]";
const T = "text-[#1a1a1a]";

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
    <div className="min-h-screen w-full overflow-x-hidden bg-[#e8e8e8] text-[#1a1a1a] font-sans antialiased">

      {/* ── HEADER ───────────────────────────────────────────── */}
      <header className={`border-b ${BORDER}`}>
        <div className="flex items-stretch">
          <div className={`flex-1 border-r ${BORDER} px-4 py-4 sm:px-6`}>
            <Image
              src="/rawlogic-font-web3-black.png"
              alt="RawLogic"
              width={120}
              height={32}
              className="object-contain"
              priority
            />
          </div>
          <div className="flex items-center px-4 py-4 sm:px-6">
            <a
              href="#kontakt"
              className={`font-mono text-[11px] tracking-[0.18em] ${T} opacity-55 uppercase transition-colors hover:opacity-100 whitespace-nowrap`}
            >
              [ KONTAKT ]
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className={`border-b ${BORDER}`}>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-0">

          {/* Left: Headline */}
          <div className={`border-b lg:border-b-0 lg:border-r ${BORDER} px-4 pt-12 pb-12 sm:px-6 sm:pt-16 sm:pb-14`}>
            <h1 className={`text-[2.6rem] sm:text-[3.5rem] lg:text-[clamp(3rem,6vw,6rem)] font-black leading-[0.9] tracking-[-0.04em] ${T} uppercase mb-8 break-words hyphens-auto`}>
              AUTONOME<br />INFRA-<br />STRUKTUR.
            </h1>
            <div className="flex items-center gap-3 mb-10">
              <span className="h-2 w-2 rounded-full bg-red-600 shrink-0" />
              <p className={`font-mono text-[10px] sm:text-[11px] tracking-[0.08em] ${T} opacity-60 break-all sm:break-normal`}>
                [ STAND: 14.03.2026 // SYSTEM_STATUS: ONLINE ]
              </p>
            </div>
            <a
              href="#kontakt"
              className={`inline-block border border-[#1a1a1a] px-5 py-3 sm:px-6 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase ${T} transition-colors hover:bg-[#1a1a1a] hover:text-[#e8e8e8]`}
            >
              [ ZUGANG_ANFRAGEN ]
            </a>
          </div>

          {/* Right: System params — hidden on mobile, visible lg+ */}
          <div className={`hidden lg:block px-6 pt-8 pb-8 border-t-0`}>
            <p className={`font-mono text-[9px] tracking-[0.22em] ${T} opacity-45 uppercase pb-3 border-b ${BORDER}`}>
              SYSTEMPARAMETER
            </p>
            <div className={`divide-y ${BORDER}`}>
              {params.map(({ key, value }) => (
                <div key={key} className="flex justify-between items-baseline py-3 gap-4">
                  <span className={`font-mono text-[10px] ${T} opacity-50 shrink-0`}>{key}</span>
                  <span className={`font-mono text-[10px] ${T} opacity-75 text-right`}>{value}</span>
                </div>
              ))}
            </div>
            <div className={`mt-6 pt-6 border-t ${BORDER}`}>
              <p className={`font-mono text-[9px] tracking-[0.18em] ${T} opacity-40 uppercase mb-3`}>MISSION_STATEMENT</p>
              <p className={`font-mono text-[11px] leading-[1.75] ${T} opacity-65`}>
                WIR ERSETZEN KEINE MENSCHEN.<br />
                WIR ERSETZEN ROBOTERHAFTE PROZESSE.
              </p>
            </div>
          </div>

          {/* Mission — mobile only, below headline */}
          <div className={`lg:hidden border-t ${BORDER} px-4 py-6 sm:px-6`}>
            <p className={`font-mono text-[9px] tracking-[0.18em] ${T} opacity-40 uppercase mb-3`}>MISSION_STATEMENT</p>
            <p className={`font-mono text-[11px] leading-[1.75] ${T} opacity-70`}>
              WIR ERSETZEN KEINE MENSCHEN.<br />
              WIR ERSETZEN ROBOTERHAFTE PROZESSE.
            </p>
          </div>

        </div>
      </section>

      {/* ── TRUST STRIP ──────────────────────────────────────── */}
      <div className={`border-b ${BORDER} bg-zinc-200/40 px-4 py-3`}>
        <p className={`font-mono text-[9px] tracking-[0.15em] sm:tracking-[0.2em] ${T} opacity-40 uppercase text-center`}>
          ZERTIFIZIERTE DATENSICHERHEIT &nbsp;//&nbsp; HOSTED IN GERMANY
        </p>
      </div>

      {/* ── DIVISIONS ────────────────────────────────────────── */}
      <section id="divisionen" className={`border-b ${BORDER}`}>

        {/* Table header — desktop only */}
        <div className={`hidden md:grid md:grid-cols-[5rem_7rem_11rem_1fr] border-b border-zinc-300 bg-zinc-200/50`}>
          {["ID", "EINHEIT", "FUNKTION", "BESCHREIBUNG"].map((h, i) => (
            <div
              key={h}
              className={`px-4 py-3 font-mono text-[9px] tracking-[0.2em] ${T} opacity-45 uppercase ${i < 3 ? "border-r border-[#cccccc]" : ""}`}
            >
              {h}
            </div>
          ))}
        </div>

        {/* Data rows */}
        <div className="divide-y divide-zinc-300">
          {divisions.map(({ id, unit, tag, function: fn }) => (
            <div key={id}>
              {/* Desktop: 4-column row */}
              <div className="hidden md:grid md:grid-cols-[5rem_7rem_11rem_1fr]">
                <div className={`px-4 py-5 border-r border-[#cccccc] font-mono text-[10px] ${T} opacity-45`}>
                  {id}
                </div>
                <div className={`px-4 py-5 border-r border-[#cccccc] font-black text-sm tracking-[0.04em] ${T}`}>
                  {unit}
                </div>
                <div className={`px-4 py-5 border-r border-[#cccccc]`}>
                  <span className={`inline-block border border-zinc-300 px-2 py-1 font-mono text-[9px] tracking-[0.14em] ${T} opacity-55`}>
                    {tag}
                  </span>
                </div>
                <div className={`px-4 py-5 font-mono text-[11px] leading-[1.7] ${T} opacity-65`}>
                  {fn}
                </div>
              </div>

              {/* Mobile: stacked */}
              <div className="md:hidden px-4 py-5 sm:px-6 flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className={`font-mono text-[9px] ${T} opacity-40`}>{id}</span>
                  <span className={`font-black text-sm tracking-[0.04em] ${T}`}>{unit}</span>
                  <span className={`ml-auto inline-block border border-zinc-300 px-2 py-0.5 font-mono text-[9px] tracking-[0.1em] ${T} opacity-55`}>
                    {tag}
                  </span>
                </div>
                <p className={`font-mono text-[11px] leading-[1.7] ${T} opacity-65 mt-1`}>{fn}</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ── KONTAKT ──────────────────────────────────────────── */}
      <section id="kontakt" className={`border-b ${BORDER}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

          <div className={`border-b lg:border-b-0 lg:border-r ${BORDER} px-4 py-12 sm:px-6 sm:py-16`}>
            <p className={`font-mono text-[9px] tracking-[0.22em] ${T} opacity-40 uppercase mb-6`}>
              KONTAKT_AUFNEHMEN
            </p>
            <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black leading-[0.92] tracking-tight ${T} uppercase mb-8 break-words`}>
              ROBOTER-<br />HAFTE<br />PROZESSE<br />ELIMINIEREN.
            </h2>
            <a
              href="mailto:hello@rawlogic.io"
              className={`inline-block border border-[#1a1a1a] px-5 py-3 sm:px-6 font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase ${T} transition-colors hover:bg-[#1a1a1a] hover:text-[#e8e8e8]`}
            >
              [ ZUGANG_ANFRAGEN ]
            </a>
          </div>

          <div className="px-4 py-12 sm:px-6 sm:py-16">
            <p className={`font-mono text-[9px] tracking-[0.22em] ${T} opacity-40 uppercase mb-6`}>
              DIREKTKONTAKT
            </p>
            <div className="divide-y divide-[#cccccc]">
              {[
                { label: "E-MAIL", value: "hello@rawlogic.io" },
                { label: "ANTWORTZEIT", value: "< 24 STUNDEN" },
                { label: "FORMAT", value: "STRATEGIEGESPRÄCH" },
                { label: "KOSTEN", value: "UNVERBINDLICH" },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-baseline py-4 gap-4">
                  <span className={`font-mono text-[10px] ${T} opacity-45 shrink-0`}>{label}</span>
                  <span className={`font-mono text-[10px] ${T} opacity-75 text-right`}>{value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────── */}
      <footer>
        <div className="flex items-stretch">
          <div className={`flex-1 border-r ${BORDER} px-4 py-5 sm:px-6`}>
            <Image
              src="/rawlogic-font-web3-black.png"
              alt="RawLogic"
              width={90}
              height={24}
              className="object-contain opacity-20"
            />
          </div>
          <div className="flex items-center px-4 py-5 sm:px-6">
            <span className={`font-mono text-[10px] tracking-[0.14em] ${T} opacity-40 whitespace-nowrap`}>
              © 2026 RAWLOGIC
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
