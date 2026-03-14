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
  },
  {
    num: "02",
    icon: BarChart2,
    name: "RAWLOGIC SIGNALS",
    tagline: "PROPRIETARY INTENT DATA // B2B",
    description:
      "Echtzeit-Signale aus digitalem Kaufverhalten. Marktlärm destilliert zu präzisen Kaufabsichten — vor dem Wettbewerb.",
  },
  {
    num: "03",
    icon: Factory,
    name: "RAWLOGIC CORE",
    tagline: "BITS TO ATOMS // CLOUD → PRODUCTION",
    description:
      "Cloud-Logik trifft physische Fertigung. Digitale Steuerungssysteme, Edge Computing, industrielle Automatisierung.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f2f2f2] antialiased font-sans">

      {/* Nav */}
      <header className="border-b border-[#f2f2f2]/15">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Image
            src="/rawlogic-font-web3.png"
            alt="RawLogic"
            width={140}
            height={36}
            className="object-contain"
            priority
          />
          <nav className="hidden gap-10 sm:flex">
            <a href="#divisions" className="font-mono text-[11px] tracking-[0.15em] text-[#f2f2f2]/40 uppercase transition-colors hover:text-[#f2f2f2]">
              DIVISIONS
            </a>
            <a href="#contact" className="font-mono text-[11px] tracking-[0.15em] text-[#f2f2f2]/40 uppercase transition-colors hover:text-[#f2f2f2]">
              CONTACT
            </a>
          </nav>
          <a
            href="#contact"
            className="border border-[#f2f2f2]/20 px-4 py-2 font-mono text-[10px] tracking-[0.18em] uppercase text-[#f2f2f2]/50 transition-all hover:border-[#f2f2f2]/60 hover:text-[#f2f2f2]"
          >
            REQUEST_ACCESS
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto flex max-w-6xl flex-col justify-center px-6 py-40">
        <div className="mb-8 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#f2f2f2]/25">SYS_STATUS</span>
          <span className="h-px flex-1 bg-[#f2f2f2]/10" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-[#f2f2f2]/25">ONLINE</span>
        </div>

        <h1 className="mb-10 text-[clamp(2.8rem,7vw,6.5rem)] font-black leading-[0.93] tracking-[-0.03em] text-[#f2f2f2] uppercase">
          RAWLOGIC:<br />
          AUTONOMOUS<br />
          INFRASTRUCTURE.
        </h1>

        <div className="mb-16 flex items-center gap-4">
          <span className="h-px w-8 bg-[#f2f2f2]/20" />
          <p className="font-mono text-sm tracking-[0.12em] text-[#f2f2f2]/35">
            [V_01 // PROCESSING DATA INTO AUTOMATION]
          </p>
        </div>

        <div>
          <a
            href="#contact"
            className="inline-block border border-[#f2f2f2] px-8 py-4 font-mono text-xs tracking-[0.22em] uppercase text-[#f2f2f2] transition-all hover:bg-[#f2f2f2] hover:text-[#0a0a0a]"
          >
            [ REQUEST_ACCESS ]
          </a>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#f2f2f2]/10" />

      {/* Divisions */}
      <section id="divisions" className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-12 flex items-baseline gap-6">
          <span className="font-mono text-[10px] tracking-[0.22em] text-[#f2f2f2]/25 uppercase">DIVISIONS</span>
          <span className="font-mono text-[10px] text-[#f2f2f2]/15">// 03 UNITS ACTIVE</span>
        </div>

        <div className="divide-y divide-[#f2f2f2]/10">
          {divisions.map(({ num, icon: Icon, name, tagline, description }) => (
            <div key={num} className="grid grid-cols-[3rem_1fr] gap-8 py-10 sm:grid-cols-[3rem_14rem_1fr]">
              {/* Number */}
              <span className="font-mono text-xs text-[#f2f2f2]/20 pt-0.5">{num}</span>

              {/* Title block */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <Icon size={14} className="text-[#f2f2f2]/50 shrink-0" />
                  <span className="font-black text-sm tracking-[0.08em] text-[#f2f2f2]">{name}</span>
                </div>
                <p className="font-mono text-[10px] tracking-[0.14em] text-[#f2f2f2]/25">{tagline}</p>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed text-[#f2f2f2]/40 self-start">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#f2f2f2]/10" />

      {/* Trust strip */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-0 divide-y divide-[#f2f2f2]/8 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {[
            { code: "PARAM_01", label: "ZERO HUMAN BOTTLENECK" },
            { code: "PARAM_02", label: "DATA SOVEREIGNTY" },
            { code: "PARAM_03", label: "PRODUCTION-GRADE" },
          ].map(({ code, label }) => (
            <div key={code} className="flex flex-col gap-1 py-6 sm:px-8 sm:first:pl-0 sm:last:pr-0">
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#f2f2f2]/20">{code}</span>
              <span className="font-black text-xs tracking-[0.1em] text-[#f2f2f2]/70">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-[#f2f2f2]/10" />

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-6xl px-6 py-32">
        <div className="max-w-xl">
          <p className="mb-4 font-mono text-[10px] tracking-[0.2em] text-[#f2f2f2]/25">INITIATE_CONTACT</p>
          <h2 className="mb-8 text-4xl font-black leading-tight tracking-tight text-[#f2f2f2] uppercase sm:text-5xl">
            ELIMINATE<br />ROBOTIC<br />PROCESSES.
          </h2>
          <a
            href="mailto:hello@rawlogic.io"
            className="inline-block border border-[#f2f2f2] px-8 py-4 font-mono text-xs tracking-[0.22em] uppercase text-[#f2f2f2] transition-all hover:bg-[#f2f2f2] hover:text-[#0a0a0a]"
          >
            [ REQUEST_ACCESS ]
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#f2f2f2]/10 px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Image
            src="/rawlogic-font-web3.png"
            alt="RawLogic"
            width={100}
            height={26}
            className="object-contain opacity-20"
          />
          <span className="font-mono text-[10px] tracking-[0.14em] text-[#f2f2f2]/20">
            © 2026 RAWLOGIC
          </span>
        </div>
      </footer>
    </div>
  );
}
