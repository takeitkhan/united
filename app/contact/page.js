import React from "react";

import { FaLocationDot, FaPhoneFlip } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Contact = () => {
  return (
    <>
      <section className="contact_section py-20">
        <div className="container mx-auto px-3">
          <h2 className="text-3xl md:text-5xl font-semibold text-white">
            Contact
          </h2>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-3 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* <div className="p-10 shadow-md rounded-md flex flex-col gap-4 items-center justify-center">
            <FaLocationDot className="text-2xl md:text-5xl mx-auto text-textHoverColor" />
            <h2 className="text-2xl font-semibold text-textHeadingColor">
              Dhaka Office Address
            </h2>
            <p className=" text-sm text-paraColor text-justify">
              128/2, Kafiluddin Complex, Teknogpara (Next to Sagor-Saikat
              Convention Hall), Dhaka-Mymensingh Highway, Gazipur
            </p>
          </div>    */}
          <div className="p-10 shadow-md rounded-md flex flex-col gap-4 items-center justify-center">
            <FaLocationDot className="text-2xl md:text-5xl mx-auto text-textHoverColor" />
            <h2 className="text-2xl font-semibold text-textHeadingColor">
              Office Address
            </h2>
            <div>
              <span>Dhaka : </span>
              <span className=" text-sm text-paraColor text-justify">
                1/2 Proshanti Society Main Rd, Colonel Hat, Agborshah,
                Chittagong, Bangladesh.”
              </span>
            </div> 
            <div>
              <span>Chittagong : </span>
              <span className=" text-sm text-paraColor text-justify">
                1/2 Proshanti Society Main Rd, Colonel Hat, Agborshah,
                Chittagong, Bangladesh.”
              </span>
            </div>
          </div>

          <div className="p-10 shadow-md rounded-md flex flex-col gap-4 items-center justify-center">
            <MdEmail className="text-2xl md:text-5xl mx-auto text-textHoverColor" />
            <h2 className="text-2xl font-semibold text-textHeadingColor">
              Email
            </h2>
            <p className="text-sm text-paraColor text-justify">info@umbd.net</p>
          </div>
          <div className="p-10 shadow-md rounded-md flex flex-col gap-4 items-center justify-center">
            <FaPhoneFlip className="text-2xl md:text-5xl mx-auto text-textHoverColor" />
            <h2 className="text-2xl font-semibold text-textHeadingColor">
              Phone
            </h2>
            <p className="text-sm text-paraColor text-justify">01988 557711</p>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.0395072266806!2d90.38349364111916!3d24.003805092935732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755db87e4cc3539%3A0xf6567303cf004a8b!2sUnited%20Machinery%20Bangladesh!5e1!3m2!1sen!2sbd!4v1728399731565!5m2!1sen!2sbd"
            width="100%"
            height="450"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </>
  );
};

export default Contact;
