"use client";

import Image from "next/image";
import { Cpu, BarChart2, Factory } from "lucide-react";

const divisions = [
  {
    num: "01",
    icon: Cpu,
    name: "RAWLOGIC OPS",
    tagline: "AGENTS & MIDDLEWARE",
    description:
      "Autonome Software-Agenten orchestrieren interne Prozesse — API-Integration, Workflow-Automatisierung, keine manuellen Freigaben.",
    spec: "RUNTIME: CONTINUOUS",
  },
  {
    num: "02",
    icon: BarChart2,
    name: "RAWLOGIC SIGNALS",
    tagline: "PROPRIETARY INTENT DATA // B2B",
    description:
      "Echtzeit-Signale aus digitalem Kaufverhalten. Marktlärm destilliert zu präzisen Kaufabsichten — vor dem Wettbewerb.",
    spec: "LATENCY: <50ms",
  },
  {
    num: "03",
    icon: Factory,
    name: "RAWLOGIC CORE",
    tagline: "BITS TO ATOMS // CLOUD → PRODUCTION",
    description:
      "Cloud-Logik trifft physische Fertigung. Digitale Steuerungssysteme, Edge Computing, industrielle Automatisierung.",
    spec: "UPTIME: 99.97%",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#e5e5e5] text-[#0a0a0a] antialiased font-sans">

      {/* Nav */}
      <header className="border-b border-[#0a0a0a]/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Image
            src="/rawlogic-font-web3-black.png"
            alt="RawLogic"
            width={140}
            height={36}
            className="object-contain"
            priority
          />
          <nav className="hidden gap-10 sm:flex">
            <a href="#divisions" className="font-mono text-[11px] tracking-[0.15em] text-[#0a0a0a]/40 uppercase transition-colors hover:text-[#0a0a0a]">
              DIVISIONS
            </a>
            <a href="#contact" className="font-mono text-[11px] tracking-[0.15em] text-[#0a0a0a]/40 uppercase transition-colors hover:text-[#0a0a0a]">
              CONTACT
            </a>
          </nav>
          <a
            href="#contact"
            className="border border-[#0a0a0a]/30 px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[#0a0a0a]/60 transition-all hover:border-[#0a0a0a] hover:text-[#0a0a0a]"
          >
            REQUEST_ACCESS
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-28 pb-24">

        {/* Top status bar */}
        <div className="mb-16 flex items-center gap-3 border-b border-[#0a0a0a]/10 pb-5">
          {/* Red recording dot */}
          <span className="h-2 w-2 rounded-full bg-red-600 shrink-0" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#0a0a0a]/35 uppercase">
            SYS_STATUS: ONLINE
          </span>
          <span className="mx-2 font-mono text-[10px] text-[#0a0a0a]/20">—</span>
          <span className="font-mono text-[10px] tracking-[0.15em] text-[#0a0a0a]/25">
            BUILD V_01 // 2026
          </span>
        </div>

        {/* Main headline */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <h1 className="mb-8 text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#0a0a0a] uppercase">
              RAWLOGIC:<br />
              AUTONOMOUS<br />
              INFRASTRUCTURE.
            </h1>

            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-6 bg-[#0a0a0a]/25" />
              <p className="font-mono text-sm tracking-[0.1em] text-[#0a0a0a]/45">
                [V_01 // PROCESSING DATA INTO AUTOMATION]
              </p>
            </div>

            <a
              href="#contact"
              className="inline-block border border-[#0a0a0a] px-8 py-4 font-mono text-xs tracking-[0.22em] uppercase text-[#0a0a0a] transition-all hover:bg-[#0a0a0a] hover:text-[#e5e5e5]"
            >
              [ REQUEST_ACCESS ]
            </a>
          </div>

          {/* Side data column */}
          <div className="hidden border-l border-[#0a0a0a]/10 pl-10 lg:flex lg:flex-col lg:justify-between lg:w-52">
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#0a0a0a]/25 mb-4 uppercase">SYSTEM PARAMS</p>
              {[
                ["UNITS", "03 ACTIVE"],
                ["MODE", "AUTONOMOUS"],
                ["TARGET", "B2B ENTERPRISE"],
                ["CLASS", "PRODUCTION"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-t border-[#0a0a0a]/8 py-2.5">
                  <span className="font-mono text-[10px] text-[#0a0a0a]/30">{k}</span>
                  <span className="font-mono text-[10px] text-[#0a0a0a]/60">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 border border-[#0a0a0a]/10 p-4">
              <p className="font-mono text-[9px] tracking-[0.15em] text-[#0a0a0a]/25 uppercase mb-1">MISSION</p>
              <p className="font-mono text-[10px] leading-relaxed text-[#0a0a0a]/45">
                WIR ERSETZEN<br />KEINE MENSCHEN.<br />
                <span className="text-[#0a0a0a]/65">WIR ERSETZEN<br />ROBOTERHAFTE<br />PROZESSE.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#0a0a0a]/12" />

      {/* Divisions */}
      <section id="divisions" className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 flex items-center gap-4">
          <span className="h-2 w-2 rounded-full bg-red-600 shrink-0" />
          <span className="font-mono text-[10px] tracking-[0.22em] text-[#0a0a0a]/35 uppercase">
            DIVISION_INDEX // 03 UNITS
          </span>
        </div>

        <div className="divide-y divide-[#0a0a0a]/10">
          {divisions.map(({ num, icon: Icon, name, tagline, description, spec }) => (
            <div
              key={num}
              className="grid grid-cols-[2.5rem_1fr] gap-6 py-8 sm:grid-cols-[2.5rem_12rem_1fr_8rem]"
            >
              {/* Number */}
              <span className="font-mono text-xs text-[#0a0a0a]/20 pt-0.5">{num}</span>

              {/* Title */}
              <div>
                <div className="flex items-center gap-2.5 mb-1">
                  <Icon size={13} className="text-[#0a0a0a]/40 shrink-0" />
                  <span className="font-black text-sm tracking-[0.06em] text-[#0a0a0a]">{name}</span>
                </div>
                <p className="font-mono text-[9px] tracking-[0.14em] text-[#0a0a0a]/30">{tagline}</p>
              </div>

              {/* Description */}
              <p className="text-sm leading-[1.75] text-[#0a0a0a]/50 self-start">
                {description}
              </p>

              {/* Spec */}
              <div className="hidden sm:flex sm:justify-end sm:items-start">
                <span className="border border-[#0a0a0a]/15 px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-[#0a0a0a]/35">
                  {spec}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#0a0a0a]/12" />

      {/* Params strip */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 divide-y divide-[#0a0a0a]/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { code: "PARAM_01", label: "ZERO HUMAN BOTTLENECK", sub: "FULLY AUTONOMOUS EXECUTION" },
            { code: "PARAM_02", label: "DATA SOVEREIGNTY", sub: "ON-PREMISE / HYBRID" },
            { code: "PARAM_03", label: "PRODUCTION-GRADE", sub: "ENTERPRISE FROM DAY 1" },
          ].map(({ code, label, sub }) => (
            <div key={code} className="flex flex-col gap-1 py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#0a0a0a]/25">{code}</span>
              <span className="font-black text-xs tracking-[0.06em] text-[#0a0a0a]/80">{label}</span>
              <span className="font-mono text-[9px] text-[#0a0a0a]/30">{sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#0a0a0a]/12" />

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-28">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-2 w-2 rounded-full bg-red-600" />
              <p className="font-mono text-[10px] tracking-[0.2em] text-[#0a0a0a]/35 uppercase">INITIATE_CONTACT</p>
            </div>
            <h2 className="text-4xl font-black leading-[0.95] tracking-tight text-[#0a0a0a] uppercase sm:text-5xl">
              ELIMINATE<br />ROBOTIC<br />PROCESSES.
            </h2>
          </div>
          <div className="flex flex-col justify-end">
            <p className="mb-8 font-mono text-sm leading-relaxed text-[#0a0a0a]/40">
              Vereinbaren Sie ein unverbindliches<br />
              Strategiegespräch mit unserem Team.<br />
              <span className="text-[#0a0a0a]/25">// RESPONSE TIME &lt; 24H</span>
            </p>
            <a
              href="mailto:hello@rawlogic.io"
              className="inline-block self-start border border-[#0a0a0a] px-8 py-4 font-mono text-xs tracking-[0.22em] uppercase text-[#0a0a0a] transition-all hover:bg-[#0a0a0a] hover:text-[#e5e5e5]"
            >
              [ REQUEST_ACCESS ]
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0a0a0a]/12 px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Image
            src="/rawlogic-font-web3-black.png"
            alt="RawLogic"
            width={100}
            height={26}
            className="object-contain opacity-25"
          />
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#0a0a0a]/25">
            © 2026 RAWLOGIC
          </span>
        </div>
      </footer>
    </div>
  );
}
