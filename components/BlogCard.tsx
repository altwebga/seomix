import { getPosts } from "@/lib/api";
import { Post } from "@/lib/types";
export async function BlogCard() {
    const posts = await getPosts(2, 99);
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {posts.map((post: Post) => (
                <div key={post.id}>
                    <h3>{post.title.rendered}</h3>
                    <div>{post.content.rendered}</div>
                    </div>
            ))}
        </div>
    );
}