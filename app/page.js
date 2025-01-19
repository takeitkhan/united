import Aboutus from "@/components/Aboutus";
import Slider from "@/components/Slider";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import WorkWith from "@/components/WorkWith";
import Partners from "@/components/Partners";

export default function Home() {
  return (
    <>
      <Slider />
      <WorkWith />
      <Partners />
      <Services />
      <Products />
      <Aboutus />
      <Testimonials />
    </>
  );
}
