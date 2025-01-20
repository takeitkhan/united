import React from "react";

// === icons ====
import { MdEmail } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="right-0 top-1/2 z-10 fixed">
      <div className="flex flex-col gap-4">
        {/* Email icon */}
        <Link
          href="/contact"
          className="bg-bgYellow p-2 rounded-md text-center flex items-center justify-center cursor-pointer"
        >
          <MdEmail className="text-4xl" />
        </Link>
        {/* Phone icon with custom tooltip */}
        <div className="relative group">
          <a
            href="tel:+8801988557711" // Bangladeshi phone number
            className="bg-navBg p-2 block rounded-md text-white cursor-pointer"
          >
            <IoCallSharp className="text-4xl" />
          </a>
          {/* Tooltip positioned immediately to the left */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 hidden group-hover:flex items-center justify-center bg-black text-white text-sm rounded-md py-1 px-2">
            <span> 01988557711</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
