import Header from "@/components/Header";
import HomeSlider from "./_components/HomeSlider";
import TopSeller from "./_components/TopSeller";
import Featured from "./_components/Featured";
import Subscribe from "@/components/Subscribe";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { getCategoryOne } from "@/api/getCategories";


export default function Page() {
  const categoryOne = getCategoryOne();


  return (
   <>
      <Header />
      <HomeSlider />
      <TopSeller categoryOne={categoryOne} />
      <Featured />
      <Subscribe />
      <ContactForm />
      <Footer />
   </>
  )
}
