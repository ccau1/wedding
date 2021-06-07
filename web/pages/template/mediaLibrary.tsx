import TemplateLayout from "@layouts/templateLayout";
import MediaLibrary from "containers/file/mediaLibrary";
import { useState } from "react";

const ChipTemplatePage = () => {
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [listView, setListView] = useState<"grid" | "list">("list");
  return (
    <TemplateLayout>
      <MediaLibrary
        selected={selectedFiles}
        onSelectFile={(file, isSelected) => {
          setSelectedFiles(
            isSelected
              ? selectedFiles.filter((s) => s !== file._id)
              : selectedFiles.concat([file._id])
          );
        }}
        listView={listView}
        onListViewChange={setListView}
      />
    </TemplateLayout>
  );
};

export default ChipTemplatePage;
