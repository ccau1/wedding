import TemplateLayout from "@layouts/templateLayout";
import Logger from "lib/logger";
import { useEffect } from "react";

const LoggerTemplatePage = () => {
  useEffect(() => {
    const logger = new Logger({ context: "Logger", subContext: "Example" });
    logger.log("This is a log");
    logger.warn("This is a warn");
    logger.error("This is a error");
    logger.info("This is a info");
    logger.success("This is a success");
    logger.log("Context Override", { context: "Override" });
    logger.log("subContext Override", { subContext: "Override" });
  }, []);
  return (
    <TemplateLayout>
      <p className="text-gray-500">[ View console log for sample ]</p>
    </TemplateLayout>
  );
};

export default LoggerTemplatePage;
