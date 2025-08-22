import Image from "next/image";
import Navbar from "./component/navbar/page";
import HeroSection from "./component/heroSection/page";

import FeaturedProducts from "./component/featuredProducts/page";
import WhyChooseUs from "./component/whyChooseUs/page";


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
