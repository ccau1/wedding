import TemplateLayout from "@layouts/templateLayout";
import Button from "components/button";
import Tippy from "@tippyjs/react";

const TooltipTemplatePage = () => {
  return (
    <TemplateLayout>
      <Tippy
        // options
        content="Welcome to React"
        placement="bottom"
        trigger="click"
      >
        <Button className="mr-2" text="Click here to show popup" />
      </Tippy>
      <Tippy
        // options
        content="Welcome to React"
        placement="bottom"
        trigger="mouseenter"
      >
        <Button text="Hover to show popup" />
      </Tippy>
      <a
        href="https://github.com/atomiks/tippyjs-react"
        className="block mt-2"
        target="_blank"
      >
        [ Documentation ]
      </a>
    </TemplateLayout>
  );
};

export default TooltipTemplatePage;
