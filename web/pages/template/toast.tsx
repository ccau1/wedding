import TemplateLayout from "@layouts/templateLayout";
import Button from "components/button";
import { toast } from "react-toastify";

const ToastTemplatePage = () => {
  return (
    <TemplateLayout>
      <div className="grid grid-flow-col gap-2">
        <Button
          text={"show default toast"}
          onClick={() => toast("Wow! that was easy")}
        />
        <Button
          text={"show info toast"}
          onClick={() => toast.info("Wow! that was easy")}
        />
        <Button
          text={"show success toast"}
          onClick={() => toast.success("Wow! that was easy")}
        />
        <Button
          text={"show warn toast"}
          onClick={() => toast.warn("Wow! that was easy")}
        />
        <Button
          text={"show error toast"}
          onClick={() => toast.error("Wow! that was easy")}
        />
        <Button
          text={"show dark toast"}
          onClick={() => toast.dark("Wow! that was easy")}
        />
      </div>
      <a
        href="https://fkhadra.github.io/react-toastify/introduction/"
        className="block mt-2"
        target="_blank"
      >
        [ Documentation ]
      </a>
    </TemplateLayout>
  );
};

export default ToastTemplatePage;
