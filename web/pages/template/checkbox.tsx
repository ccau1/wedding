import TemplateLayout from "@layouts/templateLayout";
import Checkbox from "components/checkbox";

const CheckboxTemplatePage = () => {
  return (
    <TemplateLayout>
      <Checkbox className="mr-2" text={"checkbox 1"} />
      <Checkbox className="mr-2" text={"checkbox 2 (controlled)"} checked />
      <Checkbox className="mr-2" text={"checkbox 3"} />
      <Checkbox className="mr-2" text={"checkbox 4"} />
    </TemplateLayout>
  );
};

export default CheckboxTemplatePage;
