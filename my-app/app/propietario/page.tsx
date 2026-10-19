import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";

const benefits = [
  {
    title: "Protección legal",
    text: "El contrato de Kolivin aporta una base clara para la relación con el inquilino y ayuda a reducir riesgos legales y de gestión.",
  },
  {
    title: "Publica incluso con huecos",
    text: "Puedes dejar tu vivienda visible y reanudar la búsqueda cuando haya disponibilidad, sin perder tiempo en procesos repetitivos.",
  },
  {
    title: "Facturas y administración centralizadas",
    text: "Agrupa cuotas, pagos, comprobantes y comunicaciones para tener todo más ordenado y claro.",
  },
  {
    title: "Más control operativo",
    text: "Mantienes la información y la relación con los inquilinos en un mismo punto para facilitar la toma de decisiones.",
  },
];

const metrics = [
  { value: "Contrato", label: "más claro" },
  { value: "Disponibilidad", label: "más flexible" },
  { value: "Administración", label: "centralizada" },
];

export default function PropietarioPage() {
  return (
    <div className="min-h-screen bg-[#f3efe9] text-[#1b2a2d]">
      <SiteNavigation
        activeHref="/propietario"
        actionLabel="Verificar propiedad"
        actionHref="/propietario/verificacion"
      />

      <main className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:px-10">
        <section className="rounded-[32px] border border-[#d7d1ca] bg-[#f7f3ee] p-5 sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#61767d]">
                Propietario • Málaga
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[#111111] sm:text-5xl">
                Simplifica la gestión y la confianza del alquiler.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#4a5f66]">
                Kolivin ayuda a publicar una vivienda, evaluar candidatos y mantener un proceso más
                claro para inquilinos y propietarios, con menos fricción y más control.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/propietario/verificacion"
                  className="inline-flex items-center justify-center rounded-[18px] bg-[#1f5d53] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42]"
                >
                  Verificar propiedad
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-[18px] border border-[#c9d2cd] bg-white/80 px-6 py-3.5 text-base font-semibold text-[#17343c] transition hover:bg-white"
                >
                  Iniciar sesión
                </Link>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d3d0ca] bg-[#edf4f1] p-5 shadow-[0_18px_35px_rgba(17,45,57,0.08)]">
              <div className="rounded-[22px] bg-white p-4">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Panel principal</p>
                <div className="mt-4 space-y-3">
                  {[
                    { label: "Solicitudes activas", value: "Visibilidad" },
                    { label: "Candidatos verificados", value: "Mayor confianza" },
                    { label: "Contratos en curso", value: "Más control" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-[#e2ddd6] bg-[#f7f3ee] p-3">
                      <div className="flex items-center justify-between text-sm text-[#53666d]">
                        <span>{item.label}</span>
                        <span className="text-lg font-semibold text-[#112d39]">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-[26px] border border-[#d7d1ca] bg-white/70 p-5 text-center">
              <div className="text-4xl font-semibold tracking-[-0.06em] text-[#112d39]">{metric.value}</div>
              <p className="mt-2 text-sm leading-6 text-[#53686d]">{metric.label}</p>
            </div>
          ))}
        </section>

        <section className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {benefits.map((item) => (
            <article key={item.title} className="rounded-[26px] border border-[#d7d1ca] bg-white/70 p-5">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#edf4f1] text-xl">
                ✦
              </div>
              <h3 className="text-xl font-semibold tracking-[-0.04em] text-[#112d39]">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-[#53686d]">{item.text}</p>
            </article>
          ))}
        </section>

      </main>
    </div>
  );
}
