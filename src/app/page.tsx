import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PostListItem } from "@/components/posts/PostListItem";
import { absoluteUrl, getBasePath, getDefaultOgImageUrl, siteConfig } from "@/lib/config/site";
import { getAllPosts } from "@/lib/wordpress/api";

export const metadata: Metadata = {
  title: siteConfig.defaultTitle,
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/")
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [getDefaultOgImageUrl()]
  }
};

export default function HomePage() {
  const content = getHomeContent();
  const avatarSrc = `${getBasePath()}/avatar.png`;

  return (
    <>
      <section className="home-intro" aria-labelledby="home-heading">
        <Image
          src={avatarSrc}
          alt="Wei Cheng 的頭像"
          width={96}
          height={96}
          className="hero-avatar"
          priority
        />
        <div className="hero-text">
          <h1 id="home-heading">theweioflife</h1>
          <nav className="hero-sub-nav" aria-label="站點 sub 導覽">
            <span>London</span>
            <span aria-hidden="true">|</span>
            <Link href="/about/">About</Link>
          </nav>
        </div>
      </section>
      <section className="home-about" aria-labelledby="about-heading">
        <h2 id="about-heading">關於</h2>
        <p>Wei Cheng 的倫敦活動分享速報 每週免費吃吃喝喝玩玩，連我都參加不完的活動（主要是科技、藝術手作）</p>
        <a
          className="subscribe-button"
          href="https://buy.stripe.com/00waEY2O7f20dMq8kpbo400"
          target="_blank"
          rel="noopener noreferrer"
        >
          Subscribe
        </a>
      </section>
      <HomeContent content={content} />
    </>
  );
}

async function HomeContent({ content }: { content: Promise<Awaited<ReturnType<typeof getHomeContent>>> }) {
  const { posts } = await content;

  return (
    <section className="section-block events-section" aria-labelledby="events-heading">
      <h2 id="events-heading">Events</h2>
      <div className="post-list">
        {posts.map((post) => (
          <PostListItem key={post.id} post={post} compact />
        ))}
      </div>
    </section>
  );
}

async function getHomeContent() {
  const posts = await getAllPosts();
  return { posts };
}
