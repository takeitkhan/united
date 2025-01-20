"use client";

import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MobileFooterNav from "@/components/MobileFooterNav";
import { getNavData } from "@/helpers/getNavbarData";
import Head from "next/head";
import { getMediaLinkByMetaName } from "@/helpers/metaHelpers";
import { BASE_URL } from "@/helpers/baseUrl";
import { useEffect, useState } from "react";
import axiosInstance from "@/helpers/axiosInstance";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// export const metadata = {
//   title: "United Machinery",
//   description: "A top industry equipment importer",
// };

export default function RootLayout({ children }) {
  const [settings, setSettings] = useState(null);
  // Fetch settings and menu items dynamically
  useEffect(() => {
    const fetchData = async () => {
      try {
        const settingsRes = await axiosInstance.get("/frontend/settings");
        setSettings(settingsRes.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // const { settings } = await getNavData();
  console.log("from layout new", settings);

  const fav_icon = getMediaLinkByMetaName(settings, "site_faviconimg_id");
  const fav_url = BASE_URL + fav_icon;

  return (
    <html lang="en">
      <head>
        {/* Use dynamic favicon link */}
        <link rel="icon" href={fav_url || "/image/United.png"} sizes="any" />
      </head>

      <body suppressHydrationWarning={true} className={poppins.className}>
        <Navbar />
        <div className="hidden sm:flex">
          <Contact />
        </div>
        {children}
        <Footer />
        <MobileFooterNav />
        <ToastContainer position="bottom-left" />
      </body>
    </html>
  );
}
