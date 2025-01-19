import React from "react";
import Image from "next/image";

import about1 from "../../public/Image/about us.jpg";
import about2 from '../../public/Image/about us 2.jpg';
import about3 from '../../public/Image/about us -3.jpg';

const AboutPage = () => {
  return (
    <section>
      <div className="container mx-auto px-3 py-8">
        <h1 className="text-xl md:text-4xl text-textHeadingColor font-semibold mb-4">
          About Us
        </h1>

        <div className="flex flex-col gap-8">
          {/* Section 1: Who we are */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xl font-medium text-textHeadingColor">
              Who we are?
            </h4>
            <Image
              src={about1}
              width={100}
              height={100}
              priority
              className="w-80 object-cover"
              alt="Who we are"
            />
            <p className="text-sm text-paraColor leading-7">
              The United Machinery Bangladesh (UMB) is a unique and trustworthy name in
              the machinery industry throughout Bangladesh. Founded in 2020, UMB provides
              a complete solution for material handling equipment, construction machines,
              and spare parts to customers nationwide.
            </p>
          </div>

          {/* Section 2: Our Vision */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xl font-medium text-textHeadingColor">
              Our Vision
            </h4>
            <Image
              src={about2}
              width={100}
              height={100}
              className="w-80 object-cover"
              alt="Our Vision"
              priority
            />
            <p className="text-sm text-paraColor leading-7">
              Our vision is to assist the industry by providing modern, innovative, and quality products,
              along with exceptional services, helping local sectors compete in the international market.
            </p>
          </div>

          {/* Section 3: Our Mission */}
          <div className="flex flex-col gap-4">
            <h4 className="text-xl font-medium text-textHeadingColor">
              Our Mission
            </h4>
            <Image
              src={about3}
              width={100}
              height={100}
              priority
              className="w-80 object-cover"
              alt="Our Mission"
            />
            <p className="text-sm text-paraColor leading-7">
              Our mission at United Machinery Bangladesh (UMB) is to exceed customer expectations in product
              quality, efficiency, and cost-effectiveness, with a highly trained team that ensures the successful
              completion of every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
