"use client";

import { useRouter } from "next/navigation";
import { type ChangeEvent, type FormEvent, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  documentId: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  allowManagement: boolean;
  guarantorName: string;
  guarantorLastName: string;
  guarantorPhone: string;
  guarantorRelation: string;
};

type FormErrors = Partial<Record<keyof FormData | "enrollmentProof", string>>;

const areaOptions = [
  { name: "Centro", vibe: "Teatinos • La Merced" },
  { name: "El Ejido", vibe: "Vida universitaria" },
  { name: "La Malagueta", vibe: "Playas y ambiente" },
  { name: "Teatinos", vibe: "Centro y ocio" },
  { name: "Ciudad Jardín", vibe: "Tranquilidad" },
  { name: "Huelin", vibe: "Comodidad y acceso" },
  { name: "Churriana", vibe: "Más tranquilo" },
  { name: "Cruz del Humilladero", vibe: "Zona muy transitada" },
  { name: "Pedregalejo", vibe: "Costa y bares" },
  { name: "Lagunillas", vibe: "Rutas y barrio" },
  { name: "Olletas", vibe: "Más residencial" },
  { name: "Carmen de la Victoria", vibe: "Casco histórico" },
];

const initialState: FormData = {
  firstName: "",
  lastName: "",
  documentId: "",
  phone: "+34",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  allowManagement: false,
  guarantorName: "",
  guarantorLastName: "",
  guarantorPhone: "+34",
  guarantorRelation: "",
};

export function StudentRegistrationForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [enrollmentProof, setEnrollmentProof] = useState<File | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    const checked = (event.target as HTMLInputElement).checked;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const validateForm = () => {
    setErrors({});
    return true;
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);

    if (!validateForm()) {
      return;
    }

    setSubmitted(true);
    setErrors({});
    setEnrollmentProof(null);
    router.push("/estudiante");
  };

  const toggleArea = (areaName: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaName)
        ? prev.filter((area) => area !== areaName)
        : [...prev, areaName]
    );
  };

  const finishRegistration = () => {
    router.push("/estudiante");
  };

  const renderStudentStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Nombre
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Apellidos
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Tus apellidos"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#213f47]">
                Teléfono de contacto
              </label>
              <div className="flex items-center overflow-hidden rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] focus-within:border-[#1f5d53] focus-within:ring-2 focus-within:ring-[#cfe2dc]">
                <span className="border-r border-[#d8d2cb] bg-[#f3efe9] px-3 py-3 text-sm font-medium text-[#1b2a2d]">
                  +34
                </span>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone.replace(/^\+34/, "")}
                  onChange={(event) => {
                    const rawValue = event.target.value.replace(/\D/g, "");
                    setForm((prev) => ({
                      ...prev,
                      phone: `+34${rawValue}`,
                    }));
                  }}
                  placeholder="600123456"
                  className="w-full border-0 bg-transparent px-4 py-3 text-base text-[#1b2a2d] outline-none"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
            </div>

            <div className="rounded-[18px] border border-dashed border-[#bfd9e7] bg-[#f4f9fb] p-4">
              <label className="mb-2 block text-sm font-medium text-[#213f47]">
                Documento de matrícula / evidencia de acceso
              </label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0] ?? null;
                  setEnrollmentProof(selectedFile);
                  setErrors((prev) => ({ ...prev, enrollmentProof: undefined }));
                }}
                className="block w-full text-sm text-[#49656d] file:mr-4 file:rounded-full file:border-0 file:bg-[#e3efe9] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#1f5d53]"
              />
              {enrollmentProof && <p className="mt-2 text-xs font-medium text-[#1f5d53]">{enrollmentProof.name}</p>}
              {errors.enrollmentProof && <p className="mt-2 text-sm text-red-600">{errors.enrollmentProof}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Contraseña
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repite tu contraseña"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
                {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="space-y-3 rounded-[18px] border border-[#e2ddd6] bg-[#f7f3ee] p-3">
              <label className="flex items-start gap-3 text-sm leading-6 text-[#334d54]">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-[#c9d2cd] text-[#1f5d53] focus:ring-[#1f5d53]"
                />
                <span>Acepto los términos y condiciones de uso de Kolivin.</span>
              </label>
              {errors.acceptTerms && <p className="mt-2 text-sm text-red-600">{errors.acceptTerms}</p>}

              <label className="flex items-start gap-3 text-sm leading-6 text-[#334d54]">
                <input
                  type="checkbox"
                  name="allowManagement"
                  checked={form.allowManagement}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-[#c9d2cd] text-[#1f5d53] focus:ring-[#1f5d53]"
                />
                <span>Autorizo la gestión de mi perfil y la validación de la información necesaria para buscar vivienda y compañeros.</span>
              </label>
              {errors.allowManagement && <p className="mt-2 text-sm text-red-600">{errors.allowManagement}</p>}
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#e4ddd5] pt-4">
              <button
                type="button"
                disabled
                className="inline-flex items-center justify-center rounded-[14px] border border-[#ced6d2] bg-white px-4 py-2.5 text-sm font-semibold text-[#17343c] opacity-40"
              >
                Atrás
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center justify-center rounded-[14px] bg-[#1f5d53] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42]"
              >
                Siguiente
              </button>
            </div>
          </form>
        );

      case 1:
        return (
          <div className="mt-6 rounded-[28px] border border-[#dfe7e3] bg-[#f7f9f8] p-5 sm:p-6">
            <div className="mb-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Verificación</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[#112d39]">
                Correo UMA, DNI y aval
              </h3>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Correo de la UMA
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="nombre@uma.es"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="documentId" className="mb-2 block text-sm font-medium text-[#213f47]">
                  DNI / NIE
                </label>
                <input
                  id="documentId"
                  name="documentId"
                  type="text"
                  value={form.documentId}
                  onChange={handleChange}
                  placeholder="12345678A"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
                {errors.documentId && <p className="mt-1 text-sm text-red-600">{errors.documentId}</p>}
              </div>

              <div className="rounded-[20px] border border-[#dfe7e3] bg-white p-4">
                <p className="mb-3 text-sm font-medium text-[#1f5d53]">Datos del aval</p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="guarantorName" className="mb-2 block text-sm font-medium text-[#213f47]">
                      Nombre
                    </label>
                    <input
                      id="guarantorName"
                      name="guarantorName"
                      type="text"
                      value={form.guarantorName}
                      onChange={handleChange}
                      placeholder="Nombre del aval"
                      className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                    />
                  </div>

                  <div>
                    <label htmlFor="guarantorLastName" className="mb-2 block text-sm font-medium text-[#213f47]">
                      Apellidos
                    </label>
                    <input
                      id="guarantorLastName"
                      name="guarantorLastName"
                      type="text"
                      value={form.guarantorLastName}
                      onChange={handleChange}
                      placeholder="Apellidos del aval"
                      className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                    />
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="guarantorRelation" className="mb-2 block text-sm font-medium text-[#213f47]">
                      Relación
                    </label>
                    <input
                      id="guarantorRelation"
                      name="guarantorRelation"
                      type="text"
                      value={form.guarantorRelation}
                      onChange={handleChange}
                      placeholder="Padre, madre, tutor..."
                      className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                    />
                  </div>

                  <div>
                    <label htmlFor="guarantorPhone" className="mb-2 block text-sm font-medium text-[#213f47]">
                      Teléfono
                    </label>
                    <div className="flex items-center overflow-hidden rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] focus-within:border-[#1f5d53] focus-within:ring-2 focus-within:ring-[#cfe2dc]">
                      <span className="border-r border-[#d8d2cb] bg-[#f3efe9] px-3 py-3 text-sm font-medium text-[#1b2a2d]">
                        +34
                      </span>
                      <input
                        id="guarantorPhone"
                        name="guarantorPhone"
                        type="tel"
                        value={form.guarantorPhone.replace(/^\+34/, "")}
                        onChange={(event) => {
                          const rawValue = event.target.value.replace(/\D/g, "");
                          setForm((prev) => ({
                            ...prev,
                            guarantorPhone: `+34${rawValue}`,
                          }));
                        }}
                        placeholder="600123456"
                        className="w-full border-0 bg-transparent px-4 py-3 text-base text-[#1b2a2d] outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[#e4ddd5] pt-4">
              <button
                type="button"
                onClick={previousStep}
                className="inline-flex items-center justify-center rounded-[14px] border border-[#ced6d2] bg-white px-4 py-2.5 text-sm font-semibold text-[#17343c] transition hover:bg-[#f7f9f8]"
              >
                Atrás
              </button>

              <button
                type="button"
                onClick={nextStep}
                className="inline-flex items-center justify-center rounded-[14px] bg-[#1f5d53] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42]"
              >
                Siguiente
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="mt-6 rounded-[28px] border border-[#dfe7e3] bg-[#f7f9f8] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Siguiente paso</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[#112d39]">
                  Elige tus zonas de Málaga
                </h3>
              </div>
          <span className="rounded-full border border-[#dfe7e3] bg-white px-3 py-1 text-xs font-medium text-[#1f5d53]">
            {selectedAreas.length} seleccionadas
          </span>
        </div>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#4b5d64]">
          Selecciona las zonas que te interesan para ver pisos y compañeros. Es una forma rápida de afinar la búsqueda.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {areaOptions.map((area) => {
            const isSelected = selectedAreas.includes(area.name);

            return (
              <button
                key={area.name}
                type="button"
                onClick={() => toggleArea(area.name)}
                className={`rounded-[22px] border p-4 text-left transition-all ${
                  isSelected
                    ? "border-[#1f5d53] bg-[#1f5d53] text-white shadow-[0_12px_28px_rgba(31,93,83,0.24)]"
                    : "border-[#d8d2cb] bg-white text-[#112d39] hover:border-[#b9d5cc] hover:bg-[#f2f9f6]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-lg font-semibold tracking-[-0.04em]">{area.name}</span>
                  {isSelected && <span className="text-xl">✓</span>}
                </div>
                <p className={`mt-2 text-sm ${isSelected ? "text-white/80" : "text-[#53686d]"}`}>
                  {area.vibe}
                </p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-[#dfe7e3] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#4b5d64]">
            Puedes elegir varias zonas y ajustar la búsqueda más adelante.
          </p>
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={previousStep}
              className="inline-flex items-center justify-center rounded-[14px] border border-[#ced6d2] bg-white px-4 py-2.5 text-sm font-semibold text-[#17343c] transition hover:bg-[#f7f9f8]"
            >
              Atrás
            </button>
            <button
              type="button"
              onClick={finishRegistration}
              className="inline-flex items-center justify-center rounded-[16px] bg-[#1f5d53] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42]"
            >
              Guardar preferencias
            </button>
          </div>
        </div>
      </div>
    );
  }
    };

  return (
    <div className="mt-6">
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Registro</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[#112d39]">
          {currentStep === 0 && "Datos personales"}
          {currentStep === 1 && "Verificación UMA"}
          {currentStep === 2 && "Zonas de Málaga"}
        </h3>
      </div>

      {renderStudentStep()}

      {submitted && (
        <div className="mt-4 rounded-[16px] border border-[#cfe2dc] bg-[#edf4f1] px-4 py-3 text-sm font-medium text-[#1f5d53]">
          Registro completado. Tu perfil de estudiante está listo para continuar.
        </div>
      )}
    </div>
  );
}