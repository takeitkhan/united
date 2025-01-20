import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import MobileFooterNav from "@/components/MobileFooterNav";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "United Machinery",
  description: "A top industry equipment importer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
