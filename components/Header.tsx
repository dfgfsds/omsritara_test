'use client';
import React, { useState, useEffect, useRef, Fragment } from 'react';
import {
    Menu,
    X,
    ShoppingCart,
    User,
    Heart,
    ChevronDown,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import SearchBar from './SearchBar';
import logo from '@/public/logo.png';

import { useProducts } from '@/context/ProductsContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useVendor } from '@/context/VendorContext';
import { useUser } from '@/context/UserContext';
import { useCartItem } from '@/context/CartItemContext';
import { useWishList } from '@/context/WishListContext';
import LoginModal from '@/pages/LoginModal/page';
import { useCategories } from '@/context/CategoriesContext';
import { useIntentions } from '@/context/IntentionsContext';
import QuickSearch from './SearchBar';
import { slugConvert } from '@/lib/utils';
// import { getCategoriesWithSubcategoriesApi } from '@/Api-Service/Apis';

type Category = {
    id: number | string;
    name: string;
    subcategories?: { id: number | string; name: string }[];
};

const Header: React.FC = () => {
    const { vendorId } = useVendor();
    const { user, setUser } = useUser();
    const { cartItem } = useCartItem();
    const { currency, setCurrency } = useCurrency();
    const { products } = useProducts();
    const pathname = usePathname() || "";

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
    const [isIntentionOpen, setIsIntentionOpen] = useState(false);
    const [isOffersOpen, setIsOffersOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [signInModal, setSignInModal] = useState(false);


    const currencyRef = useRef<HTMLDivElement>(null);
    const userMenuRef = useRef<HTMLDivElement>(null);
    const categoriesRef = useRef<HTMLDivElement>(null);
    const intentionRef = useRef<HTMLDivElement>(null);
    const offersRef = useRef<HTMLDivElement>(null);

    const userName = user?.data?.name ?? '';
    const userId = user?.data?.id ?? '';
    const cartCount = cartItem?.data?.length ?? 0;
    const { categories, isLoading } = useCategories();
    const { intentions, isIntentionsLoading }: any = useIntentions();
    const offersPage = [
        { name: "Money Combo", url: '/combo-offers' },
        { name: "Relationship Combo", url: '/combo-offers-love' },
    ];
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                isCurrencyOpen &&
                currencyRef.current &&
                !currencyRef.current.contains(e.target as Node)
            )
                setIsCurrencyOpen(false);

            if (
                isUserMenuOpen &&
                userMenuRef.current &&
                !userMenuRef.current.contains(e.target as Node)
            )
                setIsUserMenuOpen(false);

            if (
                isCategoriesOpen &&
                categoriesRef.current &&
                !categoriesRef.current.contains(e.target as Node)
            )
                setIsCategoriesOpen(false);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCurrencyOpen, isUserMenuOpen, isCategoriesOpen]);

    /* ---------- helpers ---------- */
    const router = useRouter();
    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const logout = () => {
        ['userId', 'userName', 'email', 'cartId'].forEach((k) =>
            localStorage.removeItem(k)
        );
        setUser(null);
    };

    // Helper for active style
    const isActive = (path: string) => {
        if (path === "/") return pathname === "/"; // ✅ only active for exact match
        return pathname.startsWith(path);
    };

    return (
        <>
            <header className="w-full pb-4 bg-white">
                <div className="flex items-center justify-between  py-3 mx-10">
                    {/* logo */}
                    <Link href="/">
                        <Image
                            src={logo}
                            alt="Omsritara Logo"
                            className="w-24 h-auto md:w-24"
                            priority
                        />
                    </Link>

                    {/* right‑hand icons (desktop) */}
                    <div className="hidden lg:flex items-center gap-6 text-sm">
                        {/* search (desktop only) */}
                        {/* <div className="hidden lg:flex  "> */}
                        <QuickSearch products={products?.data} />
                        {/* </div> */}

                        <Link href="/cart" className="flex items-center gap-1 cursor-pointer">
                            <span className="ml-2">Cart</span>
                            <span className="relative">
                                <ShoppingCart size={18} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                                        {cartCount}
                                    </span>
                                )}
                            </span>
                        </Link>
                        {/* wishlist / cart */}
                        <Link
                            href="/wishlist"
                            className="flex items-center gap-1 cursor-pointer"
                        >
                            Wishlist  <Heart size={18} />
                        </Link>
                        {/* currency switcher */}
                        <div className="relative" ref={currencyRef}>
                            <button
                                onClick={() => setIsCurrencyOpen((o) => !o)}
                                className="flex items-center gap-1"
                            >
                                {currency} <ChevronDown className="w-4 h-4" />
                            </button>
                            {isCurrencyOpen && (
                                <div className="absolute mt-2 bg-white shadow-md rounded-md border w-24">
                                    {(['INR', 'USD'] as const).map((c) => (
                                        <button
                                            key={c}
                                            onClick={() => {
                                                setCurrency(c);
                                                setIsCurrencyOpen(false);
                                            }}
                                            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* user / login */}
                        <div className="relative" ref={userMenuRef}>
                            {userName || userId ? (
                                <>
                                    <button
                                        onClick={() => setIsUserMenuOpen((o) => !o)}
                                        className="flex items-center gap-1 cursor-pointer"
                                    >
                                        <User size={18} />
                                        {userName ? userName?.split(' ')[0] : 'user'}
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {isUserMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow text-sm z-50">
                                            <Link
                                                href="/profile?tab=account"
                                                className="block px-4 py-2 hover:bg-gray-100 m-2 rounded-md"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                Profile
                                            </Link>
                                            <Link
                                                href="/profile?tab=orders"
                                                className="block px-4 py-2 hover:bg-gray-100 m-2 rounded-md"
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                Orders
                                            </Link>
                                            <button
                                                onClick={logout}
                                                className="block text-left py-2 hover:bg-red-600 pl-4 mx-2 mt-2 mb-2  hover:text-white rounded-md w-[90%]"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <button
                                    onClick={() => setSignInModal(true)}
                                    className="flex items-center gap-1 cursor-pointer bg-[#a5291b] text-white px-4 py-2 rounded-md"
                                >
                                    <User size={18} /> Login
                                </button>
                            )}
                        </div>
                    </div>

                    {/* mobile menu toggle */}
                    <button
                        className="lg:hidden text-[#a5291b]"
                        onClick={() => setIsMobileMenuOpen((o) => !o)}
                    >
                        {isMobileMenuOpen ? "" : <Menu />}
                    </button>
                </div>


                {/* ---------- DESKTOP MAIN NAV --------------------------------------- */}
                <div className="hidden lg:flex justify-evenly px-12 py-1 text-md text-white bg-[#a5291b] mx-10 rounded-md">
                    <div className="flex justify-evenly w-full">
                        <Link
                            href="/"
                            className={`nav-item relative ${isActive("/") ? "underline" : ""}`}
                        >
                            Home
                        </Link>

                        <Link
                            href="/shop"
                            className={`nav-item relative ${isActive("/shop") ? "underline" : ""}`}
                        >
                            Shop
                        </Link>

                        {/* Categories hover menu */}
                        <div
                            className="relative"
                            ref={categoriesRef}
                            onMouseEnter={() => setIsCategoriesOpen(true)}
                            onMouseLeave={() => setIsCategoriesOpen(false)}
                        >
                            <button
                                onClick={() => router.push("/categories")}
                                className={`nav-item relative flex items-center gap-1 ${pathname.startsWith("/categories") ? "underline" : ""}`}
                                type="button"
                            >
                                Categories
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isCategoriesOpen && (
                                <div className="absolute left-0 w-48 bg-white text-black border rounded-md shadow text-sm z-50 max-h-80 overflow-y-auto no-scrollbar">
                                    {isLoading ? (
                                        <div className="px-4 py-2">Loading…</div>
                                    ) : categories?.data?.length ? (
                                        categories.data.map((cat: any) => (
                                            <Fragment key={cat.id}>
                                                <Link
                                                    href={`/categories/${slugConvert(cat.name)}`}
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => setIsCategoriesOpen(false)}
                                                >
                                                    {cat.name}
                                                </Link>
                                            </Fragment>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2">No categories found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Intention hover menu */}
                        <div
                            className="relative"
                            ref={intentionRef}
                            onMouseEnter={() => setIsIntentionOpen(true)}
                            onMouseLeave={() => setIsIntentionOpen(false)}
                        >
                            <button
                                onClick={() => router.push("/shopByIntention")}
                                className={`nav-item relative flex items-center gap-1 ${pathname.startsWith("/shopByIntention") ? "underline" : ""}`}
                                type="button"
                            >
                                Shop by Intention
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isIntentionOpen && (
                                <div className="absolute left-0 w-56 bg-white border text-black rounded-md shadow text-sm z-50 max-h-80 overflow-y-auto no-scrollbar">
                                    {isIntentionsLoading ? (
                                        <div className="px-4 py-2">Loading…</div>
                                    ) : intentions?.length ? (
                                        intentions.map((cat: any) => (
                                            <Fragment key={cat.id}>
                                                <Link
                                                    href={`/shopByIntention/${cat.name}`}
                                                    className="block px-4 py-2 hover:bg-gray-100"
                                                    onClick={() => setIsIntentionOpen(false)}
                                                >
                                                    {cat.name}
                                                </Link>
                                            </Fragment>
                                        ))
                                    ) : (
                                        <div className="px-4 py-2">No intentions found</div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Offers hover menu */}
                        <div
                            className="relative"
                            ref={intentionRef}
                            onMouseEnter={() => setIsOffersOpen(true)}
                            onMouseLeave={() => setIsOffersOpen(false)}
                        >
                            <button
                                onClick={() => router.push("/combo-offers")}
                                className={`nav-item relative flex items-center gap-1 ${pathname.startsWith("/combo-offers") ? "underline" : ""}`}
                                type="button"
                            >
                                Offers
                                <ChevronDown className="w-4 h-4" />
                            </button>

                            {isOffersOpen && (
                                <div className="absolute left-0 w-52 bg-white border text-black rounded-md shadow text-sm z-50 max-h-80 overflow-y-auto no-scrollbar">

                                    {offersPage.map((cat: any) => (
                                        <Fragment key={cat.id}>
                                            <Link
                                                href={`/${cat.url}`}
                                                className="block px-4 py-2 hover:bg-gray-100"
                                                onClick={() => setIsIntentionOpen(false)}
                                            >
                                                {cat.name}
                                            </Link>
                                        </Fragment>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* <Link
                            href="/combo-offers"
                            className={`nav-item relative ${isActive("/combo-offers") ? "underline" : ""}`}
                        >
                            Offers
                        </Link> */}

                        <Link
                            href="/blog"
                            className={`nav-item relative ${isActive("/blog") ? "underline" : ""}`}
                        >
                            Blog
                        </Link>

                        <Link
                            href="/contactUs"
                            className={`nav-item relative ${isActive("/contactUs") ? "underline" : ""}`}
                        >
                            Contact&nbsp;Us
                        </Link>

                        <Link
                            href="/about"
                            className={`nav-item relative ${isActive("/about") ? "underline" : ""}`}
                        >
                            About&nbsp;Us
                        </Link>
                    </div>
                </div>

                {/* ---------- MOBILE MENU -------------------------------------------- */}
                {isMobileMenuOpen && (
                    <div
                        className={`fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0 ' : '-translate-x-full'
                            }`}
                    >
                        {/* Backdrop */}
                        <div
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
                            onClick={closeMobileMenu}
                        />

                        {/* Sidebar (Drawer) */}
                        <div
                            className={`absolute top-0 left-0 w-72 h-full bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                                }`}
                        >
                            {/* Close button */}
                            <div className="flex justify-end">
                                <button onClick={closeMobileMenu} className="text-[#a5291b]">
                                    <X />
                                </button>
                            </div>

                            {/* Logo */}
                            <Image
                                src={logo}
                                alt="Omsritara Logo"
                                height={90}
                                width={90}
                                className="w-32 h-auto mb-4"
                                priority
                            />

                            <nav className="flex flex-col gap-3">
                                <Link
                                    href="/"
                                    onClick={closeMobileMenu}
                                    className={`relative pb-1 ${isActive("/") ? "underline" : ""}`}
                                >
                                    Home
                                </Link>

                                <Link
                                    href="/shop"
                                    onClick={closeMobileMenu}
                                    className={`relative pb-1 ${isActive("/shop") ? "underline" : ""}`}
                                >
                                    Shop
                                </Link>

                                <Link
                                    href="/categories"
                                    onClick={closeMobileMenu}
                                    className={`relative pb-1 ${pathname.startsWith("/categories") ? "underline" : ""}`}
                                >
                                    Categories
                                </Link>

                                <Link
                                    href="/shopByIntention"
                                    onClick={closeMobileMenu}
                                    className={`relative pb-1 ${pathname.startsWith("/shopByIntention") ? "underline" : ""}`}
                                >
                                    Shop by Intention
                                </Link>

                                <Link
                                    href="/combo-offers"
                                    onClick={closeMobileMenu}
                                    className={`relative pb-1 ${pathname === "/combo-offers" ? "underline" : ""}`}
                                >
                                    Money Combo
                                </Link>

                                <Link
                                    href="/combo-offers-love"
                                    onClick={closeMobileMenu}
                                    className={`relative pb-1 ${pathname === "/combo-offers-love" ? "underline" : ""}`}
                                >
                                    Relationship Combo
                                </Link>

                                <Link
                                    href="/blog"
                                    onClick={closeMobileMenu}
                                    className={`relative pb-1 ${isActive("/blog") ? "underline" : ""}`}
                                >
                                    Blog
                                </Link>

                                <Link
                                    href="/contactUs"
                                    onClick={closeMobileMenu}
                                    className={` ${isActive("/contactUs") ? "underline" : ""}`}
                                >
                                    Contact Us
                                </Link>

                                <Link
                                    href="/about"
                                    onClick={closeMobileMenu}
                                    className={`relative pb-1 ${isActive("/about") ? "underline" : ""}`}
                                >
                                    About Us
                                </Link>

                                <Link
                                    href="/cart"
                                    onClick={closeMobileMenu}
                                    className={`relative pb-1 ${isActive("/cart") ? "underline" : ""}`}
                                >
                                    Cart
                                </Link>
                            </nav>
                            {/* User Section */}
                            <div className="mt-6 flex flex-col gap-3 text-sm">
                                {userName ? (
                                    <>
                                        <Link href="/wishlist" onClick={closeMobileMenu}>Wishlist</Link>
                                        <Link href="/profile?tab=account" onClick={closeMobileMenu}>
                                            {userName.split(' ')[0]}'s Account
                                        </Link>
                                        <button
                                            onClick={() => { logout(); closeMobileMenu(); }}
                                            className="text-left text-red-700 font-semibold"
                                        >
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => { setSignInModal(true); closeMobileMenu(); }}
                                        className="text-left"
                                    >
                                        Login
                                    </button>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="mt-6 pt-4 border-t text-red-700 font-bold">
                                Call&nbsp;Us:&nbsp;+91&nbsp;89890&nbsp;52020
                            </div>
                        </div>
                    </div>
                )}



                <div className=" lg:hidden flex-1 mx-4">
                    <SearchBar products={products?.data} />
                </div>
            </header>

            {/* ---------- LOGIN MODAL -------------------------------------------- */}
            {signInModal && (
                <LoginModal
                    open={signInModal}
                    handleClose={() => setSignInModal(false)}
                    vendorId={vendorId}
                />
            )}
        </>
    );
};

export default Header;
