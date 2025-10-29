import Hero from "../components/Hero";
import ServicesPreview from "../components/ServicesPreview";
import Values from "../components/Values";
import Steps from "../components/Steps";
import ProjectsSlider from "../components/ProjectsSlider";
import Team from "../components/Team";
import SuccessPartners from "../components/SuccessPartners";
import Contact from "../components/Contact";
export default function Home() {
  return (
    <div>
      <Hero />
      <ServicesPreview />
      <Steps />
      <Values />
      <ProjectsSlider />
      <Team />
      <SuccessPartners />
      <Contact />
    </div>
  );
}
