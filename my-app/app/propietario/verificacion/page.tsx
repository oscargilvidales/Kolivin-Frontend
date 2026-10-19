import { DocumentVerificationForm } from "@/components/DocumentVerificationForm";
import SiteNavigation from "@/components/SiteNavigation";

export default function VerificationPage() {
  return (
    <div className="min-h-screen bg-[#f3efe9] px-4 py-8 text-[#1b2a2d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SiteNavigation
          activeHref="/propietario"
          actionLabel="Volver al panel"
          actionHref="/propietario"
        />

        <main className="grid gap-6 overflow-hidden rounded-[32px] border border-[#d7d1ca] bg-[#f7f3ee] shadow-[0_20px_45px_rgba(17,45,57,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
          <section className="bg-[#edf4f1] p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5f747a]">Verificación</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[#111111] sm:text-5xl">
              Verificación de titularidad para publicar con tranquilidad.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-[#4a5f66]">
              Este paso permite validar la propiedad con la documentación necesaria y mantener un
              proceso seguro, limitado a la finalidad de comprobar la titularidad del inmueble.
            </p>

            <div className="mt-8 rounded-[28px] border border-[#d0dfd8] bg-white/80 p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Requisitos</p>
              <div className="mt-4 space-y-3 text-sm text-[#1d3a3a]">
                {[
                  "Escritura o título de propiedad",
                  "Documento de identidad del titular",
                  "Prueba de titularidad o propiedad",
                  "Información limitada y solo para validación",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-full bg-[#f7f3ee] px-3 py-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#dfece6] text-[#1f5d53]">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-8 lg:p-10">
            <div className="rounded-[28px] border border-[#d7d1ca] bg-white p-5 sm:p-6">
              <div className="mb-6">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Documentos</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#112d39]">
                  Sube la documentación
                </h2>
              </div>

              <DocumentVerificationForm />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
