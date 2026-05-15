import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PostList } from "@/components/posts/PostList";
import { getCategories, getPostsByCategorySlug } from "@/lib/wordpress/api";
import { absoluteUrl, getDefaultOgImageUrl, siteConfig } from "@/lib/config/site";

type CategoryPageParams = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.filter((category) => category.count !== 0).map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    return {};
  }

  return {
    title: category.name,
    description: `${siteConfig.name}「${category.name}」分類文章。`,
    alternates: {
      canonical: absoluteUrl(`/categories/${category.slug}/`)
    },
    openGraph: {
      title: `${category.name} | ${siteConfig.name}`,
      description: `${siteConfig.name}「${category.name}」分類文章。`,
      url: absoluteUrl(`/categories/${category.slug}/`),
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [getDefaultOgImageUrl()]
    }
  };
}

export default async function CategoryPage({ params }: CategoryPageParams) {
  const { slug } = await params;
  const [categories, posts] = await Promise.all([getCategories(), getPostsByCategorySlug(slug)]);
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <section className="section-block" aria-labelledby="category-heading">
      <p className="eyebrow">Category</p>
      <h1 id="category-heading">{category.name}</h1>
      <PostList posts={posts} />
    </section>
  );
}
