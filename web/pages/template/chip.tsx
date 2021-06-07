import TemplateLayout from "@layouts/templateLayout";
import Checkbox from "components/checkbox";
import Chip from "components/chip";

const ChipTemplatePage = () => {
  return (
    <TemplateLayout>
      <div className="flex flex-row justify-start flex-wrap">
        {Array.from({ length: 10 }).map((item, index) => (
          <Chip
            text={`Chip ${index + 1}`}
            enableClose
            onClick={() => console.log(`chip ${index + 1} clicked`)}
            onCloseClick={() => console.log(`chip ${index + 1} delete clicked`)}
            key={index}
          />
        ))}
      </div>
    </TemplateLayout>
  );
};

export default ChipTemplatePage;
