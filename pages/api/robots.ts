import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader("Content-Type", "text/plain");

    res.write(`User-agent: *
Allow: /
Disallow: /cart
Disallow: /profile
Disallow: /wishlist

Sitemap: https://www.omsritara.in/sitemap.xml
`);
    res.end();
}
