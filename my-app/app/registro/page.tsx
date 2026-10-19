"use client";

import { useState } from "react";
import { LandlordRegistrationForm } from "@/components/LandlordRegistrationForm";
import { StudentRegistrationForm } from "@/components/StudentRegistrationForm";
import SiteNavigation from "@/components/SiteNavigation";

export default function RegistroPage() {
  const [selectedProfile, setSelectedProfile] = useState<"student" | "landlord" | null>(null);
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    documentId: "",
    phone: "+34",
    address: "",
    city: "",
    postalCode: "",
  });

  const handlePersonalDataChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    if (name === "phone") {
      setPersonalData((prev) => ({
        ...prev,
        phone: `+34${value.replace(/\D/g, "")}`,
      }));
      return;
    }

    setPersonalData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#f3efe9] px-4 py-8 text-[#1b2a2d] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <SiteNavigation variant="auth" actionLabel="Iniciar sesión" actionHref="/login" />

        <main className="overflow-hidden rounded-[32px] border border-[#d7d1ca] bg-[#f7f3ee] p-4 shadow-[0_20px_45px_rgba(17,45,57,0.08)] sm:p-6 lg:p-8">
          <section className="p-2 sm:p-4 lg:p-6">
            <div className="rounded-[28px] border border-[#d7d1ca] bg-white p-5 sm:p-6">
              {!selectedProfile ? (
                <>
                  <div className="mb-6">
                    <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Registro</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#112d39]">
                      ¿Quién eres?
                    </h2>
                  </div>

                  <div className="mb-6 rounded-[22px] border border-[#e3ddd5] bg-[#f8f5f2] p-4 sm:p-5">
                    <p className="mb-4 text-sm font-medium text-[#1f5d53]">Datos personales</p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-[#213f47]">
                          Nombre
                        </label>
                        <input
                          id="firstName"
                          name="firstName"
                          type="text"
                          value={personalData.firstName}
                          onChange={handlePersonalDataChange}
                          placeholder="Tu nombre"
                          className="w-full rounded-[16px] border border-[#d8d2cb] bg-white px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                        />
                      </div>

                      <div>
                        <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-[#213f47]">
                          Apellidos
                        </label>
                        <input
                          id="lastName"
                          name="lastName"
                          type="text"
                          value={personalData.lastName}
                          onChange={handlePersonalDataChange}
                          placeholder="Tus apellidos"
                          className="w-full rounded-[16px] border border-[#d8d2cb] bg-white px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="documentId" className="mb-2 block text-sm font-medium text-[#213f47]">
                        DNI / NIE
                      </label>
                      <input
                        id="documentId"
                        name="documentId"
                        type="text"
                        value={personalData.documentId}
                        onChange={handlePersonalDataChange}
                        placeholder="12345678A"
                        className="w-full rounded-[16px] border border-[#d8d2cb] bg-white px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                      />
                    </div>

                    <div className="mt-4">
                      <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#213f47]">
                        Teléfono
                      </label>
                      <div className="flex items-center overflow-hidden rounded-[16px] border border-[#d8d2cb] bg-white focus-within:border-[#1f5d53] focus-within:ring-2 focus-within:ring-[#cfe2dc]">
                        <span className="border-r border-[#d8d2cb] bg-[#f3efe9] px-3 py-3 text-sm font-medium text-[#1b2a2d]">
                          +34
                        </span>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={personalData.phone.replace(/^\+34/, "")}
                          onChange={handlePersonalDataChange}
                          placeholder="600123456"
                          className="w-full border-0 bg-transparent px-4 py-3 text-base text-[#1b2a2d] outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-4 grid gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="address" className="mb-2 block text-sm font-medium text-[#213f47]">
                          Dirección
                        </label>
                        <input
                          id="address"
                          name="address"
                          type="text"
                          value={personalData.address}
                          onChange={handlePersonalDataChange}
                          placeholder="Calle, número, piso"
                          className="w-full rounded-[16px] border border-[#d8d2cb] bg-white px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                        />
                      </div>

                      <div>
                        <label htmlFor="city" className="mb-2 block text-sm font-medium text-[#213f47]">
                          Ciudad
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={personalData.city}
                          onChange={handlePersonalDataChange}
                          placeholder="Málaga"
                          className="w-full rounded-[16px] border border-[#d8d2cb] bg-white px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-[#213f47]">
                        Código postal
                      </label>
                      <input
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        value={personalData.postalCode}
                        onChange={handlePersonalDataChange}
                        placeholder="29001"
                        className="w-full rounded-[16px] border border-[#d8d2cb] bg-white px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => setSelectedProfile("student")}
                      className="rounded-[18px] border border-[#d7d1ca] bg-[#f9f7f4] p-4 text-left transition hover:border-[#cfe2dc] hover:bg-[#edf4f1]"
                    >
                      <div className="text-lg font-semibold text-[#112d39]">Soy estudiante</div>
                      <div className="mt-1 text-sm text-[#53686d]">Busco piso y compañeros</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedProfile("landlord")}
                      className="rounded-[18px] border border-[#d7d1ca] bg-[#f9f7f4] p-4 text-left transition hover:border-[#cfe2dc] hover:bg-[#edf4f1]"
                    >
                      <div className="text-lg font-semibold text-[#112d39]">Soy propietario</div>
                      <div className="mt-1 text-sm text-[#53686d]">Quiero publicar o alquilar</div>
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-6">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f747a]">Registro</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em] text-[#112d39]">
                          {selectedProfile === "student" ? "Perfil de estudiante" : "Perfil de propietario"}
                        </h2>
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedProfile(null)}
                        className="text-sm font-medium text-[#1f5d53] underline-offset-4 hover:underline"
                      >
                        Cambiar perfil
                      </button>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => setSelectedProfile("student")}
                        className={`rounded-[16px] border p-3 text-left transition ${
                          selectedProfile === "student"
                            ? "border-[#1f5d53] bg-[#1f5d53] text-white shadow-[0_10px_20px_rgba(31,93,83,0.18)]"
                            : "border-[#d7d1ca] bg-[#f9f7f4] text-[#112d39] hover:border-[#cfe2dc]"
                        }`}
                      >
                        <div className="text-base font-semibold">Soy estudiante</div>
                        <div className={`mt-1 text-xs ${selectedProfile === "student" ? "text-white/80" : "text-[#53686d]"}`}>
                          Busco piso y compañeros
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedProfile("landlord")}
                        className={`rounded-[16px] border p-3 text-left transition ${
                          selectedProfile === "landlord"
                            ? "border-[#1f5d53] bg-[#1f5d53] text-white shadow-[0_10px_20px_rgba(31,93,83,0.18)]"
                            : "border-[#d7d1ca] bg-[#f9f7f4] text-[#112d39] hover:border-[#cfe2dc]"
                        }`}
                      >
                        <div className="text-base font-semibold">Soy propietario</div>
                        <div className={`mt-1 text-xs ${selectedProfile === "landlord" ? "text-white/80" : "text-[#53686d]"}`}>
                          Quiero publicar o alquilar
                        </div>
                      </button>
                    </div>
                  </div>

                  {selectedProfile === "student" ? <StudentRegistrationForm /> : <LandlordRegistrationForm />}
                </>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
