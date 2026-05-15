import { RemoteImage } from "@/components/ui/RemoteImage";
import type { FeaturedImage } from "@/lib/wordpress/types";

type PostImageProps = {
  image?: FeaturedImage;
  priority?: boolean;
};

export function PostImage({ image, priority }: PostImageProps) {
  return (
    <div className="post-image-frame">
      <RemoteImage image={image} className="post-image" priority={priority} sizes="(max-width: 768px) 100vw, 480px" />
    </div>
  );
}
