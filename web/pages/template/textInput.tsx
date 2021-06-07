import TextInput from "components/textInput";
import { useState } from "react";
import TemplateLayout from "@layouts/templateLayout";

const TextInputTemplate = () => {
  const [value, setValue] = useState("");
  return (
    <TemplateLayout>
      <div>
        <TextInput
          name="testField"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </TemplateLayout>
  );
};

export default TextInputTemplate;
