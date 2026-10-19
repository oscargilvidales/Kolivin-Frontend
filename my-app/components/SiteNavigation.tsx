"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type NavigationItem = {
  id: string;
  label: string;
  active?: boolean;
  onClick: () => void;
};

type SiteNavigationProps = {
  variant?: "site" | "auth" | "dashboard";
  activeHref?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  items?: NavigationItem[];
  registration?: boolean;
  owner?: boolean;
  onLogout?: () => void;
};

const siteLinks = [
  { label: "Inicio", href: "/" },
  { label: "Estudiante", href: "/estudiante" },
  { label: "Propietario", href: "/propietario" },
];

function Brand({ dashboard = false }: { dashboard?: boolean }) {
  return (
    <Link
      href="/"
      className={
        dashboard
          ? "kolivin-logo"
          : "site-navigation__brand flex items-center gap-3"
      }
      aria-label="Kolivin, inicio"
    >
      {dashboard ? (
        <span className="brand-asset">
          <Image
            src="/favicon.ico"
            alt=""
            width={38}
            height={38}
            preload
            unoptimized
          />
        </span>
      ) : (
        <Image
          src="/favicon.ico"
          alt=""
          width={42}
          height={42}
          preload
          unoptimized
          className="site-navigation__icon h-[42px] w-[42px] rounded-[12px] object-cover shadow-[inset_0_0_0_1px_rgba(18,34,38,0.08)]"
        />
      )}
      <strong className="text-3xl font-semibold tracking-[-0.06em] text-[#112d39]">
        Kolivin
      </strong>
    </Link>
  );
}

export default function SiteNavigation({
  variant = "site",
  activeHref,
  actionLabel = "Regístrate",
  actionHref = "/registro",
  onAction,
  items = [],
  registration = false,
  owner = false,
  onLogout,
}: SiteNavigationProps) {
  const [accountOpen, setAccountOpen] = useState(false);

  if (variant === "dashboard") {
    return (
      <header
        className={`dashboard-header shared-nav ${
          registration ? "shared-nav--registration" : ""
        }`}
      >
        <Brand dashboard />
        <nav aria-label="Navegación principal">
          {!registration &&
            items.map((item) => (
              <button
                className={item.active ? "active" : ""}
                key={item.id}
                onClick={item.onClick}
              >
                {item.label}
              </button>
            ))}
        </nav>
        {registration ? (
          <button className="nav-login-button" onClick={onAction}>
            {actionLabel}
          </button>
        ) : (
          <div className="nav-account">
            <button
              className="dashboard-profile"
              aria-expanded={accountOpen}
              aria-label="Abrir menú de usuario"
              onClick={() => setAccountOpen(!accountOpen)}
            >
              <span>{owner ? "PR" : "ES"}</span>
              <small>Mi perfil</small>
            </button>
            {accountOpen && (
              <div className="account-menu">
                <button>Mi cuenta</button>
                <button>Ajustes</button>
                <button>Ayuda</button>
                <button
                  className="account-menu__logout"
                  onClick={() => {
                    setAccountOpen(false);
                    onLogout?.();
                  }}
                >
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </header>
    );
  }

  const isAuth = variant === "auth";
  const actionClass = isAuth
    ? "inline-flex items-center justify-center rounded-[16px] border border-[#ced6d2] bg-white/70 px-4 py-2.5 text-sm font-semibold text-[#17343c] transition hover:bg-white"
    : "inline-flex items-center justify-center rounded-[18px] bg-[#1f5d53] px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(31,93,83,0.2)] transition hover:bg-[#174a42] sm:px-5";
  const action = onAction ? (
    <button className={actionClass} onClick={onAction}>
      {actionLabel}
    </button>
  ) : (
    <Link className={actionClass} href={actionHref}>
      {actionLabel}
    </Link>
  );

  return (
    <header
      className={
        isAuth
          ? "site-navigation site-navigation--auth mb-8"
          : "site-navigation mx-auto max-w-[1440px] px-4 pt-8 sm:px-6 lg:px-10"
      }
    >
      <div className="site-navigation__inner flex items-center justify-between gap-4 rounded-[28px] bg-[#f3efe9] py-4">
        <Brand />
        {!isAuth && (
          <nav
            aria-label="Navegación principal"
            className="hidden items-center gap-8 text-base text-[#1b2a2d]/80 md:flex"
          >
            {siteLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={activeHref === item.href ? "page" : undefined}
                className={`transition hover:text-[#112d39] ${
                  activeHref === item.href
                    ? "font-medium text-[#112d39]"
                    : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        <div className="site-navigation__action">{action}</div>
      </div>
    </header>
  );
}