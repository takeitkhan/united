"use client";

import Link from "next/link";
import {
  Home,
  MessageSquare,
  Phone,
  FileText,
  Mail,
  HandPlatter,
  NotebookTabs,
} from "lucide-react";

export default function MobileFooterNav() {
  const phoneNumber = "+8801988557711"; // Replace with your actual phone number

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-50 sm:hidden">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link href="/" className="flex flex-col items-center gap-1">
          <Home className="w-5 h-5" />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/products" className="flex flex-col items-center gap-1">
          <NotebookTabs className="w-5 h-5" />
          {/* <MessageSquare className="w-5 h-5" /> */}
          <span className="text-xs">Products</span>
        </Link>

        <Link
          href={`tel:${phoneNumber}`}
          className="flex flex-col items-center gap-1"
        >
          <div className="bg-navBg rounded-full p-3 -mt-6">
            <Phone className="w-5 h-5 text-white" />
          </div>
          <span className="text-xs mt-1">Call</span>
        </Link>

        <Link href="/about-us" className="flex flex-col items-center gap-1">
          <FileText className="w-5 h-5" />
          <span className="text-xs">About</span>
        </Link>

        <Link href="/contact" className="flex flex-col items-center gap-1">
          <Mail className="w-5 h-5" />
          <span className="text-xs">Contact</span>
        </Link>
      </div>
    </nav>
  );
}
