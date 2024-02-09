import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HomeSlider from "./HomeSlider"
import Featured from "./Featured"
import TopSeller from "./TopSeller"
import Subscribe from "@/components/Subscribe"
import ContactForm from "@/components/ContactForm"


const Home = () => {
  return (
    <div>
        <Header />
        <HomeSlider />
        <TopSeller />
        <Featured />
        <Subscribe />
        <ContactForm />
        <Footer />
    </div>
  )
}

export default Home