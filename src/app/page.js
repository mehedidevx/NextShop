import Image from "next/image";
import Navbar from "./component/navbar/Navbar";
import HeroSection from "./component/heroSection/heroSection";

import FeaturedProducts from "./component/featuredProducts/featuredProducts";
import WhyChooseUs from "./component/whyChooseUs/whyChooseUs";


export default function Home() {
  return (
   <div>
     <Navbar></Navbar>
     <HeroSection></HeroSection>
     <FeaturedProducts></FeaturedProducts>
     <WhyChooseUs></WhyChooseUs>
     
     
    
   </div>
  );
}
