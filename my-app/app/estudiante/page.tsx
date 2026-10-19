import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";

const housingFilters = [
  "Zona de Málaga",
  "Presupuesto máximo",
  "Tipo de vivienda",
  "Número de habitaciones",
  "Máximo de compañeros",
  "Preferencia por convivencia",
];

const roommateFilters = [
  "Horario de estudio",
  "Nivel de ruido",
  "Hábitos y limpieza",
  "Presupuesto compartido",
  "Relación con mascotas",
  "Tipo de rutina diaria",
];

const paymentAndCommunication = [
  "Pago de alquiler y fianza desde la app",
  "Mensajes con propietario y compañeros",
  "Confirmación de documentos y contratos",
  "Seguimiento de cuotas y recordatorios",
];

const checklist = [
  "Identidad verificada",
  "Contrato legal claro",
  "Pago protegido",
  "Revisión del casero",
];

export default function EstudiantePage() {
  return (
    <div className="min-h-screen bg-[#f3efe9] text-[#1b2a2d]">
      <SiteNavigation
        activeHref="/estudiante"
        actionLabel="Ver pisos"
        actionHref="/estudiante"
      />

      <main className="mx-auto max-w-[1200px] px-4 pb-16 pt-8 sm:px-6 lg:px-10">
        <section className="rounded-[32px] border border-[#d7d1ca] bg-[#f7f3ee] p-5 sm:p-7 lg:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#61767d]">
                Estudiante • Málaga
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[#111111] sm:text-5xl">
                Encuentra vivienda y compañeros con un proceso claro y seguro.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#4a5f66]">
                La propuesta de Kolivin está pensada para facilitar la búsqueda, valorar la
                compatibilidad entre personas y reducir la fricción en la decisión final.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/registro"
                  className="inline-flex items-center justify-center rounded-[18px] bg-[#1f5d53] px-6 py-3.5 text-base font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42]"
                >
                  Quiero registrarme
                </Link>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-[18px] border border-[#c9d2cd] bg-white/80 px-6 py-3.5 text-base font-semibold text-[#17343c] transition hover:bg-white"
                >
                  Volver al inicio
                </Link>
              </div>

              <div className="mt-5 flex items-center gap-3 text-sm text-[#4d646d]">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#1f5d53]" />
                Filtrado por zona, presupuesto y estilo de vida
              </div>
            </div>

            <div className="rounded-[28px] border border-[#d3d0ca] bg-[#edf4f1] p-5 shadow-[0_18px_35px_rgba(17,45,57,0.08)]">
              <div className="rounded-[22px] bg-white p-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Zonas destacadas</p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.05em] text-[#112d39]">
                  Málaga para estudiantes
                </h2>

                <div className="mt-5 space-y-3">
                  {[
                    { title: "Teatinos", text: "Más cerca de la universidad y la vida estudiantil." },
                    { title: "Centro", text: "Acceso directo a transporte y servicios urbanos." },
                    { title: "El Ejido", text: "Opciones más flexibles para compartir vivienda." },
                  ].map((zone) => (
                    <div key={zone.title} className="rounded-2xl border border-[#e2ddd6] bg-[#f7f3ee] p-3">
                      <p className="font-medium text-[#112d39]">{zone.title}</p>
                      <p className="mt-1 text-xs leading-5 text-[#5b6d73]">{zone.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <article className="rounded-[28px] border border-[#d7d1ca] bg-[#f8f5f2] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#61767d]">Buscar piso</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[#112d39]">
              Facilidad para encontrar la vivienda ideal.
            </h3>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4d646d]">
              {housingFilters.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#dfece6] text-xs font-bold text-[#1f5d53]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] border border-[#d7d1ca] bg-[#edf4f1] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#61767d]">Compañeros</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[#112d39]">
              Filtros para elegir con quien compartir piso.
            </h3>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4d646d]">
              {roommateFilters.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#dfece6] text-xs font-bold text-[#1f5d53]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[28px] border border-[#d7d1ca] bg-[#f8f5f2] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#61767d]">Pagos y comunicación</p>
            <h3 className="mt-3 text-3xl font-semibold tracking-[-0.06em] text-[#112d39]">
              Todo más sencillo antes, durante y después del alquiler.
            </h3>
            <ul className="mt-6 space-y-3 text-sm leading-6 text-[#4d646d]">
              {paymentAndCommunication.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#dfece6] text-xs font-bold text-[#1f5d53]">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </div>
  );
}
