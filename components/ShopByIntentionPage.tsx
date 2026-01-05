'use client';

import { useIntentions } from '@/context/IntentionsContext';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopByIntentionPage() {


    const { intentions }: any = useIntentions();

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 py-12">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold mb-4 mt-3">Shop by Intention</h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Browse our collection of sustainable and eco-friendly products organized by category.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {intentions?.map((category: any) => (
                        <Link
                            href={`/shopByIntention/${category?.name}`}
                            key={category?.id}
                            className="relative group overflow-hidden rounded-md shadow hover:shadow-lg transition"
                        >
                            {/* Background Image */}
                            <div className="aspect-[4/3] w-full overflow-hidden">
                                {category?.image && (
                                    <Image
                                        src={category?.image || 'https://semantic-ui.com/images/wireframe/image.png'}
                                        alt={category?.name || 'Category'}
                                        className="h-full w-full object-cover  transition-transform duration-500"
                                        width={300}
                                        height={288}
                                    />
                                )}

                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                            {/* Text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h3 className="text-white text-2xl font-bold uppercase tracking-wide text-center px-4">
                                    {category?.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
