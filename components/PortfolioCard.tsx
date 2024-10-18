import Image from "next/image";
import Link from "next/link";
import  placeholderImage from "@/public/images/placeholder_image.svg";
import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";
export async function PortfolioCard() {
    const cases = await getPosts(3, 99);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cases.map((post: Post) => (
                <div key={post.id}>
                    <Link href={`/portfolio/${post.slug}`} className="text-2xl">
                    <Image
                        src={post.image_url || placeholderImage}
                        alt={post.title.rendered}
                        width={500}
                        height={500}
                    />
                    <h3>{post.title.rendered}</h3>
                    </Link>
                </div>
            ))}
        </div>
    );
}