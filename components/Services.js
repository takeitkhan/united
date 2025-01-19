"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import axiosInstance from "@/helpers/axiosInstance";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    //fetch services
    const fetchServices = async () => {
      try {
        const res = await axiosInstance.get("/posts?term_type=services");
        setServices(res.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="">
      <div className=" px-3 bg-sectionBg py-5">
        <div className="container mx-auto">
          <div>
            <h2 className="text-center md:text-3xl text-xl font-semibold text-textHeadingColor">
              Our Services
            </h2>
            <p className="text-center text-textNavColor font-semibold text-sm mt-3">
              Our service covers the below segments as shown below -
            </p>
          </div>

          <div className="md:grid md:grid-cols-4 grid-cols-2 grid gap-3 mt-5 w-full flex-1">
            {services.map((service, serviceIndex) => (
              <Link
                key={serviceIndex}
                href={`/services/${service.slug}`}
                className="bg-white p-2 py-4 rounded-md text-center hover:shadow-md duration-200 ease-in-out w-full border-b-2 hover:border-hoverborder inline-block"
              >
                <Image
                  src={service?.featured_image}
                  width={330}
                  height={330}
                  className="mx-auto"
                  alt={service.name}
                  priority
                ></Image>
                <h2 className="text-base md:text-lg font-semibold mt-2"> {service.name} </h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
