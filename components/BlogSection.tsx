// "use client";
// import React from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { slugify } from "@/lib/utils";

// const BlogSection: React.FC<{ blogs: any[] }> = ({ blogs }) => {
//     const recentBlogs = [...(blogs || [])]
//         .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
//         .slice(0, 3);

//     return (
//         <section className="py-6 px-4 bg-white">
//             <div className="max-w-7xl mx-auto container">
//                 <h2 className="text-3xl font-extrabold text-center mb-10">
//                     Our Latest Blogs
//                 </h2>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//                     {recentBlogs?.map((post, idx) => {
//                         const date = new Date(post?.created_at);
//                         const monthDay = date.toLocaleDateString("en-US", {
//                             month: "short",
//                             day: "2-digit",
//                         });
//                         const year = date.getFullYear();

//                         return (
//                             <div key={idx} className="px-3">
//                                 <div className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition duration-300 h-full">
//                                     {/* Image Section */}
//                                     <div className="relative h-56 w-full hover:scale-105 transition-transform duration-300">
//                                         {post?.banner_url && (
//                                             // <Image
//                                             //     src={post.banner_url}
//                                             //     alt={post.title}
//                                             //     fill
//                                             //     className="object-cover"
//                                             // />
//                                             <Image
//                                                 src={post.banner_url}
//                                                 alt={post.title}
//                                                 fill
//                                                 sizes="(max-width: 768px) 100vw, 33vw"
//                                             />

//                                         )}

//                                         {/* Date Badge */}
//                                         <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2">
//                                             <div className="bg-white text-gray-800 text-xs p-4 rounded-full shadow-md text-center w-24">
//                                                 <p>{monthDay}</p>
//                                                 <div className="my-1 border-t border-gray-300 w-full"></div>
//                                                 <p>{year}</p>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     {/* Content */}
//                                     <div className="p-5 text-center">
//                                         <h3 className="text-lg font-bold text-gray-900 mt-6">
//                                             {post.title}
//                                         </h3>
//                                         <p className="text-sm text-gray-600 mt-2">
//                                             {post.description}
//                                         </p>

//                                         <Link href={`/blog/${slugify(post.title)}`}>
//                                             <button className="relative w-36 h-12 rounded-full text-sm font-medium text-white bg-black hover:text-white overflow-hidden z-10 group transition-all duration-300">
//                                                 <span className="relative z-10">Read more</span>
//                                                 <span className="absolute left-0 top-0 h-full w-0 rounded-full bg-[#991b1b] transition-all duration-500 ease-in-out group-hover:w-full z-0"></span>
//                                             </button>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default BlogSection;


"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { slugify } from "@/lib/utils";

const BlogSection: React.FC<{ blogs: any[] }> = ({ blogs }) => {
    const recentBlogs = [...(blogs || [])]
        .sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        )
        .slice(0, 3);

    return (
        <section className="py-6 px-4 bg-white">
            <div className="max-w-7xl mx-auto container">
                <h2 className="text-3xl font-extrabold text-center mb-10">
                    Our Latest Blogs
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {recentBlogs.map((post) => {
                        const date = new Date(post.created_at);
                        const monthDay = date.toLocaleDateString("en-US", {
                            month: "short",
                            day: "2-digit",
                        });
                        const year = date.getFullYear();

                        return (
                            <article
                                key={post.id || post.slug || post.title}
                                className="px-3"
                            >
                                <div className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-md transition h-full">
                                    {/* IMAGE */}
                                    <div className="relative h-56 w-full overflow-hidden">
                                        {post.banner_url && (
                                            <Image
                                                src={post.banner_url}
                                                alt={post.title}
                                                fill
                                                loading="lazy"
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover transition-transform duration-300 hover:scale-105"
                                                unoptimized
                                            />
                                        )}

                                        {/* DATE BADGE */}
                                        <div className="absolute bottom-[-28px] left-1/2 -translate-x-1/2">
                                            <div className="bg-white text-gray-800 text-xs p-3 rounded-full shadow-md text-center w-24">
                                                <p>{monthDay}</p>
                                                <div className="my-1 border-t border-gray-300"></div>
                                                <p>{year}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CONTENT */}
                                    <div className="p-5 text-center mt-6">
                                        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                                            {post.description}
                                        </p>

                                        <Link
                                            href={`/blog/${slugify(post.title)}`}
                                            className="inline-block mt-4"
                                            aria-label={`Read blog ${post.title}`}
                                        >
                                            <span className="relative inline-flex items-center justify-center w-36 h-12 rounded-full text-sm font-medium text-white bg-black overflow-hidden group">
                                                <span className="relative z-10">
                                                    Read more
                                                </span>
                                                <span className="absolute inset-0 w-0 bg-[#991b1b] transition-all duration-500 group-hover:w-full" />
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
