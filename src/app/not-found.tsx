import Link from "next/link";

export default function NotFound() {
  return (
    <section className="not-found" aria-labelledby="not-found-heading">
      <p className="eyebrow">404</p>
      <h1 id="not-found-heading">找不到頁面</h1>
      <p className="lead">這個頁面不存在，或內容已移動到其他位置。</p>
      <Link className="text-link" href="/">
        回到首頁
      </Link>
    </section>
  );
}
