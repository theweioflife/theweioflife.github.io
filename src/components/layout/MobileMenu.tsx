"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mobile-menu">
      <button
        className="mobile-menu-button"
        type="button"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((current) => !current)}
      >
        選單
      </button>
      {open ? (
        <nav id="mobile-navigation" className="mobile-nav" aria-label="手機導覽">
          <Link href="/" onClick={() => setOpen(false)}>
            首頁
          </Link>
          <Link href="/posts/" onClick={() => setOpen(false)}>
            文章
          </Link>
          <Link href="/about/" onClick={() => setOpen(false)}>
            關於
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
