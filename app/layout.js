import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MobileFooterNav from "@/components/MobileFooterNav";
import { getNavData } from "@/helpers/getNavbarData";
import { getMediaLinkByMetaName } from "@/helpers/metaHelpers";
import { BASE_URL } from "@/helpers/baseUrl";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "United Machinery",
  description: "A top industry equipment importer",
};

export default async function RootLayout({ children }) {
  const { settings } = await getNavData();

  const fav_icon = getMediaLinkByMetaName(settings, "site_faviconimg_id");

  // Construct the full URL for the favicon
  const fav_url = BASE_URL + fav_icon;

  return (
    <html lang="en">
      <head>
        {/* Use dynamic favicon link */}
        <link rel="icon" href={fav_url || "/image/United.png"} sizes="any" />
      </head>

      <body suppressHydrationWarning={true} className={poppins.className}>
        <Navbar />
        <div className="">
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
