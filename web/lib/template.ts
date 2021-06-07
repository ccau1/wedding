import fs from "fs";
import path from "path";

const templatePageDirectory = path.join(process.cwd(), "pages/template");

export const getTemplateFileNames = () => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(templatePageDirectory);
  return fileNames;
};
