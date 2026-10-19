"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type FormState = {
  ownerName: string;
  propertyAddress: string;
  documentType: string;
  acceptTerms: boolean;
  notes: string;
};

type FileState = {
  titleDeed: File | null;
  idDocument: File | null;
  ownershipProof: File | null;
};

type FormErrors = Partial<Record<keyof FormState | "titleDeed" | "idDocument" | "ownershipProof", string>>;

const initialForm: FormState = {
  ownerName: "",
  propertyAddress: "",
  documentType: "",
  acceptTerms: false,
  notes: "",
};

const initialFiles: FileState = {
  titleDeed: null,
  idDocument: null,
  ownershipProof: null,
};

export function DocumentVerificationForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [files, setFiles] = useState<FileState>(initialFiles);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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

  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!form.ownerName.trim()) {
      nextErrors.ownerName = "El nombre del titular es obligatorio.";
    }

    if (!form.propertyAddress.trim()) {
      nextErrors.propertyAddress = "La dirección de la propiedad es obligatoria.";
    }

    if (!form.documentType.trim()) {
      nextErrors.documentType = "Selecciona el tipo de documento principal.";
    }

    if (!files.titleDeed) {
      nextErrors.titleDeed = "Debes adjuntar la escritura o título de propiedad.";
    }

    if (!files.idDocument) {
      nextErrors.idDocument = "Debes adjuntar tu documento de identidad.";
    }

    if (!files.ownershipProof) {
      nextErrors.ownershipProof = "Debes adjuntar una prueba de titularidad o propiedad.";
    }

    if (!form.acceptTerms) {
      nextErrors.acceptTerms = "Debes aceptar la política de privacidad.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(false);

    if (!validate()) {
      return;
    }

    setSubmitted(true);
    setForm(initialForm);
    setFiles(initialFiles);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>, key: keyof FileState) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setFiles((prev) => ({ ...prev, [key]: selectedFile }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="rounded-[22px] border border-[#dfe7e3] bg-[#f7f9f8] p-4 text-sm leading-6 text-[#49656d]">
        <p className="font-semibold text-[#1f5d53]">Protección de datos</p>
        <p className="mt-2">
          Solo solicitamos la información estrictamente necesaria para verificar la titularidad,
          cumplir con la normativa aplicable y prevenir fraudes. Los documentos se gestionan con
          acceso limitado y no se usan para fines distintos a la validación de la propiedad.
        </p>
      </div>

      <div>
        <label htmlFor="ownerName" className="mb-2 block text-sm font-medium text-[#213f47]">
          Nombre del titular
        </label>
        <input
          id="ownerName"
          name="ownerName"
          type="text"
          value={form.ownerName}
          onChange={handleFieldChange}
          placeholder="Nombre completo"
          className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
        />
        {errors.ownerName && <p className="mt-1 text-sm text-red-600">{errors.ownerName}</p>}
      </div>

      <div>
        <label htmlFor="propertyAddress" className="mb-2 block text-sm font-medium text-[#213f47]">
          Dirección de la propiedad
        </label>
        <input
          id="propertyAddress"
          name="propertyAddress"
          type="text"
          value={form.propertyAddress}
          onChange={handleFieldChange}
          placeholder="Calle, número, distrito o barrio"
          className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
        />
        {errors.propertyAddress && <p className="mt-1 text-sm text-red-600">{errors.propertyAddress}</p>}
      </div>

      <div>
        <label htmlFor="documentType" className="mb-2 block text-sm font-medium text-[#213f47]">
          Tipo de documento principal
        </label>
        <select
          id="documentType"
          name="documentType"
          value={form.documentType}
          onChange={handleFieldChange}
          className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
        >
          <option value="">Selecciona una opción</option>
          <option value="escritura">Escritura / título de propiedad</option>
          <option value="certificado">Certificado de titularidad</option>
          <option value="hipoteca">Documentación registral</option>
        </select>
        {errors.documentType && <p className="mt-1 text-sm text-red-600">{errors.documentType}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { key: "titleDeed", label: "Escritura / título", helper: "PDF, JPG o PNG" },
          { key: "idDocument", label: "Documento de identidad", helper: "DNI, NIE o pasaporte" },
          { key: "ownershipProof", label: "Prueba de titularidad", helper: "Factura, nota simple o similar" },
        ].map(({ key, label, helper }) => {
          const typedKey = key as keyof FileState;
          const fileName = files[typedKey]?.name || "No seleccionado";

          return (
            <div key={key} className="rounded-[18px] border border-[#d8d2cb] bg-[#f9f7f4] p-4">
              <label className="mb-2 block text-sm font-medium text-[#213f47]">{label}</label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(event) => handleFileChange(event, typedKey)}
                className="block w-full text-sm text-[#49656d] file:mr-4 file:rounded-full file:border-0 file:bg-[#e3efe9] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#1f5d53]"
              />
              <p className="mt-2 text-xs text-[#5d727a]">{helper}</p>
              <p className="mt-2 truncate text-xs font-medium text-[#1f5d53]">{fileName}</p>
              {errors[typedKey] && <p className="mt-2 text-xs text-red-600">{errors[typedKey]}</p>}
            </div>
          );
        })}
      </div>

      <div>
        <label htmlFor="notes" className="mb-2 block text-sm font-medium text-[#213f47]">
          Comentarios adicionales (opcional)
        </label>
        <textarea
          id="notes"
          name="notes"
          value={form.notes}
          onChange={handleFieldChange}
          rows={4}
          placeholder="Añade cualquier detalle que ayude a la revisión."
          className="w-full rounded-[16px] border border-[#d8d2cb] bg-[#f9f7f4] px-4 py-3 text-base text-[#1b2a2d] outline-none transition focus:border-[#1f5d53] focus:ring-2 focus:ring-[#cfe2dc]"
        />
      </div>

      <div className="rounded-[18px] border border-[#e2ddd6] bg-[#f7f3ee] p-3">
        <label className="flex items-start gap-3 text-sm leading-6 text-[#334d54]">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={form.acceptTerms}
            onChange={handleFieldChange}
            className="mt-1 h-4 w-4 rounded border-[#c9d2cd] text-[#1f5d53] focus:ring-[#1f5d53]"
          />
          <span>
            Confirmo que la información proporcionada es veraz y autorizo a Kolivin a tratar estos
            documentos únicamente para la verificación de la propiedad y la gestión de alquiler.
          </span>
        </label>
        {errors.acceptTerms && <p className="mt-2 text-sm text-red-600">{errors.acceptTerms}</p>}
      </div>

      {submitted && (
        <div className="rounded-[16px] border border-[#cfe2dc] bg-[#edf4f1] px-4 py-3 text-sm font-medium text-[#1f5d53]">
          Documentación recibida correctamente. Revisaremos tu verificación en un plazo breve.
        </div>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-[16px] bg-[#1f5d53] px-5 py-3.5 text-base font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42]"
      >
        Enviar verificación
      </button>
    </form>
  );
}
