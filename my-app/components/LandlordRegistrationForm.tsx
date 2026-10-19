"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

type FormData = {
  firstName: string;
  lastName: string;
  documentId: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  universityEmail: string;
  universityName: string;
  guarantorName: string;
  guarantorLastName: string;
  guarantorDocumentId: string;
  guarantorPhone: string;
  guarantorRelation: string;
  guarantorIncome: string;
  contractAddress: string;
  contractCity: string;
  propertyType: string;
  monthlyRent: string;
  contractTerm: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const initialState: FormData = {
  firstName: "",
  lastName: "",
  documentId: "",
  phone: "+34",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
  universityEmail: "",
  universityName: "",
  guarantorName: "",
  guarantorLastName: "",
  guarantorDocumentId: "",
  guarantorPhone: "+34",
  guarantorRelation: "",
  guarantorIncome: "",
  contractAddress: "",
  contractCity: "",
  propertyType: "",
  monthlyRent: "",
  contractTerm: "",
};

export function LandlordRegistrationForm() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [umaIdScan, setUmaIdScan] = useState<File | null>(null);
  const [guarantorIdScan, setGuarantorIdScan] = useState<File | null>(null);
  const [guarantorPayslip, setGuarantorPayslip] = useState<File | null>(null);

  const totalSteps = 4;

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    const { name, value } = target;
    const checked = "checked" in target ? target.checked : false;
    const type = "type" in target ? target.type : undefined;

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
    if (currentStep < totalSteps - 1) {
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
    setForm(initialState);
    setCurrentStep(0);
    setUmaIdScan(null);
    setGuarantorIdScan(null);
    setGuarantorPayslip(null);

    router.push("/propietario/verificacion");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-5">
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
              <label htmlFor="documentId" className="mb-2 block text-sm font-medium text-[#213f47]">
                DNI / NIE / CIF
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

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#213f47]">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="tuemail@ejemplo.com"
                className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div className="rounded-[18px] border border-[#e2ddd6] bg-[#f7f3ee] p-3">
              <label className="flex items-start gap-3 text-sm leading-6 text-[#334d54]">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={form.acceptTerms}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-[#c9d2cd] text-[#1f5d53] focus:ring-[#1f5d53]"
                />
                <span>
                  Acepto los términos de servicio y autorizo a la IA de Kolivin a asistir en la gestión
                  automatizada de mis inmuebles.
                </span>
              </label>
              {errors.acceptTerms && <p className="mt-2 text-sm text-red-600">{errors.acceptTerms}</p>}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-5">
            <div>
              <label htmlFor="universityName" className="mb-2 block text-sm font-medium text-[#213f47]">
                Universidad o centro
              </label>
              <input
                id="universityName"
                name="universityName"
                type="text"
                value={form.universityName}
                onChange={handleChange}
                placeholder="Universidad de Málaga"
                className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
              />
            </div>

            <div>
              <label htmlFor="universityEmail" className="mb-2 block text-sm font-medium text-[#213f47]">
                Correo de la UMA
              </label>
              <input
                id="universityEmail"
                name="universityEmail"
                type="email"
                value={form.universityEmail}
                onChange={handleChange}
                placeholder="nombre@uma.es"
                className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
              />
            </div>

            <div className="rounded-[18px] border border-dashed border-[#bfd9e7] bg-[#f4f9fb] p-4">
              <label className="mb-2 block text-sm font-medium text-[#213f47]">
                DNI escaneado
              </label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(event) => {
                  const selectedFile = event.target.files?.[0] ?? null;
                  setUmaIdScan(selectedFile);
                }}
                className="block w-full text-sm text-[#49656d] file:mr-4 file:rounded-full file:border-0 file:bg-[#e3efe9] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#1f5d53]"
              />
              {umaIdScan && <p className="mt-2 text-xs font-medium text-[#1f5d53]">{umaIdScan.name}</p>}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-5">
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
                  <label htmlFor="guarantorDocumentId" className="mb-2 block text-sm font-medium text-[#213f47]">
                    DNI / NIE del aval
                  </label>
                  <input
                    id="guarantorDocumentId"
                    name="guarantorDocumentId"
                    type="text"
                    value={form.guarantorDocumentId}
                    onChange={handleChange}
                    placeholder="12345678A"
                    className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                  />
                </div>

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
              </div>

              <div className="mt-4">
                <label htmlFor="guarantorPhone" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Teléfono del aval
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

              <div className="mt-4">
                <label htmlFor="guarantorIncome" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Ingresos mensuales del aval
                </label>
                <input
                  id="guarantorIncome"
                  name="guarantorIncome"
                  type="text"
                  value={form.guarantorIncome}
                  onChange={handleChange}
                  placeholder="2.500 € / mes"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
              </div>
            </div>

            <div className="space-y-4 rounded-[20px] border border-[#dfe7e3] bg-[#f7f9f8] p-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#213f47]">
                  Última nómina del aval
                </label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0] ?? null;
                    setGuarantorPayslip(selectedFile);
                  }}
                  className="block w-full text-sm text-[#49656d] file:mr-4 file:rounded-full file:border-0 file:bg-[#e3efe9] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#1f5d53]"
                />
                {guarantorPayslip && <p className="mt-2 text-xs font-medium text-[#1f5d53]">{guarantorPayslip.name}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-[#213f47]">
                  DNI escaneado del aval
                </label>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  onChange={(event) => {
                    const selectedFile = event.target.files?.[0] ?? null;
                    setGuarantorIdScan(selectedFile);
                  }}
                  className="block w-full text-sm text-[#49656d] file:mr-4 file:rounded-full file:border-0 file:bg-[#e3efe9] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#1f5d53]"
                />
                {guarantorIdScan && <p className="mt-2 text-xs font-medium text-[#1f5d53]">{guarantorIdScan.name}</p>}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contractAddress" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Dirección del inmueble
                </label>
                <input
                  id="contractAddress"
                  name="contractAddress"
                  type="text"
                  value={form.contractAddress}
                  onChange={handleChange}
                  placeholder="Calle, número, piso"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
              </div>

              <div>
                <label htmlFor="contractCity" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Ciudad
                </label>
                <input
                  id="contractCity"
                  name="contractCity"
                  type="text"
                  value={form.contractCity}
                  onChange={handleChange}
                  placeholder="Málaga"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label htmlFor="propertyType" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Tipo de inmueble
                </label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={form.propertyType}
                  onChange={handleChange}
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                >
                  <option value="">Selecciona</option>
                  <option value="piso">Piso</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="duplex">Dúplex</option>
                  <option value="estudio">Estudio</option>
                  <option value="villa">Villa</option>
                </select>
              </div>

              <div>
                <label htmlFor="monthlyRent" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Alquiler mensual
                </label>
                <input
                  id="monthlyRent"
                  name="monthlyRent"
                  type="text"
                  value={form.monthlyRent}
                  onChange={handleChange}
                  placeholder="850 €"
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                />
              </div>

              <div>
                <label htmlFor="contractTerm" className="mb-2 block text-sm font-medium text-[#213f47]">
                  Duración del contrato
                </label>
                <select
                  id="contractTerm"
                  name="contractTerm"
                  value={form.contractTerm}
                  onChange={handleChange}
                  className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                >
                  <option value="">Selecciona</option>
                  <option value="6">6 meses</option>
                  <option value="12">12 meses</option>
                  <option value="18">18 meses</option>
                  <option value="24">24 meses</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
      <div className="mb-5">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Registro</p>
        <h3 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-[#112d39]">
          {currentStep === 0 && "Datos personales"}
          {currentStep === 1 && "Verificación UMA"}
          {currentStep === 2 && "Aval y nómina"}
          {currentStep === 3 && "Datos del contrato"}
        </h3>
      </div>

      {renderStep()}

      <div className="mt-8 flex items-center justify-between border-t border-[#e4ddd5] pt-4">
        <button
          type="button"
          onClick={previousStep}
          disabled={currentStep === 0}
          className="inline-flex items-center justify-center rounded-[14px] border border-[#ced6d2] bg-white px-4 py-2.5 text-sm font-semibold text-[#17343c] transition hover:bg-[#f7f9f8] disabled:cursor-not-allowed disabled:opacity-40"
        >
          Atrás
        </button>

        {currentStep < totalSteps - 1 ? (
          <button
            type="button"
            onClick={nextStep}
            className="inline-flex items-center justify-center rounded-[14px] bg-[#1f5d53] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42]"
          >
            Siguiente
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-[14px] bg-[#1f5d53] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42]"
          >
            Crear cuenta
          </button>
        )}
      </div>

      {submitted && (
        <div className="rounded-[16px] border border-[#cfe2dc] bg-[#edf4f1] px-4 py-3 text-sm font-medium text-[#1f5d53]">
          Registro validado correctamente. Puedes continuar con la siguiente etapa.
        </div>
      )}
    </form>
  );
}
