import Header from "@/components/Header";
import HomeSlider from "./_components/HomeSlider";
import TopSeller from "./_components/TopSeller";
import Featured from "./_components/Featured";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { getTopSellingProducts } from "@/api/getCategories";




export default function Page() {
  const topSelling = getTopSellingProducts();


  return (
   <>
      <Header />
      <HomeSlider />
      <TopSeller topSelling={topSelling} />
      <Featured />
      <ContactForm />
      <Footer />
   </>
  )
}
