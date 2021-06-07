import TemplateLayout from "@layouts/templateLayout";
import Switch from "components/switch";
import { useState } from "react";

const SwitchTemplatePage = () => {
  const [toggleActive, setToggleActive] = useState(false);
  return (
    <TemplateLayout>
      <Switch
        text={"toggle me"}
        value={toggleActive}
        onChange={setToggleActive}
      />
    </TemplateLayout>
  );
};

export default SwitchTemplatePage;
