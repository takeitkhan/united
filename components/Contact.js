import React from "react";

// === icons ====
import { MdEmail } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import Link from "next/link";

const Contact = () => {
  return (
    <div className=" right-0 top-1/2 z-10 fixed">
      <div className="flex flex-col gap-4">
        <Link
          href="/contact"
          className="bg-bgYellow p-2 rounded-md text-center flex items-center justify-center cursor-pointer"
        >
          {" "}
          <MdEmail className="text-4xl" />
        </Link>
        {/* <span className="bg-navBg p-2 block rounded-md text-white cursor-pointer">
          <IoCallSharp className="text-4xl" />
        </span> */}
      </div>
    </div>
  );
};

export default Contact;
