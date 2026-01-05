import "@/styles/globals.css";
import "../styles/fonts.css";
import { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ProductsProvider } from "@/context/ProductsContext";
import { VendorProvider } from "@/context/VendorContext";
import { UserProvider } from "@/context/UserContext";
import { CartItemProvider } from "@/context/CartItemContext";
import { CategoriesProvider } from "@/context/CategoriesContext";
import { PolicyProvider } from "@/context/PolicyContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import { WishListProvider } from "@/context/WishListContext";
import { IntentionProvider } from "@/context/IntentionsContext";
import { Toaster } from "react-hot-toast";
import 'quill/dist/quill.snow.css';
import { ReviewItemProvider } from "@/context/ReviewsUserContext";
import { ReviewProductsProvider } from "@/context/ReviewsContext";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <>
            {/* ✅ SEO and Favicon */}
            <Head>
                {/* <title>Buy Healing Crystals Online in India - Omsritara</title>
                <meta
                    name="description"
                    content="Shop healing crystals, Reiki crystal products & raw stones online in India. Omsritara – your trusted healing crystals shop online."
                /> 
                
                */}
                <link rel="icon" href="/favicon.ico" />
                <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
                <meta
                    name="google-site-verification"
                    content="Xz1YaaLs5InPzC2s0xVI4jx05V0RE-jVCXceaqJePtg"
                />
                {/* Google Tag Manager */}
                <script
                    async
                    src="https://www.googletagmanager.com/gtag/js?id=G-QR65DT0BZL"
                ></script>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-QR65DT0BZL');
            `,
                    }}
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "tvjlv787ac");
            `,
                    }}
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '834668306404616');
      fbq('track', 'PageView');
    `,
                    }}
                />

                <script
                    dangerouslySetInnerHTML={{
                        __html: `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-M9PT8ZN8');
` }}
                />


            </Head>

            {/* Google Tag Manager (noscript) */}
            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-M9PT8ZN8"
                    height="0"
                    width="0"
                    style={{ display: "none", visibility: "hidden" }}
                ></iframe>
            </noscript>
            {/* End Google Tag Manager (noscript) */}

            {/* Context Providers */}
            <QueryClientProvider client={queryClient}>
                <VendorProvider>
                    <WishListProvider>
                        <ProductsProvider>
                            <UserProvider>
                                <CartItemProvider>
                                    <CategoriesProvider>
                                        <IntentionProvider>
                                            <CurrencyProvider>
                                                <PolicyProvider>
                                                    <ReviewItemProvider>
                                                        <ReviewProductsProvider>
                                                            <Layout>
                                                                <Toaster position="top-right" reverseOrder={false} />
                                                                <Component {...pageProps} />
                                                            </Layout>
                                                        </ReviewProductsProvider>
                                                    </ReviewItemProvider>
                                                </PolicyProvider>
                                            </CurrencyProvider>
                                        </IntentionProvider>
                                    </CategoriesProvider>
                                </CartItemProvider>
                            </UserProvider>
                        </ProductsProvider>
                    </WishListProvider>
                </VendorProvider>
            </QueryClientProvider>
        </>
    );
}
