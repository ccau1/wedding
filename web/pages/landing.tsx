import LandingLayout from "@layouts/landingLayout";
import Breadcrumbs from "components/breadcrumb";

const Home = () => {
  return (
    <LandingLayout>
      <img
        src="https://image.shutterstock.com/z/stock-photo-home-renovation-and-do-it-yourself-concept-with-home-construction-and-repair-tools-on-wooden-271173818.jpg"
        className={`w-full h-full -mt-24`}
      />
    </LandingLayout>
  );
};

export default Home;
