"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import SiteNavigation from "@/components/SiteNavigation"

const A = "/assets"

const studentGroups = [
  {
    name: "Grupo tranquilo por Teatinos",
    zone: "Teatinos",
    description:
      "Tres estudiantes tranquilos quieren conocerse y buscar juntos un piso cerca del metro.",
    tags: ["Tranquilidad", "Estudio", "Café"],
    members: 3,
    capacity: 4,
    activity: "1 plaza disponible",
  },
  {
    name: "Estudiantes internacionales",
    zone: "Centro",
    description:
      "Tres estudiantes de intercambio quieren formar grupo antes de empezar a buscar vivienda.",
    tags: ["Idiomas", "Cultura", "Social"],
    members: 3,
    capacity: 4,
    activity: "1 plaza disponible",
  },
  {
    name: "Grupo activo cerca del campus",
    zone: "Teatinos",
    description:
      "Dos estudiantes deportistas buscan compañeros compatibles para formar un grupo de cuatro.",
    tags: ["Deporte", "Madrugador", "Social"],
    members: 2,
    capacity: 4,
    activity: "2 plazas disponibles",
  },
  {
    name: "Grupo para vivir cerca del mar",
    zone: "El Palo",
    description:
      "Dos estudiantes sociables quieren completar grupo y después buscar por El Palo.",
    tags: ["Playa", "Deporte", "Social"],
    members: 2,
    capacity: 4,
    activity: "2 plazas disponibles",
  },
  {
    name: "Estudiantes creativos de Huelin",
    zone: "Huelin",
    description:
      "Estudiantes de diseño y música buscan una última persona antes de buscar piso.",
    tags: ["Arte", "Cultura", "Nocturno"],
    members: 3,
    capacity: 4,
    activity: "1 plaza disponible",
  },
  {
    name: "Grupo de Ingeniería Informática",
    zone: "Teatinos",
    description:
      "Tres estudiantes con hábitos de estudio quieren completar su grupo de convivencia.",
    tags: ["Tecnología", "Estudio", "Emprendimiento"],
    members: 3,
    capacity: 4,
    activity: "1 plaza disponible",
  },
]

const malagaRooms = [
  {
    image: "8d43c.png",
    place: "Teatinos, Málaga",
    title: "Piso luminoso junto al metro",
    meta: "4 habitaciones · 2 baños · Amueblado",
    price: "1.280 €",
  },
  {
    image: "08e8f.png",
    place: "Centro, Málaga",
    title: "Piso para estudiantes en el centro",
    meta: "3 habitaciones · 1 baño · Amueblado",
    price: "1.050 €",
  },
  {
    image: "ce774.png",
    place: "El Palo, Málaga",
    title: "Compartir cerca de la playa",
    meta: "4 habitaciones · 2 baños · Terraza",
    price: "1.400 €",
  },
]

type Tone = "success" | "warning" | "danger" | "neutral"

function Title({
  children,
  level = 2,
}: {
  children: ReactNode
  level?: 1 | 2 | 3
}) {
  const Tag = `h${level}` as const
  return <Tag>{children}</Tag>
}

function Button({
  children,
  variant = "primary",
  disabled,
  onClick,
  type,
}: {
  children: ReactNode
  variant?: "primary" | "secondary" | "ghost"
  disabled?: boolean
  onClick?: () => void
  type?: "button" | "submit"
}) {
  return (
    <button
      type={type}
      className={`button button--${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

function Tag({
  children,
  tone = "success",
}: {
  children: ReactNode
  tone?: Tone
}) {
  return <span className={`tag tag--${tone}`}>{children}</span>
}

function Field({
  label,
  value,
  help,
  error,
  disabled,
  type = "text",
  icon,
}: {
  label: string
  value: string
  help?: string
  error?: string
  disabled?: boolean
  type?: string
  icon?: string
}) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <span className="input-wrap">
        <input defaultValue={value} disabled={disabled} type={type} />
        {icon && <img src={`${A}/${icon}`} alt="" />}
      </span>
      {(help || error) && (
        <small className={error ? "field__error" : ""}>{error || help}</small>
      )}
    </label>
  )
}

function SelectField({
  label,
  children,
}: {
  label: string
  children: ReactNode
}) {
  return (
    <label className="field">
      <span className="field__label">{label}</span>
      <span className="input-wrap">
        <select defaultValue="default">
          <option value="default">{children}</option>
        </select>
        <img src={`${A}/c44dd.svg`} alt="" />
      </span>
    </label>
  )
}

function Panel({
  title,
  note,
  children,
  className = "",
}: {
  title?: string
  note?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section className={`panel ${className}`}>
      {(title || note) && (
        <header className="panel__header">
          {title && <Title>{title}</Title>}
          {note && <small>{note}</small>}
        </header>
      )}
      {children}
    </section>
  )
}

function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <header className="page-intro">
      <div className="page-intro__meta">
        <strong>{eyebrow}</strong>
        <span>01.0 · Octubre 2026</span>
      </div>
      <Title level={1}>{title}</Title>
      <p>{description}</p>
    </header>
  )
}

function Alert({
  tone,
  title,
  children,
}: {
  tone: Exclude<Tone, "neutral">
  title: string
  children: ReactNode
}) {
  return (
    <div className={`alert alert--${tone}`}>
      {tone === "success" ? (
        <img className="alert__asset" src={`${A}/01330.svg`} alt="" />
      ) : (
        <span className="alert__icon" aria-hidden="true">
          !
        </span>
      )}
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  )
}

function KolivinNav({
  registration = false,
  owner = false,
  activeView = "home",
  onHome,
  onGroup,
  onChat,
  onFlats,
  ownerView = "home",
  onOwnerNavigate,
  onLogin,
  onRegister,
  onLogout,
}: {
  registration?: boolean
  owner?: boolean
  activeView?: "home" | "manage" | "chat"
  onHome?: () => void
  onGroup?: () => void
  onChat?: () => void
  onFlats?: () => void
  ownerView?: string
  onOwnerNavigate?: (view: string) => void
  onLogin?: () => void
  onRegister?: () => void
  onLogout?: () => void
}) {
  const ownerItems = [
    ["home", "Inicio"],
    ["properties", "Inmuebles"],
    ["requests", "Solicitudes"],
    ["chat", "Chat"],
    ["invoices", "Facturas"],
    ["issues", "Incidencias"],
  ]

  const items = owner
    ? ownerItems.map(([id, label]) => ({
        id,
        label,
        active: ownerView === id,
        onClick: () => onOwnerNavigate?.(id),
      }))
    : [
        {
          id: "home",
          label: "Inicio",
          active: activeView === "home",
          onClick: () => onHome?.(),
        },
        {
          id: "manage",
          label: "Mi grupo",
          active: activeView === "manage",
          onClick: () => onGroup?.(),
        },
        {
          id: "chat",
          label: "Chat",
          active: activeView === "chat",
          onClick: () => onChat?.(),
        },
        { id: "flats", label: "Pisos", onClick: () => onFlats?.() },
        { id: "requests", label: "Solicitudes", onClick: () => {} },
      ]

  return (
    <SiteNavigation
      variant="dashboard"
      registration={registration}
      owner={owner}
      items={items}
      actionLabel={onRegister ? "Regístrate" : "Iniciar sesión"}
      onAction={onRegister ?? onLogin}
      onLogout={onLogout}
    />
  )
}

function OwnerDashboard({
  onLogout,
  returning = false,
}: {
  onLogout?: () => void
  returning?: boolean
}) {
  const [view, setView] =
    useState<"home" | "properties" | "requests" | "chat" | "invoices" | "issues">(
      "home",
    )
  const [showOwnerWelcome, setShowOwnerWelcome] = useState(!returning)
  const [showPropertyModal, setShowPropertyModal] = useState(false)
  const [propertyStep, setPropertyStep] = useState(1)
  const [propertyPublished, setPropertyPublished] = useState(false)
  const [propertyPhotos, setPropertyPhotos] = useState("")
  const [propertyDocuments, setPropertyDocuments] = useState("")
  const [ownerMessage, setOwnerMessage] = useState("")
  const [ownerMessages, setOwnerMessages] = useState([
    {
      author: "Lucía",
      text: "Hola, hemos revisado la factura de suministros. Todo correcto.",
      own: false,
      time: "11:08",
    },
    {
      author: "Tú",
      text: "Perfecto. Esta tarde os envío el recibo por el chat.",
      own: true,
      time: "11:12",
    },
  ])

  return (
    <div className="owner-dashboard">
      {showOwnerWelcome && (
        <div className="preferences-overlay">
          <section className="owner-welcome" role="dialog" aria-modal="true">
            <span className="owner-welcome__mark">
              <img src={`${A}/5bd00.svg`} alt="" />
            </span>
            <span className="registration-kicker">BIENVENIDO A KOLIVIN</span>
            <Title level={2}>Tu panel de propietario está listo.</Title>
            <p>
              Empieza añadiendo tu primer inmueble. Te guiaremos paso a paso y
              podrás revisar todo antes de publicarlo.
            </p>
            <div className="owner-welcome__points">
              <span>
                <i>1</i>Datos del inmueble
              </span>
              <span>
                <i>2</i>Condiciones y estudiantes
              </span>
              <span>
                <i>3</i>Fotografías y publicación
              </span>
            </div>
            <Button
              onClick={() => {
                setShowOwnerWelcome(false)
                setView("properties")
                setPropertyStep(1)
                setShowPropertyModal(true)
              }}
            >
              Añadir mi primer inmueble <span>→</span>
            </Button>
            <Button variant="ghost" onClick={() => setShowOwnerWelcome(false)}>
              Explorar el panel primero
            </Button>
          </section>
        </div>
      )}

      {showPropertyModal && (
        <div className="preferences-overlay">
          <section
            className="owner-property-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="property-modal-title"
          >
            <header>
              <div>
                <span className="registration-kicker">PRIMER INMUEBLE</span>
                <Title level={2}>Añade tu piso a Kolivin.</Title>
                <p id="property-modal-title">
                  Paso {propertyStep} de 3 ·{" "}
                  {propertyStep === 1
                    ? "El inmueble"
                    : propertyStep === 2
                      ? "Condiciones y estudiantes"
                      : "Fotos y documentación"}
                </p>
                <div className="property-progress">
                  {[1, 2, 3].map((step) => (
                    <span
                      className={propertyStep >= step ? "active" : ""}
                      key={step}
                    />
                  ))}
                </div>
              </div>
              <button
                aria-label="Cerrar"
                onClick={() => setShowPropertyModal(false)}
              >
                ×
              </button>
            </header>

            <form
              className="property-form"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                setPropertyPublished(true)
                setShowPropertyModal(false)
                setView("properties")
              }}
            >
              {propertyStep === 1 && (
                <>
                  <fieldset>
                    <legend>Ubicación</legend>
                    <div className="property-form__grid">
                      <label className="field property-form__wide">
                        <span className="field__label">Dirección completa</span>
                        <input placeholder="Calle, número, planta y puerta" />
                      </label>
                      <label className="field">
                        <span className="field__label">Código postal</span>
                        <input placeholder="29010" />
                      </label>
                      <label className="field">
                        <span className="field__label">Zona</span>
                        <select defaultValue="Teatinos">
                          <option>Teatinos</option>
                          <option>Centro</option>
                          <option>Huelin</option>
                          <option>El Palo</option>
                          <option>Cruz de Humilladero</option>
                        </select>
                      </label>
                      <label className="field property-form__wide">
                        <span className="field__label">
                          Transporte y centros cercanos
                        </span>
                        <input placeholder="Metro, autobús, facultades o escuelas cercanas" />
                      </label>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>Características del piso</legend>
                    <div className="property-form__grid property-form__grid--four">
                      <label className="field">
                        <span className="field__label">Habitaciones</span>
                        <input type="number" placeholder="4" />
                      </label>
                      <label className="field">
                        <span className="field__label">Baños</span>
                        <input type="number" placeholder="2" />
                      </label>
                      <label className="field">
                        <span className="field__label">Superficie</span>
                        <input placeholder="110 m²" />
                      </label>
                      <label className="field">
                        <span className="field__label">Planta</span>
                        <input placeholder="3ª" />
                      </label>
                    </div>
                    <div className="property-options">
                      {[
                        "Amueblado",
                        "Ascensor",
                        "Wifi",
                        "Calefacción",
                        "Aire acondicionado",
                        "Lavadora",
                        "Lavavajillas",
                        "Terraza",
                        "Escritorio en cada habitación",
                        "Accesible",
                      ].map((option) => (
                        <label key={option}>
                          <input type="checkbox" /> {option}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                </>
              )}

              {propertyStep === 2 && (
                <>
                  <fieldset>
                    <legend>Precio y disponibilidad</legend>
                    <div className="property-form__grid">
                      <label className="field">
                        <span className="field__label">Alquiler mensual</span>
                        <input placeholder="1.280 €" />
                      </label>
                      <label className="field">
                        <span className="field__label">Fianza</span>
                        <input placeholder="1 mensualidad" />
                      </label>
                      <label className="field">
                        <span className="field__label">Disponible desde</span>
                        <input type="date" />
                      </label>
                      <label className="field">
                        <span className="field__label">Estancia mínima</span>
                        <select defaultValue="9 meses">
                          <option>6 meses</option>
                          <option>9 meses</option>
                          <option>12 meses</option>
                        </select>
                      </label>
                    </div>
                    <div className="property-options">
                      <label>
                        <input type="checkbox" /> Agua incluida
                      </label>
                      <label>
                        <input type="checkbox" /> Electricidad incluida
                      </label>
                      <label>
                        <input type="checkbox" /> Internet incluido
                      </label>
                      <label>
                        <input type="checkbox" /> Comunidad incluida
                      </label>
                    </div>
                  </fieldset>

                  <fieldset>
                    <legend>Perfil de estudiantes buscado</legend>
                    <p>
                      Define preferencias de convivencia, nunca características
                      personales protegidas.
                    </p>
                    <div className="property-options">
                      {[
                        "Grado",
                        "Posgrado",
                        "Intercambio",
                        "Ambiente tranquilo",
                        "Hábitos de estudio",
                        "No fumadores",
                        "Estancia de curso completo",
                        "Grupo ya formado",
                      ].map((option) => (
                        <label key={option}>
                          <input type="checkbox" /> {option}
                        </label>
                      ))}
                    </div>
                    <label className="field">
                      <span className="field__label">
                        Normas de convivencia
                      </span>
                      <textarea placeholder="Horarios de descanso, visitas, mascotas, limpieza…" />
                    </label>
                  </fieldset>
                </>
              )}

              {propertyStep === 3 && (
                <fieldset>
                  <legend>Fotografías, documentación y publicación</legend>
                  <p>
                    Añade material suficiente para revisar y publicar el
                    inmueble.
                  </p>
                  <label
                    className={`enrollment-upload ${
                      propertyPhotos ? "has-file" : ""
                    }`}
                  >
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      multiple
                      onChange={(event) =>
                        setPropertyPhotos(
                          event.target.files?.length
                            ? `${event.target.files.length} fotografías seleccionadas`
                            : "",
                        )
                      }
                    />
                    <img src={`${A}/2e394.svg`} alt="" />
                    <span>
                      <strong>
                        {propertyPhotos || "Añadir fotografías del inmueble"}
                      </strong>
                      <small>
                        Salón, habitaciones, cocina, baños y exterior
                      </small>
                    </span>
                  </label>
                  <label
                    className={`enrollment-upload ${
                      propertyDocuments ? "has-file" : ""
                    }`}
                  >
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      multiple
                      onChange={(event) =>
                        setPropertyDocuments(
                          event.target.files?.length
                            ? `${event.target.files.length} documentos seleccionados`
                            : "",
                        )
                      }
                    />
                    <img src={`${A}/2e394.svg`} alt="" />
                    <span>
                      <strong>
                        {propertyDocuments ||
                          "Añadir documentación del inmueble"}
                      </strong>
                      <small>
                        Nota simple o escritura, certificado energético, IBI y
                        documentación disponible
                      </small>
                    </span>
                  </label>
                  <div className="property-form__grid">
                    <label className="field">
                      <span className="field__label">Referencia catastral</span>
                      <input placeholder="Referencia del inmueble" />
                    </label>
                    <label className="field">
                      <span className="field__label">
                        Certificación energética
                      </span>
                      <select defaultValue="">
                        <option value="" disabled>
                          Selecciona una calificación
                        </option>
                        <option>A</option>
                        <option>B</option>
                        <option>C</option>
                        <option>D</option>
                        <option>E</option>
                        <option>F</option>
                        <option>G</option>
                      </select>
                    </label>
                  </div>
                  <label className="field">
                    <span className="field__label">Descripción</span>
                    <textarea placeholder="Describe el piso, el barrio y qué lo hace adecuado para estudiantes." />
                  </label>
                </fieldset>
              )}

              <footer>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    if (propertyStep === 1) {
                      setShowPropertyModal(false)
                    } else {
                      setPropertyStep(propertyStep - 1)
                    }
                  }}
                >
                  {propertyStep === 1 ? "Guardar borrador" : "← Anterior"}
                </Button>
                {propertyStep < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setPropertyStep(propertyStep + 1)}
                  >
                    Continuar <span>→</span>
                  </Button>
                ) : (
                  <Button>
                    Finalizar <span>→</span>
                  </Button>
                )}
              </footer>
            </form>
          </section>
        </div>
      )}

      <KolivinNav
        owner
        ownerView={view}
        onLogout={onLogout}
        onOwnerNavigate={(next) =>
          setView(
            next as "home" | "properties" | "requests" | "chat" | "invoices" | "issues",
          )
        }
      />

      <main className="owner-main">
        {view === "home" && (
          <>
            <header className="owner-page-heading">
              <div>
                <span className="registration-kicker">
                  PANEL DEL PROPIETARIO
                </span>
                <Title level={1}>Gestiona tus alquileres.</Title>
                <p>
                  Publica inmuebles, selecciona grupos y acompaña a tus
                  inquilinos desde un único lugar.
                </p>
              </div>
              <Button
                onClick={() => {
                  setPropertyStep(1)
                  setShowPropertyModal(true)
                }}
              >
                Añadir inmueble
              </Button>
            </header>
            <div className="owner-stats">
              <article>
                <small>Inmuebles publicados</small>
                <strong>{propertyPublished ? "1" : "0"}</strong>
                <span>En la plataforma</span>
              </article>
              <article>
                <small>Solicitudes nuevas</small>
                <strong>3</strong>
                <span>Grupos interesados</span>
              </article>
              <article>
                <small>Ingresos este mes</small>
                <strong>1.280 €</strong>
                <span>Pagos al día</span>
              </article>
              <article>
                <small>Incidencias abiertas</small>
                <strong>1</strong>
                <span>Prioridad media</span>
              </article>
            </div>
            <div className="owner-home-grid">
              <section className="owner-card">
                <div className="dashboard-card__heading">
                  <Title>Actividad reciente</Title>
                  <button onClick={() => setView("requests")}>Ver todo</button>
                </div>
                {[
                  [
                    "Solicitud recibida",
                    "Grupo tranquilo por Teatinos",
                    "Hace 12 min",
                  ],
                  ["Factura pagada", "Suministros · Octubre", "Ayer"],
                  ["Nueva incidencia", "La persiana del salón no baja", "Ayer"],
                ].map(([title, detail, time]) => (
                  <article className="owner-activity" key={title}>
                    <span>{title[0]}</span>
                    <p>
                      <strong>{title}</strong>
                      <small>{detail}</small>
                    </p>
                    <small>{time}</small>
                  </article>
                ))}
              </section>
              <section className="owner-card owner-next-actions">
                <Title>Acciones rápidas</Title>
                <button
                  onClick={() => {
                    setPropertyStep(1)
                    setShowPropertyModal(true)
                  }}
                >
                  <span>I</span>
                  <div>
                    <strong>Añadir inmueble</strong>
                    <small>Crea un nuevo anuncio</small>
                  </div>
                  <i>→</i>
                </button>
                <button onClick={() => setView("invoices")}>
                  <span>F</span>
                  <div>
                    <strong>Enviar factura</strong>
                    <small>Comparte un recibo con los inquilinos</small>
                  </div>
                  <i>→</i>
                </button>
                <button onClick={() => setView("issues")}>
                  <span>!</span>
                  <div>
                    <strong>Revisar incidencias</strong>
                    <small>1 incidencia necesita atención</small>
                  </div>
                  <i>→</i>
                </button>
              </section>
            </div>
          </>
        )}

        {view === "properties" && (
          <section className="owner-section">
            <header className="owner-page-heading">
              <div>
                <Title level={1}>Mis inmuebles</Title>
                <p>Gestiona borradores y anuncios publicados.</p>
              </div>
              <Button
                onClick={() => {
                  setPropertyStep(1)
                  setShowPropertyModal(true)
                }}
              >
                Añadir inmueble
              </Button>
            </header>
            {propertyPublished ? (
              <article className="owner-property-card">
                <img src={`${A}/8d43c.png`} alt="Piso en Teatinos" />
                <div>
                  <div className="split">
                    <Tag>Publicado</Tag>
                    <small>3 solicitudes</small>
                  </div>
                  <Title level={3}>Piso luminoso junto al metro</Title>
                  <p>Teatinos · 4 habitaciones · 2 baños</p>
                  <strong>1.280 € / mes</strong>
                  <div>
                    <Button variant="secondary">Editar</Button>
                    <Button>Ver solicitudes</Button>
                  </div>
                </div>
              </article>
            ) : (
              <div className="owner-empty">
                <Title level={3}>Todavía no tienes inmuebles</Title>
                <p>Añade el primero para empezar a recibir solicitudes.</p>
                <Button
                  onClick={() => {
                    setPropertyStep(1)
                    setShowPropertyModal(true)
                  }}
                >
                  Añadir inmueble
                </Button>
              </div>
            )}
          </section>
        )}

        {view === "requests" && (
          <section className="owner-section">
            <header className="owner-page-heading">
              <div>
                <Title level={1}>Solicitudes de grupos</Title>
                <p>Revisa perfiles compatibles antes de aceptar una visita.</p>
              </div>
            </header>
            <div className="owner-request-list">
              {[
                [
                  "Grupo tranquilo por Teatinos",
                  "4 estudiantes",
                  "92 % compatible",
                ],
                [
                  "Estudiantes de Arquitectura",
                  "3 estudiantes",
                  "87 % compatible",
                ],
                [
                  "Grupo internacional del Centro",
                  "4 estudiantes",
                  "81 % compatible",
                ],
              ].map(([name, members, match]) => (
                <article className="owner-card" key={name}>
                  <div className="owner-request-avatars">
                    <span>LM</span>
                    <span>MG</span>
                    <span>SA</span>
                    <span>+1</span>
                  </div>
                  <Title level={3}>{name}</Title>
                  <p>
                    {members} · {match}
                  </p>
                  <div className="group-tags">
                    <span>Perfiles verificados</span>
                    <span>Aval completado</span>
                  </div>
                  <div>
                    <Button variant="secondary">Ver grupo</Button>
                    <Button>Proponer visita</Button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {view === "chat" && (
          <section className="owner-section">
            <header className="owner-page-heading">
              <div>
                <Title level={1}>Chat con inquilinos</Title>
                <p>Piso luminoso junto al metro · 4 inquilinos</p>
              </div>
            </header>
            <div className="owner-chat">
              <div className="chat-messages">
                {ownerMessages.map((message, index) => (
                  <article className={message.own ? "own" : ""} key={index}>
                    {!message.own && <span>LM</span>}
                    <div>
                      {!message.own && <strong>{message.author}</strong>}
                      <p>{message.text}</p>
                      <small>{message.time}</small>
                    </div>
                  </article>
                ))}
              </div>
              <form
                className="chat-composer"
                onSubmit={(event) => {
                  event.preventDefault()
                  if (!ownerMessage.trim()) return
                  setOwnerMessages([
                    ...ownerMessages,
                    {
                      author: "Tú",
                      text: ownerMessage,
                      own: true,
                      time: "Ahora",
                    },
                  ])
                  setOwnerMessage("")
                }}
              >
                <button type="button">+</button>
                <input
                  value={ownerMessage}
                  onChange={(event) => setOwnerMessage(event.target.value)}
                  placeholder="Escribe un mensaje…"
                />
                <Button type="submit">Enviar</Button>
              </form>
            </div>
          </section>
        )}

        {view === "invoices" && (
          <section className="owner-section">
            <header className="owner-page-heading">
              <div>
                <Title level={1}>Facturas y recibos</Title>
                <p>Comparte documentos y controla su estado.</p>
              </div>
              <Button>Enviar nueva factura</Button>
            </header>
            <div className="invoice-table">
              {[
                ["Alquiler · Octubre", "1.280 €", "Pagada", "05 oct 2026"],
                [
                  "Electricidad · Septiembre",
                  "86,40 €",
                  "Pendiente",
                  "02 oct 2026",
                ],
                ["Agua · Tercer trimestre", "42,15 €", "Pagada", "28 sep 2026"],
              ].map(([concept, amount, status, date]) => (
                <article key={concept}>
                  <div>
                    <strong>{concept}</strong>
                    <small>{date}</small>
                  </div>
                  <strong>{amount}</strong>
                  <Tag tone={status === "Pagada" ? "success" : "warning"}>
                    {status}
                  </Tag>
                  <button>Descargar</button>
                </article>
              ))}
            </div>
          </section>
        )}

        {view === "issues" && (
          <section className="owner-section">
            <header className="owner-page-heading">
              <div>
                <Title level={1}>Incidencias</Title>
                <p>Seguimiento de reparaciones y avisos del inmueble.</p>
              </div>
            </header>
            <div className="issue-board">
              {[
                [
                  "Abierta",
                  "La persiana del salón no baja",
                  "Prioridad media",
                  "Reportada por Lucía",
                ],
                [
                  "En curso",
                  "Revisión anual de la caldera",
                  "Mantenimiento",
                  "Técnico: 22 octubre",
                ],
                [
                  "Resuelta",
                  "Cambio de bombín del portal",
                  "Completada",
                  "15 octubre",
                ],
              ].map(([status, title, priority, meta]) => (
                <article className="owner-card" key={title}>
                  <Tag
                    tone={
                      status === "Resuelta"
                        ? "success"
                        : status === "Abierta"
                          ? "danger"
                          : "warning"
                    }
                  >
                    {status}
                  </Tag>
                  <Title level={3}>{title}</Title>
                  <p>{priority}</p>
                  <small>{meta}</small>
                  <Button variant="secondary">Ver incidencia</Button>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

function KolivinRegistration({
  onLogin,
  onLogout,
  initialRole = "student",
  startInDashboard = false,
}: {
  onLogin?: () => void
  onLogout?: () => void
  initialRole?: "student" | "owner"
  startInDashboard?: boolean
}) {
  const [profileType, setProfileType] = useState<"student" | "owner">(
    initialRole,
  )
  const [stage, setStage] =
    useState<"registration" | "student-verification" | "loading" | "legal" | "identity" | "complete" | "dashboard">(
      startInDashboard ? "dashboard" : "registration",
    )
  const [institutionMethod, setInstitutionMethod] =
    useState<"email" | "enrollment">("email")
  const [enrollmentFile, setEnrollmentFile] = useState("")
  const [payrollFile, setPayrollFile] = useState("")
  const [guarantorIdFile, setGuarantorIdFile] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [cameraState, setCameraState] =
    useState<"idle" | "requesting" | "active" | "error" | "captured">("idle")
  const [selfie, setSelfie] = useState("")
  const [showPreferences, setShowPreferences] = useState(!startInDashboard)
  const [dashboardView, setDashboardView] =
    useState<"home" | "manage" | "chat">("home")
  const [carouselIndex, setCarouselIndex] = useState(0)
  const [chatDraft, setChatDraft] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      author: "Lucía",
      initials: "LM",
      text: "He guardado el piso de Teatinos que está junto al metro.",
      time: "10:24",
      own: false,
    },
    {
      author: "Marcos",
      initials: "MG",
      text: "A mí también me encaja. Está cerca de la Escuela de Ingenierías Industriales.",
      time: "10:31",
      own: false,
    },
    {
      author: "Tú",
      initials: "TÚ",
      text: "Perfecto. Podemos pedir una visita para el jueves.",
      time: "10:36",
      own: true,
    },
  ])
  const [preferredZones, setPreferredZones] = useState<string[]>([])
  const [habits, setHabits] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const cameraStream = useRef<MediaStream | null>(null)
  const passwordsMatch =
    repeatPassword.length === 0 || password === repeatPassword

  useEffect(() => {
    if (stage !== "loading" && stage !== "complete") return
    const nextStage = stage === "loading" ? "identity" : "dashboard"
    const redirect = window.setTimeout(() => setStage(nextStage), 1400)
    return () => window.clearTimeout(redirect)
  }, [stage])

  useEffect(() => {
    if (stage === "identity") return
    cameraStream.current?.getTracks().forEach((track) => track.stop())
    cameraStream.current = null
  }, [stage])

  useEffect(
    () => () => {
      cameraStream.current?.getTracks().forEach((track) => track.stop())
    },
    [],
  )

  async function startCamera() {
    setCameraState("requesting")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: false,
      })
      cameraStream.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
      }
      setCameraState("active")
    } catch {
      setCameraState("error")
    }
  }

  function captureSelfie() {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement("canvas")
    canvas.width = video.videoWidth || 640
    canvas.height = video.videoHeight || 480
    canvas.getContext("2d")?.drawImage(video, 0, 0)
    setSelfie(canvas.toDataURL("image/jpeg", 0.8))
    cameraStream.current?.getTracks().forEach((track) => track.stop())
    cameraStream.current = null
    setCameraState("captured")
  }

  function retrySelfie() {
    setSelfie("")
    setCameraState("idle")
  }

  function togglePreference(
    value: string,
    values: string[],
    setValues: (next: string[]) => void,
  ) {
    setValues(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value],
    )
  }

  if (stage === "dashboard" && profileType === "owner") {
    return <OwnerDashboard onLogout={onLogout} returning={startInDashboard} />
  }

  if (stage === "dashboard") {
    const featuredRoom = malagaRooms[carouselIndex]

    return (
      <div className="student-dashboard">
        {showPreferences && (
          <div className="preferences-overlay" role="presentation">
            <section
              className="preferences-modal"
              role="dialog"
              aria-modal="true"
              aria-describedby="preferences-description"
            >
              <div className="preferences-modal__intro">
                <span className="preferences-icon">
                  <img src={`${A}/03905.svg`} alt="" />
                </span>
                <div>
                  <span className="registration-kicker">
                    PERSONALIZA TU EXPERIENCIA
                  </span>
                  <Title level={2}>Cuéntanos cómo te gusta vivir.</Title>
                  <p id="preferences-description">
                    Usaremos tus respuestas para mostrarte estudiantes afines
                    con los que formar un grupo y buscar piso en Málaga.
                  </p>
                </div>
              </div>

              <div className="preference-block">
                <strong>¿Qué hábitos te representan?</strong>
                <small>Puedes seleccionar varias opciones.</small>
                <div className="preference-chips">
                  {[
                    "Tranquilidad",
                    "Social",
                    "Madrugador",
                    "Nocturno",
                    "Estudio",
                  ].map((habit) => (
                    <button
                      type="button"
                      className={habits.includes(habit) ? "active" : ""}
                      aria-pressed={habits.includes(habit)}
                      key={habit}
                      onClick={() => togglePreference(habit, habits, setHabits)}
                    >
                      {habit}
                    </button>
                  ))}
                </div>
              </div>

              <div className="preference-block">
                <strong>¿Qué te interesa?</strong>
                <small>Esto nos ayuda a encontrar comunidades afines.</small>
                <div className="preference-chips">
                  {[
                    "Deporte",
                    "Idiomas",
                    "Cultura",
                    "Playa",
                    "Tecnología",
                    "Arte",
                    "Café",
                    "Emprendimiento",
                  ].map((interest) => (
                    <button
                      type="button"
                      className={interests.includes(interest) ? "active" : ""}
                      aria-pressed={interests.includes(interest)}
                      key={interest}
                      onClick={() =>
                        togglePreference(interest, interests, setInterests)
                      }
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <div className="preference-block">
                <strong>¿En qué zonas de Málaga te mueves?</strong>
                <small>
                  Por ahora, los grupos están disponibles en Málaga.
                </small>
                <div className="preference-chips">
                  {["Teatinos", "Centro", "El Palo", "Huelin"].map((zone) => (
                    <button
                      type="button"
                      className={preferredZones.includes(zone) ? "active" : ""}
                      aria-pressed={preferredZones.includes(zone)}
                      key={zone}
                      onClick={() =>
                        togglePreference(
                          zone,
                          preferredZones,
                          setPreferredZones,
                        )
                      }
                    >
                      {zone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="preferences-actions">
                <Button
                  variant="ghost"
                  onClick={() => setShowPreferences(false)}
                >
                  Ahora no
                </Button>
                <Button onClick={() => setShowPreferences(false)}>
                  Ver mis grupos <span>→</span>
                </Button>
              </div>
              <small className="preferences-note">
                Podrás cambiar estas preferencias desde tu panel cuando quieras.
              </small>
            </section>
          </div>
        )}

        <KolivinNav
          activeView={dashboardView}
          onLogout={onLogout}
          onHome={() => setDashboardView("home")}
          onGroup={() => setDashboardView("manage")}
          onChat={() => setDashboardView("chat")}
          onFlats={() => setDashboardView("home")}
        />

        <main className="dashboard-main">
          {dashboardView === "home" ? (
            <>
              <section className="dashboard-hero">
                <article className="property-carousel">
                  <div className="property-carousel__image">
                    <img
                      src={`${A}/${featuredRoom.image}`}
                      alt={featuredRoom.title}
                    />
                    <div className="property-carousel__top">
                      <Tag>{featuredRoom.place}</Tag>
                      <span>
                        {carouselIndex + 1} / {malagaRooms.length}
                      </span>
                    </div>
                    <div className="property-carousel__controls">
                      <button
                        aria-label="Piso anterior"
                        onClick={() =>
                          setCarouselIndex(
                            (carouselIndex - 1 + malagaRooms.length) %
                              malagaRooms.length,
                          )
                        }
                      >
                        ←
                      </button>
                      <button
                        aria-label="Piso siguiente"
                        onClick={() =>
                          setCarouselIndex(
                            (carouselIndex + 1) % malagaRooms.length,
                          )
                        }
                      >
                        →
                      </button>
                    </div>
                  </div>
                  <div className="property-carousel__body">
                    <div>
                      <span className="registration-kicker">
                        PISOS DESTACADOS EN MÁLAGA
                      </span>
                      <Title level={1}>{featuredRoom.title}</Title>
                      <p>{featuredRoom.meta}</p>
                    </div>
                    <div className="property-carousel__price">
                      <strong>{featuredRoom.price}</strong>
                      <small>/ mes · piso completo</small>
                      <Button>
                        Ver el piso <span>→</span>
                      </Button>
                    </div>
                  </div>
                  <div className="carousel-dots" aria-label="Seleccionar piso">
                    {malagaRooms.map((room, index) => (
                      <button
                        className={index === carouselIndex ? "active" : ""}
                        aria-label={`Ver ${room.title}`}
                        key={room.title}
                        onClick={() => setCarouselIndex(index)}
                      />
                    ))}
                  </div>
                </article>

                <aside className="my-group-panel">
                  <div className="my-group-panel__heading">
                    <div>
                      <span className="registration-kicker">TU GRUPO</span>
                      <Title>Grupo tranquilo por Teatinos</Title>
                    </div>
                    <Tag>4/4</Tag>
                  </div>
                  <p>
                    Ya sois cuatro estudiantes. Ahora podéis comparar pisos y
                    decidir juntos.
                  </p>
                  <div className="group-members">
                    {[
                      ["LM", "Lucía", "Escuela de Arquitectura"],
                      ["MG", "Marcos", "Escuela de Ingenierías Industriales"],
                      ["SA", "Sara", "Facultad de Ciencias"],
                      ["TÚ", "Tú", "Facultad de Bellas Artes"],
                    ].map(([initials, name, degree]) => (
                      <div key={name}>
                        <span>{initials}</span>
                        <p>
                          <strong>{name}</strong>
                          <small>{degree}</small>
                        </p>
                        <i>✓</i>
                      </div>
                    ))}
                  </div>
                  <div className="group-compatibility">
                    <div className="split">
                      <span>Compatibilidad del grupo</span>
                      <strong>92 %</strong>
                    </div>
                    <div>
                      <span />
                    </div>
                    <small>Tranquilidad · Estudio · Teatinos</small>
                  </div>
                  <Button onClick={() => setDashboardView("chat")}>
                    Ir al chat del grupo <span>→</span>
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => setDashboardView("manage")}
                  >
                    Gestionar grupo
                  </Button>
                </aside>
              </section>
            </>
          ) : dashboardView === "manage" ? (
            <section className="group-management">
              <header className="workspace-heading">
                <button onClick={() => setDashboardView("home")}>
                  ← Volver al panel
                </button>
                <div>
                  <span className="registration-kicker">GESTIÓN DEL GRUPO</span>
                  <Title level={1}>Grupo tranquilo por Teatinos</Title>
                  <p>
                    Organiza el grupo y acordad juntos cómo será vuestra
                    convivencia.
                  </p>
                </div>
                <Tag>Grupo completo · 4/4</Tag>
              </header>

              <div className="management-grid">
                <div className="management-main">
                  <section className="dashboard-card group-overview">
                    <div className="dashboard-card__heading">
                      <Title>Preferencias compartidas</Title>
                      <Button variant="secondary">Editar preferencias</Button>
                    </div>
                    <div className="group-facts">
                      <div>
                        <small>Zona preferida</small>
                        <strong>Teatinos</strong>
                      </div>
                      <div>
                        <small>Transporte</small>
                        <strong>Metro Ciudad de la Justicia</strong>
                      </div>
                      <div>
                        <small>Entrada prevista</small>
                        <strong>Septiembre 2026</strong>
                      </div>
                      <div>
                        <small>Presupuesto total</small>
                        <strong>1.200–1.400 €</strong>
                      </div>
                    </div>
                    <div className="group-tags management-tags">
                      {[
                        "Tranquilidad",
                        "Estudio",
                        "Orden",
                        "No fumadores",
                        "Gastos incluidos",
                      ].map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </section>

                  <section className="dashboard-card members-management">
                    <div className="dashboard-card__heading">
                      <div>
                        <Title>Miembros del grupo</Title>
                        <p>Todos los perfiles están verificados.</p>
                      </div>
                      <small>4 de 4 plazas</small>
                    </div>
                    {[
                      [
                        "LM",
                        "Lucía Martín",
                        "Escuela Técnica Superior de Arquitectura",
                        "Creadora del grupo",
                      ],
                      [
                        "MG",
                        "Marcos García",
                        "Escuela de Ingenierías Industriales",
                        "Miembro",
                      ],
                      ["SA", "Sara Aguilar", "Facultad de Ciencias", "Miembro"],
                      [
                        "TÚ",
                        "Tu perfil",
                        "Facultad de Bellas Artes",
                        "Miembro",
                      ],
                    ].map(([initials, name, school, role]) => (
                      <article key={name}>
                        <span>{initials}</span>
                        <div>
                          <strong>{name}</strong>
                          <small>{school}</small>
                        </div>
                        <Tag>{role}</Tag>
                        <button>Ver perfil</button>
                      </article>
                    ))}
                  </section>
                </div>

                <aside className="management-side">
                  <section className="dashboard-card">
                    <Title level={3}>Próximos pasos</Title>
                    <ol>
                      <li className="done">
                        <span>✓</span>
                        <div>
                          <strong>Completar el grupo</strong>
                          <small>4 estudiantes verificados</small>
                        </div>
                      </li>
                      <li className="active">
                        <span>2</span>
                        <div>
                          <strong>Comparar pisos</strong>
                          <small>Tenéis 3 pisos guardados</small>
                        </div>
                      </li>
                      <li>
                        <span>3</span>
                        <div>
                          <strong>Solicitar una visita</strong>
                          <small>Elegid fecha entre todos</small>
                        </div>
                      </li>
                    </ol>
                    <Button>
                      Ver pisos guardados <span>→</span>
                    </Button>
                  </section>
                  <section className="dashboard-card group-settings">
                    <Title level={3}>Configuración</Title>
                    <button>
                      Notificaciones del grupo <span>Activadas</span>
                    </button>
                    <button>
                      Visibilidad del grupo <span>Privado</span>
                    </button>
                    <button className="danger-link">Abandonar el grupo</button>
                  </section>
                </aside>
              </div>
            </section>
          ) : (
            <section className="group-chat">
              <header className="workspace-heading chat-heading">
                <button onClick={() => setDashboardView("home")}>
                  ← Volver al panel
                </button>
                <div>
                  <span className="registration-kicker">CHAT DEL GRUPO</span>
                  <Title level={1}>Grupo tranquilo por Teatinos</Title>
                  <p>4 miembros · Todos los perfiles verificados</p>
                </div>
                <button
                  className="chat-manage"
                  onClick={() => setDashboardView("manage")}
                >
                  Gestionar grupo
                </button>
              </header>

              <div className="chat-layout">
                <section className="chat-window">
                  <div className="chat-day">
                    <span>Hoy</span>
                  </div>
                  <div className="chat-messages">
                    {chatMessages.map((message, index) => (
                      <article
                        className={message.own ? "own" : ""}
                        key={`${message.time}-${index}`}
                      >
                        {!message.own && <span>{message.initials}</span>}
                        <div>
                          {!message.own && <strong>{message.author}</strong>}
                          <p>{message.text}</p>
                          <small>{message.time}</small>
                        </div>
                      </article>
                    ))}
                  </div>
                  <form
                    className="chat-composer"
                    onSubmit={(event) => {
                      event.preventDefault()
                      const text = chatDraft.trim()
                      if (!text) return
                      setChatMessages([
                        ...chatMessages,
                        {
                          author: "Tú",
                          initials: "TÚ",
                          text,
                          time: "Ahora",
                          own: true,
                        },
                      ])
                      setChatDraft("")
                    }}
                  >
                    <button type="button" aria-label="Adjuntar archivo">
                      +
                    </button>
                    <input
                      value={chatDraft}
                      onChange={(event) => setChatDraft(event.target.value)}
                      placeholder="Escribe un mensaje al grupo…"
                    />
                    <Button type="submit">Enviar</Button>
                  </form>
                </section>

                <aside className="chat-sidebar">
                  <Title level={3}>Miembros</Title>
                  {[
                    ["LM", "Lucía", "Escuela de Arquitectura"],
                    ["MG", "Marcos", "Ingenierías Industriales"],
                    ["SA", "Sara", "Facultad de Ciencias"],
                    ["TÚ", "Tú", "Bellas Artes"],
                  ].map(([initials, name, school]) => (
                    <div key={name}>
                      <span>{initials}</span>
                      <p>
                        <strong>{name}</strong>
                        <small>{school}</small>
                      </p>
                      <i />
                    </div>
                  ))}
                  <div className="chat-shared">
                    <strong>Información compartida</strong>
                    <p>Teatinos · Cerca del metro</p>
                    <p>1.200–1.400 € al mes</p>
                    <p>Entrada en septiembre</p>
                  </div>
                </aside>
              </div>
            </section>
          )}
        </main>
      </div>
    )
  }

  return (
    <div className="kolivin-page">
      <KolivinNav registration onLogin={onLogin} />

      <div className="registration-layout">
        <section className="registration-copy">
          <span className="registration-kicker">EMPIEZA TU EXPERIENCIA</span>
          <Title level={1}>
            {stage === "student-verification"
              ? "Verifica que eres estudiante."
              : stage === "loading"
                ? "Conectando con el verificador."
                : stage === "legal"
                  ? "Completa tu información legal."
                  : stage === "identity"
                    ? "Confirma que eres tú."
                    : stage === "complete"
                      ? "Todo listo para empezar."
                      : "Crea tu cuenta en Kolivin."}
          </Title>
          <p>
            {stage === "student-verification"
              ? "Puedes verificar que eres estudiante mediante el correo institucional de tu centro o tu matrícula."
              : stage === "loading"
                ? "Te estamos redirigiendo de forma segura al verificador de identidad."
                : stage === "legal"
                  ? "Necesitamos algunos datos adicionales para preparar el futuro contrato de arrendamiento."
                  : stage === "identity"
                    ? "Hazte un selfie sosteniendo tu DNI para que el proveedor pueda verificar tu identidad."
                    : "Completa tus datos para encontrar un espacio donde vivir y compartir una nueva etapa."}
          </p>
          <div className="registration-points">
            <div>
              <span>1</span>
              <p>
                <strong>Tu perfil, a tu manera</strong>
                <small>Información clara y siempre bajo tu control.</small>
              </p>
            </div>
            <div>
              <span>2</span>
              <p>
                <strong>Encuentra tu próximo hogar</strong>
                <small>Compara habitaciones y elige con tranquilidad.</small>
              </p>
            </div>
            <div>
              <span>3</span>
              <p>
                <strong>Conecta con confianza</strong>
                <small>Conoce las condiciones antes de decidir.</small>
              </p>
            </div>
          </div>
        </section>

        <section className="registration-card">
          <div className="registration-card__intro">
            <Title>
              {stage === "student-verification"
                ? "Verificación de estudiante"
                : stage === "loading"
                  ? "Conectando con el verificador"
                  : stage === "legal"
                    ? "Información legal y avalista"
                    : stage === "identity"
                      ? "Verificación externa de identidad"
                      : stage === "complete"
                        ? "Registro completado"
                        : "Información de registro"}
            </Title>
            <p>
              {stage === "student-verification"
                ? "Elige la opción que te resulte más cómoda."
                : stage === "loading"
                  ? "Se abrirá un entorno seguro para verificar tu identidad."
                  : stage === "legal"
                    ? "Completa lo que puedas ahora. Podrás editarlo más adelante."
                    : stage === "identity"
                      ? "Necesitarás tu DNI físico y una cámara disponible."
                      : stage === "complete"
                        ? "Tu cuenta de Kolivin ya está preparada."
                        : "Introduce tus datos personales para crear tu cuenta."}
            </p>
          </div>
          {stage === "complete" ? (
            <div className="registration-success">
              <img src={`${A}/01330.svg`} alt="" />
              <Title level={3}>Tus datos se han guardado</Title>
              <p>
                Tu perfil de{" "}
                {profileType === "student" ? "estudiante" : "propietario"} está
                listo para continuar.
              </p>
              <small>Redirigiendo a tu panel de estudiante…</small>
              <div className="loading-line">
                <span />
              </div>
            </div>
          ) : stage === "identity" ? (
            <div className="identity-verifier">
              <div className="external-badge">
                <span className="external-badge__mark">
                  <img src={`${A}/01330.svg`} alt="" />
                </span>
                <span>
                  <strong>Kolivin Identity</strong>
                  <small>PROVEEDOR EXTERNO · ENTORNO SEGURO</small>
                </span>
              </div>

              <div className="identity-instructions">
                <strong>Selfie con documento de identidad</strong>
                <p>
                  Sujeta tu DNI junto a tu cara, asegúrate de que ambos se vean
                  completos y mira directamente a la cámara.
                </p>
                <div>
                  <span>
                    <i>1</i>Busca un lugar bien iluminado
                  </span>
                  <span>
                    <i>2</i>Evita reflejos sobre el DNI
                  </span>
                  <span>
                    <i>3</i>No uses gafas de sol ni accesorios
                  </span>
                </div>
              </div>

              <div className={`camera-frame camera-frame--${cameraState}`}>
                {cameraState === "captured" && selfie ? (
                  <img
                    src={selfie}
                    alt="Selfie capturado con el documento de identidad"
                  />
                ) : (
                  <video ref={videoRef} playsInline muted />
                )}
                {(cameraState === "idle" || cameraState === "requesting") && (
                  <div className="camera-placeholder">
                    <span className="camera-icon" />
                    <strong>
                      {cameraState === "requesting"
                        ? "Solicitando acceso…"
                        : "La cámara está desactivada"}
                    </strong>
                    <small>Solo se activará después de que des permiso.</small>
                  </div>
                )}
                {cameraState === "error" && (
                  <div className="camera-placeholder camera-error">
                    <span>!</span>
                    <strong>No hemos podido acceder a la cámara</strong>
                    <small>
                      Revisa los permisos del navegador e inténtalo de nuevo.
                    </small>
                  </div>
                )}
                {cameraState === "active" && (
                  <div className="face-guide">
                    <span />
                  </div>
                )}
              </div>

              <div className="identity-actions">
                {cameraState === "idle" && (
                  <Button onClick={startCamera}>Activar cámara</Button>
                )}
                {cameraState === "requesting" && (
                  <Button disabled>Abriendo cámara…</Button>
                )}
                {cameraState === "active" && (
                  <Button onClick={captureSelfie}>Capturar selfie</Button>
                )}
                {cameraState === "error" && (
                  <Button onClick={startCamera}>Intentar de nuevo</Button>
                )}
                {cameraState === "captured" && (
                  <>
                    <Button variant="secondary" onClick={retrySelfie}>
                      Repetir foto
                    </Button>
                    <Button
                      onClick={() =>
                        setStage(
                          profileType === "student" ? "legal" : "complete",
                        )
                      }
                    >
                      Confirmar identidad <span>→</span>
                    </Button>
                  </>
                )}
              </div>
              {cameraState !== "captured" && (
                <Button
                  variant="ghost"
                  onClick={() =>
                    setStage(profileType === "student" ? "legal" : "complete")
                  }
                >
                  Continuar sin cámara · modo de prueba
                </Button>
              )}
              <small className="identity-privacy">
                La imagen se procesa localmente en esta demostración. La
                integración final deberá aplicar la política del proveedor de
                identidad seleccionado.
              </small>
            </div>
          ) : stage === "loading" ? (
            <div
              className="registration-loading"
              role="status"
              aria-live="polite"
            >
              <span className="registration-spinner" />
              <Title level={3}>Abriendo el verificador seguro</Title>
              <p>Te estamos redirigiendo al siguiente paso del registro.</p>
              <div className="loading-line">
                <span />
              </div>
            </div>
          ) : stage === "legal" ? (
            <form
              className="registration-form legal-form"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                setStage("complete")
              }}
            >
              <fieldset className="legal-section">
                <legend>Datos personales complementarios</legend>
                <p>
                  Información que utilizaremos para identificarte en el
                  contrato.
                </p>
                <div className="registration-name-grid">
                  <label className="field">
                    <span className="field__label">Fecha de nacimiento</span>
                    <input name="birth-date" type="date" />
                  </label>
                  <label className="field">
                    <span className="field__label">Teléfono móvil</span>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="+34 600 000 000"
                      autoComplete="tel"
                    />
                  </label>
                </div>
                <label className="field">
                  <span className="field__label">Nacionalidad</span>
                  <input
                    name="nationality"
                    placeholder="Ej. Española"
                    autoComplete="country-name"
                  />
                </label>
                <label className="field">
                  <span className="field__label">Domicilio actual</span>
                  <input
                    name="address"
                    placeholder="Calle, número, piso y puerta"
                    autoComplete="street-address"
                  />
                </label>
                <div className="legal-address-grid">
                  <label className="field">
                    <span className="field__label">Código postal</span>
                    <input
                      name="postal-code"
                      placeholder="29001"
                      autoComplete="postal-code"
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Localidad</span>
                    <input
                      name="city"
                      placeholder="Málaga"
                      autoComplete="address-level2"
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Provincia</span>
                    <input
                      name="province"
                      placeholder="Málaga"
                      autoComplete="address-level1"
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="legal-section">
                <legend>Datos del avalista</legend>
                <p>
                  La persona que respaldará económicamente el contrato de
                  arrendamiento.
                </p>
                <div className="registration-name-grid">
                  <label className="field">
                    <span className="field__label">Nombre</span>
                    <input
                      name="guarantor-name"
                      placeholder="Nombre del avalista"
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Apellidos</span>
                    <input
                      name="guarantor-surname"
                      placeholder="Apellidos del avalista"
                    />
                  </label>
                </div>
                <div className="registration-name-grid">
                  <label className="field">
                    <span className="field__label">DNI, NIE o pasaporte</span>
                    <input
                      name="guarantor-id"
                      placeholder="Documento de identidad"
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Relación contigo</span>
                    <input
                      name="guarantor-relation"
                      placeholder="Ej. Madre, padre o tutor"
                    />
                  </label>
                </div>
                <label className="field">
                  <span className="field__label">Correo electrónico</span>
                  <input
                    name="guarantor-email"
                    type="email"
                    placeholder="avalista@ejemplo.com"
                  />
                </label>
                <label className="field">
                  <span className="field__label">Teléfono</span>
                  <input
                    name="guarantor-phone"
                    type="tel"
                    placeholder="+34 600 000 000"
                  />
                </label>
                <label className="field">
                  <span className="field__label">Domicilio del avalista</span>
                  <input
                    name="guarantor-address"
                    placeholder="Dirección completa"
                  />
                </label>
                <div className="registration-name-grid">
                  <label className="field">
                    <span className="field__label">Situación laboral</span>
                    <input
                      name="guarantor-employment"
                      placeholder="Ej. Contrato indefinido"
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Empresa</span>
                    <input
                      name="guarantor-company"
                      placeholder="Nombre de la empresa"
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset className="legal-section">
                <legend>Documentación del avalista</legend>
                <p>
                  Adjunta documentos legibles. Se utilizarán únicamente para
                  estudiar la garantía.
                </p>
                <label
                  className={`enrollment-upload ${
                    payrollFile ? "has-file" : ""
                  }`}
                >
                  <input
                    type="file"
                    name="guarantor-payroll"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) =>
                      setPayrollFile(event.target.files?.[0]?.name ?? "")
                    }
                  />
                  <img src={`${A}/2e394.svg`} alt="" />
                  <span>
                    <strong>
                      {payrollFile || "Última nómina del avalista"}
                    </strong>
                    <small>
                      {payrollFile
                        ? "Documento preparado para enviar"
                        : "PDF, JPG o PNG · Máximo 10 MB"}
                    </small>
                  </span>
                </label>
                <label
                  className={`enrollment-upload ${
                    guarantorIdFile ? "has-file" : ""
                  }`}
                >
                  <input
                    type="file"
                    name="guarantor-id-file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) =>
                      setGuarantorIdFile(event.target.files?.[0]?.name ?? "")
                    }
                  />
                  <img src={`${A}/2e394.svg`} alt="" />
                  <span>
                    <strong>
                      {guarantorIdFile || "Documento de identidad del avalista"}
                    </strong>
                    <small>
                      {guarantorIdFile
                        ? "Documento preparado para enviar"
                        : "Anverso y reverso en PDF, JPG o PNG"}
                    </small>
                  </span>
                </label>
              </fieldset>

              <fieldset className="legal-section">
                <legend>Datos para el contrato</legend>
                <p>
                  La vivienda, la renta y la fianza se añadirán cuando
                  selecciones una habitación.
                </p>
                <div className="registration-name-grid">
                  <label className="field">
                    <span className="field__label">
                      Fecha prevista de entrada
                    </span>
                    <input name="move-in-date" type="date" />
                  </label>
                  <label className="field">
                    <span className="field__label">Duración prevista</span>
                    <select name="duration" defaultValue="">
                      <option value="" disabled>
                        Selecciona una duración
                      </option>
                      <option>Curso académico</option>
                      <option>6 meses</option>
                      <option>12 meses</option>
                      <option>Otra duración</option>
                    </select>
                  </label>
                </div>
                <label className="field">
                  <span className="field__label">
                    IBAN para recibos y devoluciones
                  </span>
                  <input
                    name="iban"
                    placeholder="ES00 0000 0000 0000 0000 0000"
                    inputMode="text"
                  />
                  <small>
                    Se confirmará antes de realizar cualquier cargo.
                  </small>
                </label>
                <div className="registration-name-grid">
                  <label className="field">
                    <span className="field__label">Contacto de emergencia</span>
                    <input
                      name="emergency-name"
                      placeholder="Nombre y apellidos"
                    />
                  </label>
                  <label className="field">
                    <span className="field__label">Teléfono de emergencia</span>
                    <input
                      name="emergency-phone"
                      type="tel"
                      placeholder="+34 600 000 000"
                    />
                  </label>
                </div>
              </fieldset>

              <label className="registration-consent">
                <input type="checkbox" />
                <span>
                  Declaro que los datos facilitados son correctos y autorizo su
                  uso para preparar el borrador del contrato.
                </span>
              </label>
              <div className="verification-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStage("identity")}
                >
                  ← Volver
                </Button>
                <Button>
                  Guardar información legal <span>→</span>
                </Button>
              </div>
              <small className="registration-security">
                Podrás revisar todos los datos antes de firmar cualquier
                contrato.
              </small>
            </form>
          ) : stage === "student-verification" ? (
            <form
              className="registration-form"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                setStage("loading")
              }}
            >
              <fieldset className="profile-type verification-method">
                <legend>¿Tienes correo electrónico institucional?</legend>
                <div>
                  <label
                    className={institutionMethod === "email" ? "active" : ""}
                  >
                    <input
                      type="radio"
                      name="institution-method"
                      value="email"
                      checked={institutionMethod === "email"}
                      onChange={() => setInstitutionMethod("email")}
                    />
                    <span className="profile-type__icon" aria-hidden="true">
                      @
                    </span>
                    <span>
                      <strong>Sí, tengo correo institucional</strong>
                      <small>
                        Verificaré mi cuenta con el correo institucional.
                      </small>
                    </span>
                  </label>
                  <label
                    className={
                      institutionMethod === "enrollment" ? "active" : ""
                    }
                  >
                    <input
                      type="radio"
                      name="institution-method"
                      value="enrollment"
                      checked={institutionMethod === "enrollment"}
                      onChange={() => setInstitutionMethod("enrollment")}
                    />
                    <span className="profile-type__icon" aria-hidden="true">
                      M
                    </span>
                    <span>
                      <strong>No tengo correo institucional</strong>
                      <small>Adjuntaré un justificante de matrícula.</small>
                    </span>
                  </label>
                </div>
              </fieldset>

              {institutionMethod === "email" ? (
                <label className="field">
                  <span className="field__label">
                    Correo electrónico de tu centro
                  </span>
                  <input
                    name="institution-email"
                    type="email"
                    placeholder="nombre@universidad.es"
                    autoComplete="email"
                    required
                  />
                  <small>
                    Te enviaremos un enlace para verificar este correo.
                  </small>
                </label>
              ) : (
                <label
                  className={`enrollment-upload ${
                    enrollmentFile ? "has-file" : ""
                  }`}
                >
                  <input
                    type="file"
                    name="enrollment"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(event) =>
                      setEnrollmentFile(event.target.files?.[0]?.name ?? "")
                    }
                    required
                  />
                  <img src={`${A}/2e394.svg`} alt="" />
                  <span>
                    <strong>{enrollmentFile || "Adjunta tu matrícula"}</strong>
                    <small>
                      {enrollmentFile
                        ? "Documento preparado para enviar"
                        : "PDF, JPG o PNG · Máximo 10 MB"}
                    </small>
                  </span>
                </label>
              )}

              <div className="verification-actions">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setStage("registration")}
                >
                  ← Volver
                </Button>
                <Button>
                  {institutionMethod === "email"
                    ? "Verificar correo"
                    : "Enviar matrícula"}{" "}
                  <span>→</span>
                </Button>
              </div>
              <small className="registration-security">
                Utilizaremos esta información únicamente para verificar tu
                condición de estudiante.
              </small>
            </form>
          ) : (
            <form
              className="registration-form"
              noValidate
              onSubmit={(event) => {
                event.preventDefault()
                setStage(
                  profileType === "student"
                    ? "student-verification"
                    : "identity",
                )
              }}
            >
              <fieldset className="profile-type">
                <legend>¿Cómo vas a utilizar Kolivin?</legend>
                <div>
                  <label className={profileType === "student" ? "active" : ""}>
                    <input
                      type="radio"
                      name="profile-type"
                      value="student"
                      checked={profileType === "student"}
                      onChange={() => setProfileType("student")}
                    />
                    <span className="profile-type__icon" aria-hidden="true">
                      E
                    </span>
                    <span>
                      <strong>Estudiante</strong>
                      <small>Busco una habitación donde vivir.</small>
                    </span>
                  </label>
                  <label className={profileType === "owner" ? "active" : ""}>
                    <input
                      type="radio"
                      name="profile-type"
                      value="owner"
                      checked={profileType === "owner"}
                      onChange={() => setProfileType("owner")}
                    />
                    <span className="profile-type__icon" aria-hidden="true">
                      P
                    </span>
                    <span>
                      <strong>Propietario</strong>
                      <small>Quiero publicar una habitación.</small>
                    </span>
                  </label>
                </div>
              </fieldset>
              <div className="registration-name-grid">
                <label className="field">
                  <span className="field__label">Nombre</span>
                  <input
                    name="name"
                    placeholder="Tu nombre"
                    autoComplete="given-name"
                    required
                  />
                </label>
                <label className="field">
                  <span className="field__label">Apellidos</span>
                  <input
                    name="surname"
                    placeholder="Tus apellidos"
                    autoComplete="family-name"
                    required
                  />
                </label>
              </div>
              <label className="field">
                <span className="field__label">DNI</span>
                <input
                  name="dni"
                  placeholder="12345678A"
                  pattern="[0-9]{8}[A-Za-z]"
                  maxLength={9}
                  required
                />
                <small>8 números y una letra, sin espacios.</small>
              </label>
              <label className="field">
                <span className="field__label">
                  Correo electrónico personal
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="nombre@ejemplo.com"
                  autoComplete="email"
                  required
                />
                <small>Lo utilizaremos para acceder a tu cuenta.</small>
              </label>
              <label className="field">
                <span className="field__label">Contraseña</span>
                <input
                  name="password"
                  type="password"
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </label>
              <label className="field">
                <span className="field__label">Repetir contraseña</span>
                <input
                  name="repeat-password"
                  type="password"
                  placeholder="Vuelve a escribir tu contraseña"
                  autoComplete="new-password"
                  minLength={8}
                  value={repeatPassword}
                  onChange={(event) => setRepeatPassword(event.target.value)}
                  aria-invalid={!passwordsMatch}
                  required
                />
                {!passwordsMatch && (
                  <small className="field__error">
                    Las contraseñas no coinciden.
                  </small>
                )}
              </label>
              <label className="registration-consent">
                <input type="checkbox" required />
                <span>
                  Acepto la política de privacidad y las condiciones de uso.
                </span>
              </label>
              <Button>
                Crear cuenta y continuar <span>→</span>
              </Button>
              <small className="registration-security">
                Tus datos se transmitirán de forma segura.
              </small>
            </form>
          )}
        </section>
      </div>
    </div>
  )
}

function Foundations() {
  const colors = [
    ["Bosque / acción", "#28634D", "Botones, enlaces, selección"],
    ["Tinta / contenido", "#202725", "Títulos y texto principal"],
    ["Piedra / secundario", "#646C68", "Ayuda y metadatos"],
    ["Salvia / apoyo", "#EAF1E9", "Etiquetas y confirmaciones"],
    ["Lino / fondo", "#F7F8F4", "Fondos de página"],
    ["Blanco / superficie", "#FFFFFF", "Tarjetas y formularios"],
  ]
  const principles = [
    [
      "Cercanía sin ruido",
      "Mensajes directos, fotografía cotidiana y espacio para respirar.",
    ],
    [
      "Claridad antes que promesas",
      "Precio mensual, gastos, fecha y condiciones siempre a la vista.",
    ],
    [
      "Verde con intención",
      "Un solo acento para acciones, foco y selección; nunca solo para comunicar un estado.",
    ],
  ]
  return (
    <>
      <PageIntro
        eyebrow="SAVIA / KIT WEB"
        title="01 — Lo esencial, bien cuidado."
        description="Una base cálida, clara y serena para encontrar habitación y compartir una nueva etapa. Reglas visuales para dar continuidad a la navegación de referencia."
      />
      <div className="identity-grid">
        <Panel className="brand-card">
          <div className="brand-lockup">
            <img src={`${A}/f8883.png`} alt="" />
            <strong>Savia</strong>
          </div>
          <Title level={3}>Compartir piso, encontrar tu sitio.</Title>
          <p>
            Símbolo y lenguaje cercano para conservar una experiencia humana y
            clara.
          </p>
        </Panel>
        <div className="principles">
          {principles.map(([name, copy]) => (
            <div key={name}>
              <strong>{name}</strong>
              <p>{copy}</p>
            </div>
          ))}
        </div>
      </div>
      <section className="open-section">
        <Title>Color con propósito</Title>
        <div className="swatches">
          {colors.map(([name, value, use]) => (
            <article className="swatch" key={name}>
              <div
                className="swatch__color"
                style={{ backgroundColor: value }}
              />
              <strong>{name}</strong>
              <code>{value}</code>
              <small>{use}</small>
            </article>
          ))}
        </div>
      </section>
      <div className="type-layout">
        <Panel className="type-card">
          <div className="type-title">
            <Title>Inter</Title>
            <small>Regular 400 · Medium 500 · Semibold 600</small>
          </div>
          <small>Display · 64 / 70 · −2 px</small>
          <p className="display">Tu nueva etapa.</p>
          <small>H1 · 48 / 56 · −1,5 px</small>
          <p className="h1-sample">Un lugar para ti.</p>
          <small>H2 · 36 / 43 · −1 px</small>
          <p className="h2-sample">Vivir mejor, juntos.</p>
          <small>H3 · 24 / 31</small>
          <p className="h3-sample">Mucho más que una habitación.</p>
          <small>Cuerpo · 16 / 26</small>
          <p>Encuentra un espacio que encaje con tu forma de vivir.</p>
        </Panel>
        <section className="rhythm">
          <Title>Un ritmo de 8, con matices</Title>
          {[4, 8, 16, 24, 32, 48, 80].map((space) => (
            <div className="space-row" key={space}>
              <small>{space} px</small>
              <span style={{ width: space * 3 }} />
            </div>
          ))}
          <p>Desktop 1440 · Contenido 1280 · Margen 80</p>
          <p>Móvil 390 · Contenido 342 · Margen 24</p>
          <div className="radius-row">
            {[8, 16, 24].map((radius) => (
              <div key={radius}>
                <span style={{ borderRadius: radius }} />
                <small>{radius} px</small>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Panel title="Estados que también se leen">
        <div className="states-grid">
          <div>
            <strong>Confirmación</strong>
            <Tag>Solicitud enviada</Tag>
            <small>#28634D / #EAF1E9</small>
          </div>
          <div>
            <strong>Atención</strong>
            <Tag tone="warning">Revisa las condiciones</Tag>
            <small>#8A6628 / #FAF2DF</small>
          </div>
          <div>
            <strong>Error</strong>
            <Tag tone="danger">Introduce un email válido</Tag>
            <small>#A74537 / #FBEEEA</small>
          </div>
          <div>
            <strong>Neutral</strong>
            <Tag tone="neutral">Borrador guardado</Tag>
            <small>#646C68 / #F7F8F4</small>
          </div>
        </div>
      </Panel>
    </>
  )
}

function Components() {
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(true)
  const [radio, setRadio] = useState("student")
  const [budget, setBudget] = useState(510)
  const runLoading = () => {
    setLoading(true)
    window.setTimeout(() => setLoading(false), 1100)
  }
  return (
    <>
      <PageIntro
        eyebrow="SAVIA / KIT WEB"
        title="02 — Pequeñas piezas. Una sola voz."
        description="Controles y estados para descubrir habitaciones, comparar opciones y dar el siguiente paso. Muestras editables y listas para convertirse en componentes de Next.js."
      />
      <Panel title="Acciones" note="48 px de alto · Radio 8 · Etiqueta 14/600">
        <div className="button-showcase">
          <div>
            <small>Primario · Reposo</small>
            <Button>
              Buscar habitaciones <span>→</span>
            </Button>
          </div>
          <div>
            <small>Secundario · Reposo</small>
            <Button variant="secondary">Ver detalles</Button>
          </div>
          <div>
            <small>Discreto</small>
            <Button variant="ghost">Limpiar filtros</Button>
          </div>
          <div>
            <small>Deshabilitado</small>
            <Button disabled>Continuar</Button>
          </div>
          <div>
            <small>En progreso</small>
            <Button onClick={runLoading}>
              {loading ? "Enviando…  ◌" : "Solicitar visita"}
            </Button>
          </div>
          <div className="links">
            <button>Ver todas las habitaciones →</button>
            <button disabled>No disponible</button>
          </div>
        </div>
      </Panel>
      <Panel
        title="Entradas y selectores"
        note="Etiqueta siempre visible · Ayuda debajo"
      >
        <div className="fields-grid">
          <Field
            label="Nombre"
            value="Tu nombre"
            help="Así te verán tus compañeros."
          />
          <Field
            label="Correo electrónico"
            value="lucia@ejemplo.es"
            help="Foco visible"
          />
          <Field
            label="Correo electrónico"
            value="lucia@"
            error="Introduce un email válido."
          />
          <Field
            label="Código de invitación"
            value="No disponible"
            disabled
            help="Campo deshabilitado"
          />
          <SelectField label="Ciudad">Madrid</SelectField>
          <Field
            label="Fecha de entrada"
            value="01 / 09 / 2026"
            type="text"
            icon="b0ec0.svg"
          />
          <Field label="Contraseña" value="contraseña" type="password" />
          <SelectField label="Precio máximo">600 € / mes</SelectField>
          <label className="field field--wide">
            <span className="field__label">Sobre ti</span>
            <textarea defaultValue="Estudio Arquitectura. Me gusta cocinar con música y cuidar los espacios que compartimos." />
            <small>Cuéntanos algo de tu día a día.</small>
          </label>
        </div>
      </Panel>
      <Panel
        title="Encontrar, sin complicarse"
        note="Búsqueda compuesta + filtros activos"
      >
        <div className="search-grid">
          <Field label="¿Dónde quieres vivir?" value="Madrid" />
          <Field label="¿Cuándo te mudas?" value="Septiembre 2026" />
          <Button>Buscar habitaciones⌕</Button>
        </div>
        <div className="filter-row">
          <Button variant="secondary">Todos los filtros</Button>
          <Tag>Madrid ×</Tag>
          <Tag>Hasta 600 € ×</Tag>
          <Tag>Gastos incluidos ×</Tag>
          <Button variant="ghost">Limpiar todo</Button>
        </div>
      </Panel>
      <div className="two-up">
        <Panel title="Elegir" note="Control 20 × 20">
          <div className="choices">
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />{" "}
              Gastos incluidos
            </label>
            <label>
              <input
                type="radio"
                checked={radio === "student"}
                onChange={() => setRadio("student")}
              />{" "}
              Soy estudiante
            </label>
            <label>
              <input type="checkbox" /> Baño privado
            </label>
            <label>
              <input
                type="radio"
                checked={radio === "owner"}
                onChange={() => setRadio("owner")}
              />{" "}
              Soy propietario
            </label>
            <label className="disabled">
              <input type="checkbox" disabled /> No disponible
            </label>
            <label className="disabled">
              <input type="radio" disabled /> No disponible
            </label>
          </div>
          <label className="range">
            <span>Presupuesto mensual</span>
            <input
              type="range"
              min="250"
              max="600"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
            <small>
              <span>250 €</span>
              <span>{budget} €</span>
            </small>
          </label>
        </Panel>
        <Panel title="Navegar" note="Activo + reposo">
          <div className="tabs">
            <button className="active">Habitación</button>
            <button>El piso</button>
            <button>Compañeros</button>
          </div>
          <div className="tag-row">
            <Tag>Disponible</Tag>
            <Tag tone="neutral">Estancia mínima 6 meses</Tag>
            <Tag tone="warning">Pendiente</Tag>
          </div>
          <div className="pagination">
            {["‹", "1", "2", "3", "…", "8", "›"].map((p) => (
              <button className={p === "1" ? "active" : ""} key={p}>
                {p}
              </button>
            ))}
          </div>
          <small>Mostrando 1–6 de 24 ejemplos</small>
        </Panel>
      </div>
      <section className="open-section">
        <div className="section-heading">
          <Title>Acompañar el siguiente paso</Title>
          <small>Estado + mensaje + orientación</small>
        </div>
        <div className="alerts-grid">
          <Alert tone="success" title="Solicitud enviada">
            Puedes consultar su estado en tus solicitudes.
          </Alert>
          <Alert tone="warning" title="Revisa tu estancia">
            Esta habitación requiere un mínimo de 6 meses.
          </Alert>
          <Alert tone="danger" title="No se ha podido enviar">
            Revisa tu conexión y vuelve a intentarlo.
          </Alert>
        </div>
      </section>
    </>
  )
}

const rooms = [
  {
    image: "8d43c.png",
    place: "Chamberí, Madrid",
    title: "Luz y calma en Chamberí",
    meta: "14 m² · 3 personas · Amueblada",
    price: "520 €",
  },
  {
    image: "08e8f.png",
    place: "Benimaclet, Valencia",
    title: "Tu rincón en Benimaclet",
    meta: "12 m² · 3 personas · Amueblada",
    price: "390 €",
  },
  {
    image: "ce774.png",
    place: "Gràcia, Barcelona",
    title: "Un balcón para desconectar",
    meta: "16 m² · 4 personas · Amueblada",
    price: "610 €",
  },
]

function RoomCard({ room }: { room: typeof rooms[number] }) {
  const [saved, setSaved] = useState(false)
  return (
    <article className="room-card">
      <div className="room-card__image">
        <img src={`${A}/${room.image}`} alt={room.title} />
        <Tag tone="neutral">Desde el 1 sep</Tag>
        <button
          className={saved ? "saved" : ""}
          aria-label="Guardar habitación"
          onClick={() => setSaved(!saved)}
        >
          <img src={`${A}/91895.svg`} alt="" />
        </button>
      </div>
      <div className="room-card__body">
        <small>{room.place}</small>
        <strong>{room.title}</strong>
        <small>{room.meta}</small>
        <div>
          <b>{room.price}</b>
          <small> / mes</small>
          <span>Gastos incluidos</span>
        </div>
      </div>
    </article>
  )
}

function Patterns() {
  const [sent, setSent] = useState(false)
  return (
    <>
      <PageIntro
        eyebrow="SAVIA / KIT WEB"
        title="03 — Del primer vistazo al primer hola."
        description="Patrones de producto con datos conectados: habitación, convivencia, publicación y solicitud. Todos los anuncios, personas y condiciones son ejemplos ficticios."
      />
      <section className="open-section">
        <Title>Habitaciones que cuentan lo importante</Title>
        <div className="rooms-grid">
          {rooms.map((room) => (
            <RoomCard room={room} key={room.title} />
          ))}
        </div>
      </section>
      <div className="three-up">
        <section>
          <Title>Conoce a tu compañero</Title>
          <Panel className="profile-card">
            <div className="profile">
              <img src={`${A}/94d4d.png`} alt="Lucía" />
              <div>
                <strong>Lucía, 23 años</strong>
                <small>Arquitectura · Madrid</small>
              </div>
            </div>
            <p>
              Me gusta cocinar con música, salir a caminar y cuidar los espacios
              que compartimos.
            </p>
            <div className="tag-row">
              <Tag>No fumadora</Tag>
              <Tag>Vida tranquila</Tag>
              <Tag>Ordenada</Tag>
            </div>
            <Button variant="secondary">Ver perfil</Button>
          </Panel>
        </section>
        <section>
          <Title>Da espacio a nuevas historias</Title>
          <Panel className="owner-card">
            <img src={`${A}/5bd00.svg`} alt="" />
            <Title level={3}>
              Tu habitación libre puede ser su próximo hogar.
            </Title>
            <p>
              Publica fotos, explica las condiciones y conoce a las personas
              interesadas antes de decidir.
            </p>
            <Button>
              Publicar habitación <img src={`${A}/562ff.svg`} alt="" />
            </Button>
          </Panel>
        </section>
        <section>
          <Title>Publicación en curso</Title>
          <Panel className="draft-card">
            <div className="split">
              <Tag tone="neutral">Borrador</Tag>
              <small>Paso 2 de 4</small>
            </div>
            <img
              className="draft-photo"
              src={`${A}/8d43c.png`}
              alt="Habitación luminosa"
            />
            <strong>Luz y calma en Chamberí</strong>
            <small>Faltan las condiciones y la revisión.</small>
            <Button variant="secondary">Continuar publicación</Button>
          </Panel>
        </section>
      </div>
      <div className="form-layout">
        <Panel className="listing-form">
          <div className="split">
            <strong className="eyebrow">PUBLICAR UNA HABITACIÓN</strong>
            <Tag tone="neutral">Paso 2 de 4</Tag>
          </div>
          <div className="steps">
            <span>1. El piso</span>
            <strong>2. La habitación</strong>
            <span>3. Condiciones</span>
            <span>4. Revisar</span>
          </div>
          <Title>Cuéntanos cómo es.</Title>
          <Field
            label="Título del anuncio"
            value="Luz y calma en Chamberí"
            help="Un título cercano, sin exageraciones. Máximo 60 caracteres."
          />
          <div className="two-fields">
            <Field label="Precio mensual" value="520 €" />
            <Field label="Superficie" value="14 m²" />
          </div>
          <div className="two-fields">
            <Field
              label="Disponible desde"
              value="01 / 09 / 2026"
              icon="b0ec0.svg"
            />
            <SelectField label="Estancia mínima">6 meses</SelectField>
          </div>
          <label className="checkline">
            <input type="checkbox" defaultChecked /> Los gastos están incluidos
            en el precio
          </label>
          <div className="photo-upload">
            <img src={`${A}/8d43c.png`} alt="Fotografía subida" />
            <button>
              <img src={`${A}/2e394.svg`} alt="" />
              <span>Añadir fotografías</span>
              <small>JPG o PNG · Hasta 10 MB</small>
            </button>
          </div>
          <div className="split">
            <Button variant="ghost">Guardar borrador</Button>
            <Button>
              Continuar <img src={`${A}/562ff.svg`} alt="" />
            </Button>
          </div>
        </Panel>
        <div className="request-column">
          <Panel title="Tu próxima etapa" className="request-card">
            <div className="room-summary">
              <img src={`${A}/8d43c.png`} alt="" />
              <div>
                <strong>Luz y calma en Chamberí</strong>
                <small>Chamberí, Madrid</small>
                <Tag>Solicitud de visita</Tag>
              </div>
            </div>
            {[
              ["Entrada", "1 sep 2026"],
              ["Estancia", "6 meses"],
              ["Alquiler mensual", "520 €"],
              ["Gastos", "Incluidos"],
              ["Fianza orientativa", "520 €"],
            ].map(([key, val]) => (
              <div className="split datum" key={key}>
                <span>{key}</span>
                <strong>{val}</strong>
              </div>
            ))}
            <Alert tone="success" title="Sin pago ahora">
              Enviar una solicitud no confirma una reserva ni implica un cobro.
            </Alert>
            <Button onClick={() => setSent(true)}>
              Enviar solicitud de visita
            </Button>
          </Panel>
          {sent && (
            <Alert tone="success" title="Solicitud enviada a Ana">
              Tu interés ya está registrado. El estado inicial es «Pendiente de
              respuesta».
            </Alert>
          )}
        </div>
      </div>
      <div className="empty-grid">
        {[
          [
            "4487b.svg",
            "Probemos con un poco más de margen.",
            "No hay habitaciones con estos filtros.",
            "Limpiar filtros",
          ],
          [
            "03905.svg",
            "Tu lista empieza con un flechazo.",
            "Guarda las habitaciones que te gusten.",
            "Explorar habitaciones",
          ],
          [
            "5bd00.svg",
            "Tu primera publicación empieza aquí.",
            "Prepara unas fotos y los datos de tu habitación.",
            "Crear anuncio",
          ],
        ].map(([icon, title, copy, action]) => (
          <Panel className="empty-state" key={title}>
            <img src={`${A}/${icon}`} alt="" />
            <Title level={3}>{title}</Title>
            <p>{copy}</p>
            <Button variant="secondary">{action}</Button>
          </Panel>
        ))}
      </div>
    </>
  )
}

function LoginPage({
  onAuthenticated,
  onRegister,
}: {
  onAuthenticated: (role: "student" | "owner") => void
  onRegister: () => void
}) {
  const [role, setRole] = useState<"student" | "owner">("student")

  return (
    <div className="login-page">
      <KolivinNav registration onRegister={onRegister} />
      <div className="login-layout">
        <section className="login-copy">
          <span className="registration-kicker">BIENVENIDO DE NUEVO</span>
          <Title level={1}>Vuelve a tu espacio en Kolivin.</Title>
          <p>
            Accede a tus grupos, inmuebles, solicitudes y conversaciones desde
            un único lugar.
          </p>
        </section>
        <section className="login-card">
          <Title>Iniciar sesión</Title>
          <p>Selecciona el tipo de cuenta con el que quieres acceder.</p>
          <div className="login-role">
            <button
              className={role === "student" ? "active" : ""}
              onClick={() => setRole("student")}
            >
              <span>ES</span>
              <div>
                <strong>Estudiante</strong>
                <small>Grupos, pisos y solicitudes</small>
              </div>
            </button>
            <button
              className={role === "owner" ? "active" : ""}
              onClick={() => setRole("owner")}
            >
              <span>PR</span>
              <div>
                <strong>Propietario</strong>
                <small>Inmuebles, facturas e incidencias</small>
              </div>
            </button>
          </div>
          <form
            onSubmit={(event) => {
              event.preventDefault()
              onAuthenticated(role)
            }}
          >
            <label className="field">
              <span className="field__label">Correo electrónico</span>
              <input type="email" placeholder="nombre@ejemplo.com" />
            </label>
            <label className="field">
              <span className="field__label">Contraseña</span>
              <input type="password" placeholder="Tu contraseña" />
            </label>
            <div className="login-options">
              <label>
                <input type="checkbox" /> Recordarme
              </label>
              <button type="button">He olvidado mi contraseña</button>
            </div>
            <Button>Iniciar sesión</Button>
          </form>
          <div className="login-divider">
            <span />
            <small>¿Aún no tienes cuenta?</small>
            <span />
          </div>
          <Button variant="secondary" onClick={onRegister}>
            Crear una cuenta
          </Button>
        </section>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<"register" | "login" | "app">("register")
  const [sessionRole, setSessionRole] = useState<"student" | "owner">("student")

  return (
    <div className="app-shell app-shell--kolivin">
      <main>
        {screen === "login" ? (
          <LoginPage
            onAuthenticated={(role) => {
              setSessionRole(role)
              setScreen("app")
            }}
            onRegister={() => setScreen("register")}
          />
        ) : (
          <KolivinRegistration
            key={`${screen}-${sessionRole}`}
            initialRole={sessionRole}
            startInDashboard={screen === "app"}
            onLogin={() => setScreen("login")}
            onLogout={() => setScreen("login")}
          />
        )}
      </main>
    </div>
  )
}
