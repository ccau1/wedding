import TemplateLayout from "@layouts/templateLayout";
import RadioButton from "components/radioButton";
import { useState } from "react";

const RadioButtonTemplatePage = () => {
  const [radioValue, setRadioValue] = useState("personal");
  return (
    <TemplateLayout>
      <RadioButton
        name={"accountType"}
        value={"personal"}
        checkedValue={radioValue}
        onChange={setRadioValue}
        text={"Personal"}
      />
      <RadioButton
        name={"accountType"}
        value={"business"}
        checkedValue={radioValue}
        onChange={setRadioValue}
        text={"Business"}
      />
    </TemplateLayout>
  );
};

export default RadioButtonTemplatePage;
