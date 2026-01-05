import { baseUrl } from "@/api-endpoints/ApiUrls";
import axios from "axios";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/router";
import Head from "next/head"; // ✅ Import Head for meta tags

interface Blog {
    id: number;
    title: string;
    description: string;
    created_at: string;
    banner_url: string;
    content: string;
}

export default function SingleBlogPage({ blog }: { blog: Blog | null }) {
    const router = useRouter();

    if (!blog) {
        return (
            <div className="max-w-4xl mx-auto py-20 text-center">
                <Head>
                    <title>Blog Not Found | Omsritara</title>
                    <meta
                        name="description"
                        content="Sorry, the blog you’re looking for doesn’t exist. Explore more inspiring stories on Pengalulagam."
                    />
                </Head>

                <h2 className="text-2xl font-bold">Blog not found</h2>
                <p className="text-gray-500 mt-2">
                    Sorry, the blog you’re looking for doesn’t exist.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-12 px-4">
            {/* ✅ Dynamic SEO Meta Tags */}
            <Head>
                <title>{`${blog.title} | Omsritara`}</title>
                <meta
                    name="description"
                    content={blog.description?.slice(0, 160) || blog.content.slice(0, 160)}
                />
                <meta property="og:title" content={blog.title} />
                <meta
                    property="og:description"
                    content={blog.description?.slice(0, 160) || blog.content.slice(0, 160)}
                />
                <meta property="og:image" content={blog.banner_url} />
                <meta property="og:type" content="article" />
                <meta property="og:site_name" content="omsritara" />
            </Head>

            {/* ✅ Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center text-gray-700 hover:text-black mb-6"
            >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
            </button>

            {/* Blog Image */}
            {blog.banner_url && (
                <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
                    <Image
                        src={blog.banner_url}
                        alt={blog.title}
                        height={500}
                        width={800}
                        className="object-cover"
                    />
                </div>
            )}

            {/* Blog Title */}
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

            {/* Blog Date */}
            <p className="text-gray-500 text-sm mb-8">
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>

            {/* Blog Content */}
            <div dangerouslySetInnerHTML={{ __html: blog?.content }} className="quill-content" />
        </div>
    );
}

// ✅ Server-Side Rendering
export async function getServerSideProps(context: any) {
    const { title } = context.params;

    const slugify = (text: string) =>
        text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

    try {
        const vendorId = 63; // fallback vendor id
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/?vendor_id=${vendorId}`,
            { headers: { "Cache-Control": "no-cache" } }
        );

        const blogs = res.data?.blogs || [];
        const matched = blogs.find((item: Blog) => slugify(item.title) === title);

        return {
            props: {
                blog: matched || null,
            },
        };
    } catch (error) {
        console.error("SSR Blog fetch error:", error);
        return { props: { blog: null } };
    }
}
