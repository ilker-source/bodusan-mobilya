"use client";

import { useRef } from "react";
import Link from "next/link";

export default function MobileMenu({
  locale,
  en,
}: {
  locale: string;
  en: boolean;
}) {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menuRef.current?.removeAttribute("open");

  return (
    <details className="mobil-menu" ref={menuRef}>
      <summary aria-label={en ? "Open menu" : "Menüyü aç"}>☰</summary>
      <div>
        <Link href={`/${locale}/kurumsal`} onClick={closeMenu}>
          {en ? "Corporate" : "Kurumsal"}
        </Link>
        <Link href={`/${locale}/urunler`} onClick={closeMenu}>
          {en ? "Products" : "Urunler"}
        </Link>
        <Link href={`/${locale}/projeler`} onClick={closeMenu}>
          {en ? "Projects" : "Projeler"}
        </Link>
        <Link href={`/${locale}/uretim`} onClick={closeMenu}>
          {en ? "Factory" : "Uretim"}
        </Link>
        <Link href={`/${locale}/haberler`} onClick={closeMenu}>
          {en ? "News" : "Haberler"}
        </Link>
        <Link href={`/${locale}/iletisim`} onClick={closeMenu}>
          {en ? "Contact" : "Iletisim"}
        </Link>
        <Link href={`/${locale}/teklif-al`} onClick={closeMenu}>
          {en ? "Get a Quote" : "Teklif Al"}
        </Link>
      </div>
    </details>
  );
}
