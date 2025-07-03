"use client";

import React, { useEffect, useState } from "react";
// === icons ====
import { MdEmail } from "react-icons/md";
import { IoCallSharp } from "react-icons/io5";
import { getMetaValueByMetaName } from "@/helpers/metaHelpers";
import axiosInstance from "@/helpers/axiosInstance";

const Contact = () => {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    axiosInstance
      .get("/frontend/settings")
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  const phone = getMetaValueByMetaName(settings, "company_phone") || "";
  const mail = getMetaValueByMetaName(settings, "company_email") || "";
  //  const phone="+8801988557711"
  // const mail = "info@umbd.net";

  return (
    <div className="right-0 top-1/2 z-10 fixed">
      <div className="flex flex-col gap-4">
        {/* Email icon */}
        <a
          href={`mailto:${mail}`}
          className="bg-bgYellow p-2 rounded-md text-center flex items-center justify-center cursor-pointer text-white"
        >
          <MdEmail className="text-4xl" />
        </a>
        {/* Phone icon with custom tooltip */}
        <div className="relative group">
          <a
            href={`tel:${phone}`} // Bangladeshi phone number
            className="bg-navBg p-2 block rounded-md text-white cursor-pointer"
          >
            <IoCallSharp className="text-4xl" />
          </a>
          {/* Tooltip positioned immediately to the left */}
          <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 hidden group-hover:flex items-center justify-center bg-black text-white text-sm rounded-md py-1 px-2">
            <span>{phone}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
