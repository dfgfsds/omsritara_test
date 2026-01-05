import { baseUrl } from "@/api-endpoints/ApiUrls";
import axios from "axios";
import BlogAllPages from "@/components/BlogAllPages";

export default function BlogPage({ blogs }: { blogs: any[] }) {
    return <BlogAllPages blogs={blogs} />;
}

// SSR function
export async function getServerSideProps() {
    try {
        const vendorId = 63;
        const blogAPI = `${process.env.NEXT_PUBLIC_API_BASE_URL}/blog/?vendor_id=${vendorId}`;
        const res = await axios.get(blogAPI);

        return {
            props: {
                blogs: res.data?.blogs || [],
            },
        };
    } catch (error) {
        console.error(error);
        return {
            props: {
                blogs: [],
            },
        };
    }
}
