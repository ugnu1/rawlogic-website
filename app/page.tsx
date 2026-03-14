import Image from "next/image";
import { Cpu, BarChart2, Factory, ArrowRight } from "lucide-react";

const divisions = [
  {
    icon: Cpu,
    name: "RawLogic Ops",
    tagline: "Agenten & Middleware",
    description:
      "Autonome Software-Agenten, die Ihre internen Prozesse orchestrieren — von der API-Integration bis zur vollständigen Workflow-Automatisierung. Keine Kompromisse, keine Wartezeiten.",
    accent: "from-[#0d1a2e] to-[#0a0f1e]",
    border: "border-cyan-900/40",
    iconColor: "text-cyan-300/70",
    glow: "shadow-cyan-950/50",
  },
  {
    icon: BarChart2,
    name: "RawLogic Signals",
    tagline: "Proprietäre Intent-Daten für B2B-Leads",
    description:
      "Echtzeit-Signale aus dem digitalen Verhalten Ihrer Zielkunden. Wir destillieren Marktlärm in präzise Kaufabsichten — bevor Ihr Wettbewerb reagiert.",
    accent: "from-[#130d22] to-[#0a0a18]",
    border: "border-violet-800/40",
    iconColor: "text-violet-300/70",
    glow: "shadow-violet-950/50",
  },
  {
    icon: Factory,
    name: "RawLogic Core",
    tagline: "Bits to Atoms Automation",
    description:
      "Brücke zwischen Cloud-Logik und physischer Produktion. Wir verbinden digitale Steuerungssysteme mit der realen Welt — von der Fertigungssteuerung bis zum Edge Computing.",
    accent: "from-[#0d1f1a] to-[#090f0e]",
    border: "border-teal-900/40",
    iconColor: "text-teal-300/70",
    glow: "shadow-teal-950/50",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#06060e] text-white antialiased selection:bg-violet-500/20">

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.04] bg-[#06060e]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Image
            src="/rawlogic-font-web3.png"
            alt="RawLogic"
            width={155}
            height={40}
            className="object-contain"
            priority
          />
          <nav className="hidden gap-8 text-sm sm:flex">
            <a href="#divisions" className="text-white/55 transition-colors duration-200 hover:text-white/90">Divisionen</a>
            <a href="#contact" className="text-white/55 transition-colors duration-200 hover:text-white/90">Kontakt</a>
          </nav>
          {/* Ghost pill button with gradient border */}
          <a
            href="#contact"
            className="relative rounded-full px-4 py-1.5 text-xs font-medium text-white/60 transition-all duration-300 hover:text-white/90"
            style={{
              background: "linear-gradient(#06060e, #06060e) padding-box, linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04)) border-box",
              border: "1px solid transparent",
            }}
          >
            Gespräch anfragen
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">

        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          {/* Deep violet bloom — centre */}
          <div className="absolute left-1/2 top-[38%] h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-900/20 blur-[140px]" />
          {/* Icy cyan — top right */}
          <div className="absolute right-0 top-0 h-[400px] w-[500px] rounded-full bg-cyan-900/15 blur-[120px]" />
          {/* Midnight indigo — bottom left */}
          <div className="absolute bottom-0 left-0 h-[350px] w-[450px] rounded-full bg-indigo-950/25 blur-[100px]" />
        </div>

        {/* Fine grid */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div className="mx-auto max-w-4xl">
          {/* Badge */}
          <div
            className="mb-8 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-medium text-white/40 backdrop-blur-sm"
            style={{
              background: "linear-gradient(#06060e, #06060e) padding-box, linear-gradient(135deg, rgba(147,51,234,0.3), rgba(6,182,212,0.15)) border-box",
              border: "1px solid transparent",
            }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400 animate-pulse" />
            Autonomous Digital Infrastructure
          </div>

          {/* Headline */}
          <h1 className="mb-7 text-5xl font-bold leading-[1.08] tracking-tighter text-white sm:text-6xl lg:text-[4.5rem]">
            Autonome digitale{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(105deg, #e2e8f0 0%, #67e8f9 35%, #a78bfa 75%, #7c3aed 100%)",
              }}
            >
              Belegschaft
            </span>
            {" "}
            <span className="text-white/80">&</span>
            <br className="hidden sm:block" />
            Daten&#8209;Pipelines.
          </h1>

          {/* Subtext */}
          <p className="mx-auto mb-10 max-w-xl text-lg leading-[1.85] tracking-wide text-white/35 sm:text-xl">
            Wir ersetzen keine Menschen.{" "}
            <span className="text-white/65 font-light">Wir ersetzen roboterhafte Prozesse.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            {/* Primary — dark anthracite with glow border */}
            <a
              href="#divisions"
              className="group relative inline-flex items-center gap-2.5 rounded-full px-7 py-3 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:text-white"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
                boxShadow: "0 0 0 1px rgba(147,51,234,0.25), 0 0 24px rgba(147,51,234,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(147,51,234,0.5), 0 0 40px rgba(147,51,234,0.18), 0 0 80px rgba(6,182,212,0.06), inset 0 1px 0 rgba(255,255,255,0.08)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(147,51,234,0.25), 0 0 24px rgba(147,51,234,0.08), inset 0 1px 0 rgba(255,255,255,0.06)";
              }}
            >
              Unsere Divisionen
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>

            {/* Secondary — ghost */}
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] px-7 py-3 text-sm font-medium text-white/40 transition-all duration-300 hover:border-white/[0.14] hover:text-white/70"
            >
              Gespräch anfragen
            </a>
          </div>
        </div>

        {/* Scroll line */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="h-12 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
        </div>
      </section>

      {/* Divisions */}
      <section id="divisions" className="mx-auto max-w-6xl px-6 py-32">
        <div className="mb-16 text-center">
          <p
            className="mb-3 bg-clip-text text-xs font-semibold uppercase tracking-[0.2em] text-transparent"
            style={{ backgroundImage: "linear-gradient(90deg, #67e8f9, #a78bfa)" }}
          >
            Drei Divisionen. Eine Vision.
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Infrastruktur für das digitale Unternehmen
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/35">
            Jede Division adressiert einen kritischen Engpass in modernen B2B-Operationen — präzise, skalierbar, autonom.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-3">
          {divisions.map(({ icon: Icon, name, tagline, description, accent, border, iconColor, glow }) => (
            <div
              key={name}
              className={`group relative rounded-2xl border ${border} bg-gradient-to-b ${accent} p-8 shadow-xl ${glow} backdrop-blur-sm transition-all duration-300 hover:border-white/15`}
              style={{
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), 0 1px 40px rgba(0,0,0,0.4)",
              }}
            >
              {/* Subtle top sheen */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

              <div className="mb-6 inline-flex rounded-xl border border-white/[0.07] bg-white/[0.04] p-3">
                <Icon size={20} className={iconColor} />
              </div>
              <h3 className="mb-1 text-base font-semibold text-white">{name}</h3>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                {tagline}
              </p>
              <p className="text-sm leading-[1.8] text-white/40">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-white/[0.04] py-16" style={{ background: "rgba(255,255,255,0.012)" }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/15">Grundprinzipien</p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { label: "Zero Human Bottleneck", sub: "Prozesse laufen ohne manuelle Freigaben" },
              { label: "Data Sovereignty", sub: "Ihre Daten bleiben unter Ihrer Kontrolle" },
              { label: "Production-Grade", sub: "Enterprise-Qualität von Tag 1" },
            ].map(({ label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-white/60">{label}</span>
                <span className="text-xs text-white/22">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Bereit, roboterhafte Prozesse zu eliminieren?
        </h2>
        <p className="mb-10 leading-relaxed text-white/35">
          Vereinbaren Sie ein unverbindliches Strategiegespräch mit unserem Team.
        </p>
        <a
          href="mailto:hello@rawlogic.io"
          className="group relative inline-flex items-center gap-2.5 rounded-full px-8 py-3.5 text-sm font-semibold text-white/90 backdrop-blur-sm transition-all duration-300 hover:text-white"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
            boxShadow: "0 0 0 1px rgba(147,51,234,0.3), 0 0 32px rgba(147,51,234,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(147,51,234,0.55), 0 0 50px rgba(147,51,234,0.2), 0 0 100px rgba(6,182,212,0.07), inset 0 1px 0 rgba(255,255,255,0.08)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 1px rgba(147,51,234,0.3), 0 0 32px rgba(147,51,234,0.1), inset 0 1px 0 rgba(255,255,255,0.06)";
          }}
        >
          Gespräch starten
          <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.04] px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-white/20">
          <Image
            src="/rawlogic-font-web3.png"
            alt="RawLogic"
            width={110}
            height={28}
            className="object-contain opacity-25"
          />
          <span className="text-white/18">© 2026 RawLogic. Alle Rechte vorbehalten.</span>
        </div>
      </footer>
    </div>
  );
}
