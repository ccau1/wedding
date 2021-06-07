import Layout from "@layouts/mainLayout";
import TemplateLayout from "@layouts/templateLayout";
import MainMenu from "@layouts/_menus/mainMenu";
import TemplateMenu from "@layouts/_menus/templateMenu";

const TemplatePage = () => {
  return (
    <TemplateLayout contentClassName={"flex flex-col justify-center"}>
      <p className="text-gray-400 text-center">
        Select a Template from the menu
      </p>
    </TemplateLayout>
  );
};

export default TemplatePage;
