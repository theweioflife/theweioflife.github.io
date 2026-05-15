export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p className="site-footer-name">theweioflife</p>
      <p className="site-footer-platform">© {year}</p>
    </footer>
  );
}
