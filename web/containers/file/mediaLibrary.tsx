import Spacer from "components/spacer";
import { useEffect, useMemo, useRef, useState } from "react";
import MediaLibraryAdd from "./mediaLibraryAdd";
import MediaLibraryList from "./mediaLibraryList";
import MediaLibraryActions from "./mediaLibraryActions";
import { twCascade } from "@mariusmarais/tailwind-cascade";
import axios from "axios";
import MediaLibraryFileInfo from "./mediaLibraryFileInfo";

interface MediaLibraryProps {
  selected?: string | UploadedFile | Array<string | UploadedFile>;
  onSelect?: UploadedFile[];
  onSelectFile?: (file: UploadedFile, isSelected: boolean) => void;
  listView?: "grid" | "list";
  onListViewChange?: (listView: "grid" | "list") => void;
}

const MediaLibrary = ({
  selected,
  onSelectFile,
  listView = "list",
  onListViewChange,
}: MediaLibraryProps) => {
  const mediaLibraryListRef =
    useRef<React.ElementRef<typeof MediaLibraryList>>(null);
  const [selectedFileObjs, setSelectedFileObjs] = useState<UploadedFile[]>([]);

  const selectedFileIds = useMemo(() => {
    if (typeof selected === "string") return [selected];
    if (Array.isArray(selected)) {
      return selected.map((s) => (typeof s === "string" ? s : s._id));
    }
    return [(selected as UploadedFile)._id];
  }, [selected]);
  console.log("selectedFileIds.length", selectedFileIds.length);

  useEffect(() => {
    (async () => {
      let selectedItems = [];
      if (Array.isArray(selected)) {
        selectedItems.push(...selected);
      } else {
        selectedItems.push(selected);
      }
      const fileObjs = await Promise.all(
        selectedItems.map(async (selectedItem) => {
          if (typeof selectedItem === "string") {
            // get the file by fileId
            return (
              await axios.get(
                `${process.env.NEXT_PUBLIC_API_File}/files/${selectedItem}`
              )
            ).data;
          } else {
            return selectedItem;
          }
        })
      );
      setSelectedFileObjs(fileObjs);
    })();
  }, [selected]);

  return (
    <div className={twCascade("flex flex-row")}>
      <div className="flex-1">
        <MediaLibraryAdd
          onUploadedFile={(file) => mediaLibraryListRef.current.refetch()}
          rightRender={() => (
            <MediaLibraryActions
              selected={selected}
              listView={listView}
              onListViewChange={onListViewChange}
            />
          )}
        />
        <Spacer height={10} />
        <MediaLibraryList
          ref={mediaLibraryListRef}
          selected={selected}
          onSelectFile={onSelectFile}
          listView={listView}
        />
      </div>
      <div
        className={twCascade(
          "w-0 transition transition-all overflow-hidden",
          selectedFileIds.length && "w-80"
        )}
      >
        {selectedFileObjs.length > 0 && (
          <MediaLibraryFileInfo
            file={selectedFileObjs[selectedFileObjs.length - 1]}
          />
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
