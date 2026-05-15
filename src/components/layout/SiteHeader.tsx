import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="site-title" href="/">
        theweioflife
      </Link>
    </header>
  );
}
