'use client';

import { Phone } from 'lucide-react';

const ContactUs = () => {
    return (
        <section>
            <div className="container mx-auto px-4 py-12" />
            <div className="py-12 px-4 sm:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {/* Left: Contact Info (33%) */}
                    <div className="space-y-10">
                        {/* Customer Service */}

                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                               ABOUT
                            </h3>
                            <div className="flex items-start gap-3 text-sm text-gray-700">
                                Welcome to Om Sri Tara
                                Where Thoughtful Home Decor Meets Everyday Living
                                At Om Sri Tara, we specialize in elegant, calming home decor designed to bring beauty, comfort, and harmony into your living space. Our carefully curated pieces are crafted to help create a peaceful environment where you can truly feel at home. Explore our collection to find decor that reflects your style and adds a touch of serenity to your everyday life.
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                CUSTOMER SERVICE
                            </h3>
                            <div className="flex items-start gap-3 text-sm text-gray-700">
                                <Phone className="text-indigo-600 mt-1" />
                                <div>
                                    <p className="text-gray-400">+91 89890-52020</p>
                                    <p>Monday to Saturday</p>
                                    <p>10 am – 6:30 pm (Chennai)</p>
                                </div>
                            </div>
                        </div>

                        {/* Store Location */}
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                STORE LOCATOR
                            </h3>
                            <p className="text-sm text-gray-700">
                                OMSRITARA <br />
                                46, Giri Rd, Satyamurthy Nagar,<br />
                                T. Nagar, Chennai,<br />
                                Tamil Nadu 600017
                            </p>
                        </div>
                    </div>

                    {/* Right: Map (66%) */}
                    <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                        {/* 
              Wrap the iframe in a relative container that maintains a 16:9
              ratio on small screens and a 4:3 ratio on md+ for a bit more height.
            */}
                        <div className="relative w-full overflow-hidden
                            aspect-video md:aspect-[4/3]">
                            <iframe
                                className="absolute inset-0 h-full w-full rounded-lg"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3001.137320737869!2d80.24020797367295!3d13.048277713195352!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267ba8897b355%3A0x4052872bbb99005!2sReiki%20Healing%20Center%20in%20Chennai%20%7C%20Omsritara!5e1!3m2!1sen!2sin!4v1751715820526!5m2!1sen!2sin"
                                loading="lazy"
                                allowFullScreen
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactUs;
