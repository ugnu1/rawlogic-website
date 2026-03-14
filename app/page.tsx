import { Cpu, BarChart2, Factory, ArrowRight } from "lucide-react";

const divisions = [
  {
    icon: Cpu,
    name: "RawLogic Ops",
    tagline: "Agenten & Middleware",
    description:
      "Autonome Software-Agenten, die Ihre internen Prozesse orchestrieren — von der API-Integration bis zur vollständigen Workflow-Automatisierung. Keine Kompromisse, keine Wartezeiten.",
    accent: "from-blue-500/20 to-cyan-500/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: BarChart2,
    name: "RawLogic Signals",
    tagline: "Proprietäre Intent-Daten für B2B-Leads",
    description:
      "Echtzeit-Signale aus dem digitalen Verhalten Ihrer Zielkunden. Wir destillieren Marktlärm in präzise Kaufabsichten — bevor Ihr Wettbewerb reagiert.",
    accent: "from-violet-500/20 to-purple-500/10",
    border: "border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: Factory,
    name: "RawLogic Core",
    tagline: "Bits to Atoms Automation",
    description:
      "Brücke zwischen Cloud-Logik und physischer Produktion. Wir verbinden digitale Steuerungssysteme mit der realen Welt — von der Fertigungssteuerung bis zum Edge Computing.",
    accent: "from-emerald-500/20 to-teal-500/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-400",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080810] text-white antialiased">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#080810]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-sm font-semibold tracking-widest text-white/90 uppercase">
            Raw<span className="text-blue-400">Logic</span>
          </span>
          <nav className="hidden gap-8 text-sm text-white/40 sm:flex">
            <a href="#divisions" className="transition hover:text-white/80">Divisionen</a>
            <a href="#contact" className="transition hover:text-white/80">Kontakt</a>
          </nav>
          <a
            href="#contact"
            className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            Gespräch anfragen
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-[600px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
          <div className="absolute left-1/4 bottom-1/4 h-[300px] w-[400px] rounded-full bg-violet-600/8 blur-[100px]" />
        </div>

        {/* Grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="mx-auto max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/50 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
            Autonomous Digital Infrastructure
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
            Autonome digitale{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
              Belegschaft
            </span>
            {" &"} <br className="hidden sm:block" />
            Daten&#8209;Pipelines.
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/40 sm:text-xl">
            Wir ersetzen keine Menschen.{" "}
            <span className="text-white/70">Wir ersetzen roboterhafte Prozesse.</span>
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="#divisions"
              className="group inline-flex items-center gap-2 rounded-full bg-blue-500 px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-400"
            >
              Unsere Divisionen
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-7 py-3 text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white"
            >
              Gespräch anfragen
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20">
          <div className="h-10 w-px bg-gradient-to-b from-transparent to-white/20" />
        </div>
      </section>

      {/* Divisions */}
      <section id="divisions" className="mx-auto max-w-6xl px-6 py-32">
        <div className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-blue-400/80">
            Drei Divisionen. Eine Vision.
          </p>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Infrastruktur für das digitale Unternehmen
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-white/40">
            Jede Division adressiert einen kritischen Engpass in modernen B2B-Operationen — präzise, skalierbar, autonom.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {divisions.map(({ icon: Icon, name, tagline, description, accent, border, iconColor }) => (
            <div
              key={name}
              className={`group relative rounded-2xl border ${border} bg-gradient-to-br ${accent} p-8 backdrop-blur transition hover:border-white/20`}
            >
              <div className="mb-6 inline-flex rounded-xl border border-white/10 bg-white/5 p-3">
                <Icon size={22} className={iconColor} />
              </div>
              <h3 className="mb-1 text-lg font-bold text-white">{name}</h3>
              <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/30">
                {tagline}
              </p>
              <p className="text-sm leading-relaxed text-white/50">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-white/5 bg-white/[0.02] py-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm uppercase tracking-widest text-white/20">Grundprinzipien</p>
          <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {[
              { label: "Zero Human Bottleneck", sub: "Prozesse laufen ohne manuelle Freigaben" },
              { label: "Data Sovereignty", sub: "Ihre Daten bleiben unter Ihrer Kontrolle" },
              { label: "Production-Grade", sub: "Enterprise-Qualität von Tag 1" },
            ].map(({ label, sub }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-sm font-semibold text-white/70">{label}</span>
                <span className="text-xs text-white/25">{sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="mx-auto max-w-3xl px-6 py-32 text-center">
        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
          Bereit, roboterhafte Prozesse zu eliminieren?
        </h2>
        <p className="mb-8 text-white/40">
          Vereinbaren Sie ein unverbindliches Strategiegespräch mit unserem Team.
        </p>
        <a
          href="mailto:hello@rawlogic.io"
          className="group inline-flex items-center gap-2 rounded-full bg-blue-500 px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-500/20 transition hover:bg-blue-400"
        >
          Gespräch starten
          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8">
        <div className="mx-auto flex max-w-6xl items-center justify-between text-xs text-white/20">
          <span>
            Raw<span className="text-blue-400/60">Logic</span>
          </span>
          <span>© 2026 RawLogic. Alle Rechte vorbehalten.</span>
        </div>
      </footer>
    </div>
  );
}
