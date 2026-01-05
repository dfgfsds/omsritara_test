// 'use client';
// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Search, X } from 'lucide-react';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { useCurrency } from '@/context/CurrencyContext';

// interface Product {
//     id: string | number;
//     name: string;
//     price: string | number;
//     image_urls: string[];
//     description?: string;
//     tags?: string[];
//     category?: { name?: string };
//     status?: any;
// }

// interface Props {
//     products: Product[] | undefined;
//     label?: string;
//     defaultOpen?: boolean;
// }

// const QuickSearch: React.FC<Props> = ({ products, label = 'Search...', defaultOpen = false }) => {
//     const [isOpen, setIsOpen] = useState(defaultOpen);
//     const [query, setQuery] = useState('');
//     const [results, setResults] = useState<{ products: Product[]; related: Product[] }>({
//         products: [],
//         related: [],
//     });
//     const [showDropdown, setShowDropdown] = useState(false);

//     const wrapperRef = useRef<HTMLDivElement>(null);
//     const inputRef = useRef<HTMLInputElement>(null);
//     const router = useRouter();
//     const { convertPrice } = useCurrency();

//     const openSearch = useCallback(() => setIsOpen(true), []);
//     const closeSearch = useCallback(() => {
//         setIsOpen(false);
//         setQuery('');
//         setShowDropdown(false);
//     }, []);

//     useEffect(() => {
//         if (!isOpen) return;
//         const tid = setTimeout(() => {
//             if (query.trim().length > 2) {
//                 fetchSearchResults(query.trim());
//             } else {
//                 setShowDropdown(false);
//             }
//         }, 300);
//         return () => clearTimeout(tid);
//     }, [query, isOpen]);

//     const fetchSearchResults = (term: string) => {
//         if (!products) return;
//         const lower = term.toLowerCase();
//         const activeProducts = products.filter((p) => {
//             const s = p?.status;
//             return (
//                 s === true ||
//                 s === 1 ||
//                 s === '1' ||
//                 s === 'true' ||
//                 s === 'TRUE' ||
//                 s === 'active' ||
//                 s === 'ACTIVE'
//             );
//         });

//         const titleMatches = activeProducts.filter((p) => p.name.toLowerCase().includes(lower));

//         const related = activeProducts
//             .filter(
//                 (p) =>
//                     !titleMatches.includes(p) &&
//                     (p.description?.toLowerCase().includes(lower) ||
//                         p.tags?.some((t) => t.toLowerCase().includes(lower)) ||
//                         p.category?.name?.toLowerCase().includes(lower))
//             )
//             .slice(0, 5);

//         setResults({ products: titleMatches, related });
//         setShowDropdown(true);
//     };

//     function slugConvert(name: string) {
//         return name
//             .toLowerCase()
//             .trim()
//             .replace(/\s+/g, '-')         // Replace spaces with hyphens
//             .replace(/[^\w-]+/g, '');     // Remove non-word characters except hyphens
//     }

//     // ✅ Open search by default on mobile and tablet (<=1024px, lg breakpoint)
//     useEffect(() => {
//         if (window.innerWidth <= 1024) {
//             setIsOpen(true);
//         }
//     }, []);


//     return (
//         <div
//             ref={wrapperRef}
//             className="relative w-full inline-block"
//             onMouseEnter={() => {
//                 setIsOpen(true);
//                 requestAnimationFrame(() => inputRef.current?.focus());
//             }}
//             onMouseLeave={() => {
//                 if (!query) closeSearch();
//             }}
//         >
//             {/* Search Bar */}
//             <div
//                 className={`flex items-center bg-white overflow-hidden transition-all duration-500 ease-in-out p-2 
//         ${isOpen ? "w-full  border rounded-md md:rounded-full" : ""}
//       `}
//             >
//                 {!isOpen && <span>Search</span>}
//                 <Search size={22} className="ml-2" />

//                 <input
//                     ref={inputRef}
//                     type="text"
//                     className={`w-full text-sm px-2 py-1 focus:outline-none transition-all duration-500 ease-in-out ${!isOpen ? "hidden" : ""
//                         }`}
//                     placeholder="Search products..."
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                 />

//                 {isOpen && (
//                     <button
//                         type="button"
//                         onClick={() => (query ? setQuery("") : closeSearch())}
//                         className="p-1 text-gray-400 hover:text-gray-600 hidden xl:block"
//                         aria-label="Clear search"
//                     >
//                         <X size={16} />
//                     </button>
//                 )}
//             </div>

//             {/* Dropdown */}
//             {isOpen && showDropdown && (
//                 <div
//                     className="absolute left-0 right-0 z-50 bg-white border shadow-md mt-2 rounded-md max-h-[400px] overflow-y-auto text-sm animate-in fade-in slide-in-from-top-2"
//                     role="listbox"
//                 >
//                     {results.products.length > 0 ? (
//                         <>
//                             <p className="px-4 py-2 font-bold text-gray-500 border-b">PRODUCTS</p>

//                             {results.products.map((item, i) => (
//                                 <div
//                                     key={i}
//                                     onClick={() => {
//                                         setShowDropdown(false);
//                                         setQuery('');
//                                         setIsOpen(false);
//                                         router.push(`/shop/${slugConvert(item?.name)}`);
//                                     }}
//                                     className="flex gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                                     role="option"
//                                 >
//                                     {item.image_urls?.[0] && (
//                                         <Image
//                                             src={item.image_urls[0]}
//                                             alt={item.name}
//                                             width={50}
//                                             height={50}
//                                             className="rounded object-cover"
//                                         />
//                                     )}

//                                     <div>
//                                         <p className="font-medium">{item.name}</p>
//                                         <p className="text-red-700">{convertPrice(Number(item.price))}</p>
//                                     </div>
//                                 </div>
//                             ))}
//                         </>
//                     ) : (
//                         <div className="px-4 py-6 text-center text-gray-500">
//                             No products found
//                             {query && (
//                                 <>
//                                     &nbsp;for&nbsp;
//                                     <span className="font-semibold">“{query}”</span>.
//                                 </>
//                             )}
//                             <br />
//                             Please try another keyword.
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default QuickSearch;




'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';

interface Product {
    id: string | number;
    name: string;
    price: string | number;
    image_urls: string[];
    description?: string;
    tags?: string[];
    category?: { name?: string };
    status?: any;
}

interface Props {
    products: Product[] | undefined;
    label?: string;
    defaultOpen?: boolean;
}

const QuickSearch: React.FC<Props> = ({ products, label = 'Search...', defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<{ products: Product[]; related: Product[] }>({
        products: [],
        related: [],
    });
    const [showDropdown, setShowDropdown] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    const { convertPrice } = useCurrency();

    const openSearch = useCallback(() => setIsOpen(true), []);
    const closeSearch = useCallback(() => {
        setIsOpen(false);
        setQuery('');
        setShowDropdown(false);
    }, []);

    // ✅ Debounced search
    useEffect(() => {
        if (!isOpen) return;
        const tid = setTimeout(() => {
            if (query.trim().length > 2) {
                fetchSearchResults(query.trim());
            } else {
                setShowDropdown(false);
            }
        }, 300);
        return () => clearTimeout(tid);
    }, [query, isOpen]);

    // ✅ Fetch and filter results
    const fetchSearchResults = (term: string) => {
        if (!products) return;
        const lower = term.toLowerCase();
        const activeProducts = products.filter((p) => {
            const s = p?.status;
            return (
                s === true ||
                s === 1 ||
                s === '1' ||
                s === 'true' ||
                s === 'TRUE' ||
                s === 'active' ||
                s === 'ACTIVE'
            );
        });

        const titleMatches = activeProducts.filter((p) =>
            p.name.toLowerCase().includes(lower)
        );

        const related = activeProducts
            .filter(
                (p) =>
                    !titleMatches.includes(p) &&
                    (p.description?.toLowerCase().includes(lower) ||
                        p.tags?.some((t) => t.toLowerCase().includes(lower)) ||
                        p.category?.name?.toLowerCase().includes(lower))
            )
            .slice(0, 5);

        setResults({ products: titleMatches, related });
        setShowDropdown(true);
    };

    function slugConvert(name: string) {
        return name
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '');
    }

    // ✅ Auto-open search up to lg screens
    useEffect(() => {
        if (window.innerWidth <= 1024) {
            setIsOpen(true);
        }
    }, []);

    return (
        <div
            ref={wrapperRef}
            className="relative w-full max-w-[600px] mx-auto"
            onMouseEnter={() => {
                setIsOpen(true);
                requestAnimationFrame(() => inputRef.current?.focus());
            }}
            onMouseLeave={() => {
                if (!query) closeSearch();
            }}
        >
            {/* 🔍 Search Bar */}
            <div
                className={`flex items-center bg-white shadow-sm overflow-hidden transition-all duration-500 ease-in-out px-3 py-2  border border-gray-200 rounded-md md:rounded-full
        ${isOpen ? 'w-full rounded-md md:rounded-full border border-gray-200' : 'cursor-pointer hover:shadow-md'}
      `}
            >
                {!isOpen && <span className="text-gray-500 text-sm">Search</span>}
                <Search
                    size={20}
                    className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
                />

                <input
                    ref={inputRef}
                    type="text"
                    className={`flex-1 bg-transparent text-sm px-2 py-1 focus:outline-none transition-all duration-500 ease-in-out ${!isOpen ? 'hidden' : ''
                        }`}
                    placeholder={label}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {isOpen && (
                    <button
                        type="button"
                        onClick={() => (query ? setQuery('') : closeSearch())}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors hidden xl:block"
                        aria-label="Clear search"
                    >
                        <X size={16} />
                    </button>
                )}
            </div>

            {/* 🧩 Dropdown Results */}
            {isOpen && showDropdown && (
                <div
                    className="absolute left-0 right-0 z-50 bg-white border border-gray-200 shadow-lg mt-2 rounded-lg max-h-[400px] overflow-y-auto text-sm animate-in fade-in slide-in-from-top-2"
                    role="listbox"
                >
                    {results.products.length > 0 ? (
                        <>
                            <p className="px-4 py-2 font-semibold text-gray-600 border-b bg-gray-50">
                                Products
                            </p>

                            {results.products.map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => {
                                        setShowDropdown(false);
                                        setQuery('');
                                        setIsOpen(false);
                                        router.push(`/shop/${slugConvert(item?.name)}`);
                                    }}
                                    className="flex gap-3 px-4 py-2 hover:bg-gray-100 cursor-pointer transition-colors"
                                    role="option"
                                >
                                    {item.image_urls?.[0] && (
                                        <Image
                                            src={item.image_urls[0]}
                                            alt={item.name}
                                            width={50}
                                            height={50}
                                            className="rounded-md object-cover border"
                                        />
                                    )}

                                    <div>
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-red-600 font-semibold">
                                            {convertPrice(Number(item.price))}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className="px-4 py-6 text-center text-gray-500">
                            No products found
                            {query && (
                                <>
                                    &nbsp;for&nbsp;
                                    <span className="font-semibold">“{query}”</span>.
                                </>
                            )}
                            <br />
                            Please try another keyword.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default QuickSearch;
