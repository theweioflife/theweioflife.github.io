/* eslint-disable @next/next/no-img-element */
import type { FeaturedImage } from "@/lib/wordpress/types";

type RemoteImageProps = {
  image?: FeaturedImage;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const allowedHosts = ["theweioflife1.wordpress.com", "secure.gravatar.com"];

export function RemoteImage({ image, className, priority = false, sizes }: RemoteImageProps) {
  if (!image || !isAllowedImageHost(image.src)) {
    return null;
  }

  return (
    <img
      className={className}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      sizes={sizes}
    />
  );
}

export function isAllowedImageHost(src: string) {
  try {
    const host = new URL(src).hostname;
    return allowedHosts.includes(host) || host.endsWith(".wordpress.com");
  } catch {
    return false;
  }
}
