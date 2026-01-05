import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#222222] text-gray-400 px-6 lg:px-20 py-12 text-sm">
            {/* Top Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
                {/* SHOP */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase">Shop</h3>
                    <ul className="space-y-2">
                        <li><Link href="/categories/bracelet" className="hover:text-white transition-colors">Bracelet</Link></li>
                        <li><Link href="/categories/mala" className="hover:text-white transition-colors">Mala</Link></li>
                        <li><Link href="/categories/spiritual-statues" className="hover:text-white transition-colors">Spiritual Statues</Link></li>
                        <li><Link href="/categories/rings" className="hover:text-white transition-colors">Rings</Link></li>
                    </ul>
                </div>

                {/* COMPANY */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase">Company</h3>
                    <ul className="space-y-2">
                        <li><Link href="/about" className="hover:text-white transition-colors"> Our Story</Link></li>
                        <li><Link href="/blog" className="hover:text-white transition-colors"> Blogs</Link></li>
                        <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                    </ul>
                </div>

                {/* NEED HELP */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase">Need Help?</h3>
                    <ul className="space-y-2">
                        <li>
                            <Link href="/profile" className="hover:text-white transition-colors">My Account</Link>
                        </li>
                        <li>
                            <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
                        </li>
                        <li>
                            <Link href="/terms-conditions" className="hover:text-white transition-colors">Terms And Conditions</Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href="/cancellation-policy" className="hover:text-white transition-colors">Cancellation Policy</Link>
                        </li>
                        <li>
                            <Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link>
                        </li>
                    </ul>
                </div>

                {/* CONTACT INFO */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase">Where to Contact Us</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="mailto:info@omsritara.com" className="text-purple-700">info@omsritara.com</a>
                        </li>
                        <li>
                            Ph No: <a href="tel:+918989052020" className="text-purple-700">+91-89890-52020</a>
                        </li>
                        <li>
                            <span className="block font-medium mt-2">ADDRESS:</span>
                            OMSRITARA<br />
                            46, Giri Rd, Satyamurthy Nagar,<br />
                            T. Nagar, Chennai,<br />
                            Tamil Nadu 600017
                        </li>
                    </ul>
                </div>

                {/* NEWSLETTER */}
                <div>
                    <h3 className="font-semibold mb-4 uppercase">Newsletter</h3>
                    <p className="mb-4">
                        Om Sritara is an authentic online crystal shop offering natural healing stones, Reiki products, and spiritual accessories. Buy raw crystals online and bring positive energy, prosperity, and peace into your life.
                    </p>
                    {/* Social Icons */}
                    <span className='flex gap-3'>

                        <a href="https://www.facebook.com/omsritarafoundation/" target='_blank' className="bg-slate-100 p-2 hover:scale-110 transition-transform rounded-full text-[#000] ">
                            <Facebook size={16} />
                        </a>
                        <a href="https://x.com/Omsritara" target='_blank' className="bg-slate-100 p-2 rounded-full text-[#000] hover:scale-110 transition-transform">
                            <Twitter size={16} />
                        </a>
                        <a href="https://www.youtube.com/channel/UCxXJOgXcbckwNby5kEFkBjA" target='_blank' className="bg-slate-100 p-2 rounded-full text-[#000] hover:scale-110 transition-transform">
                            <Youtube size={16} />
                        </a>
                        <a href="https://www.instagram.com/omsritara/" target='_blank' className="bg-slate-100 p-2 rounded-full text-[#000] hover:scale-110 transition-transform">
                            <Instagram size={16} />
                        </a>
                    </span>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-300 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs gap-2">
                <p>© 2025 OMSRITARA</p>
                <p>
                    Powered by{' '}
                    <a
                        href="https://www.ftdigitalsolutions.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-purple-700 hover:underline"
                    >
                        FT Digital Solutions (Agency).
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
