import Link from "next/link";
import SiteNavigation from "@/components/SiteNavigation";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#f3efe9] px-4 py-8 text-[#1b2a2d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SiteNavigation variant="auth" actionLabel="Regístrate" actionHref="/registro" />

        <main className="grid gap-6 overflow-hidden rounded-[32px] border border-[#d7d1ca] bg-[#f7f3ee] shadow-[0_20px_45px_rgba(17,45,57,0.08)] lg:grid-cols-[1.1fr_0.9fr]">
          <section className="bg-[#edf4f1] p-6 sm:p-8 lg:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#5f747a]">
              Acceso
            </p>
            <h1 className="mt-4 max-w-lg text-4xl font-semibold tracking-[-0.06em] text-[#111111] sm:text-5xl">
              Entra y gestiona tu perfil con tranquilidad.
            </h1>
            <p className="mt-5 max-w-md text-lg leading-8 text-[#4a5f66]">
              Una experiencia sencilla para que estudiantes y propietarios accedan a sus búsquedas,
              mensajes y gestión sin complejidad.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Perfil completo", text: "Tu historial, favoritos y mensajes en un solo lugar." },
                { title: "Pagos protegidos", text: "Reservas y fianzas con trazabilidad y verificación." },
              ].map((item) => (
                <div key={item.title} className="rounded-[22px] border border-[#d1dde1] bg-white/80 p-4">
                  <p className="text-lg font-semibold tracking-[-0.04em] text-[#112d39]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[#53686d]">{item.text}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-8 lg:p-10">
            <div className="rounded-[28px] border border-[#d7d1ca] bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Iniciar sesión</p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#112d39]">
                    Inicia sesión
                  </h2>
                </div>
                <span className="rounded-full bg-[#edf4f1] px-2.5 py-1 text-xs font-medium text-[#1f5d53]">
                  Seguro
                </span>
              </div>

              <form className="mt-6 space-y-4">
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#213f47]">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="tuemail@estudiante.com"
                    className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#213f47]">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 text-sm text-[#53686d]">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="h-4 w-4 rounded border-[#c9d2cd] text-[#1f5d53] focus:ring-[#1f5d53]" />
                    Recordarme
                  </label>
                  <Link href="/registro" className="font-medium text-[#1f5d53] hover:underline">
                    Recuperar contraseña
                  </Link>
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex w-full items-center justify-center rounded-[16px] bg-[#1f5d53] px-5 py-3.5 text-base font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42]"
                >
                  Iniciar sesión
                </button>

                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#d9d4ce]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase tracking-[0.18em] text-[#64777e]">
                    <span className="bg-white px-3">o continúa con</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[16px] border border-[#d5d1ca] bg-[#faf8f5] px-5 py-3 text-base font-semibold text-[#1b2a2d] transition hover:bg-white"
                >
                  <span aria-hidden="true">G</span>
                  Google
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#53686d]">
                ¿No tienes cuenta?{' '}
                <Link href="/registro" className="font-semibold text-[#1f5d53] hover:underline">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
