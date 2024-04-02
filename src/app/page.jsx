import Header from "@/components/Header";
import HomeSlider from "./_components/HomeSlider";
import TopSeller from "./_components/TopSeller";
import Featured from "./_components/Featured";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { getTopSellingProducts } from "@/api/getCategories";
import getAppInfo from "@/api/getAppInfo";




export default function Page() {
  const topSelling = getTopSellingProducts();
  const appInfo = getAppInfo();


  return (
   <>
      <Header />
      <HomeSlider appInfo={appInfo} />
      <TopSeller topSelling={topSelling} />
      <Featured />
      <ContactForm />
      <Footer />
   </>
  )
}
