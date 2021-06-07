import { twCascade } from "@mariusmarais/tailwind-cascade";
import axios from "axios";
import Divider from "components/divider";
import { useEffect, useMemo, useState } from "react";
import {
  MdDeleteSweep,
  MdCloudDownload,
  MdList,
  MdGridOn,
} from "react-icons/md";
import { deleteFiles, downloadFiles } from "./utils";

interface MediaLibraryActionsProps {
  selected?: string | UploadedFile | Array<string | UploadedFile>;
  listView?: "grid" | "list";
  onListViewChange?: (listView: "grid" | "list") => void;
}

const MediaLibraryActions = ({
  selected,
  listView,
  onListViewChange,
}: MediaLibraryActionsProps) => {
  const [selectedFileObjs, setSelectedFileObjs] = useState<UploadedFile[]>([]);

  // TODO: this will be heavy, should force props.selected only pass obj????
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

  const selectedFileIds = useMemo(() => {
    if (typeof selected === "string") return [selected];
    if (Array.isArray(selected)) {
      return selected.map((s) => (typeof s === "string" ? s : s._id));
    }
    return [(selected as UploadedFile)._id];
  }, [selected]);

  return (
    <div className="grid grid-flow-col gap-4 items-center">
      <MdGridOn
        className={twCascade(
          "h-6 w-6 cursor-pointer text-gray-500 transition-colors",
          listView === "grid" && "text-secondary-500"
        )}
        onClick={() => onListViewChange?.("grid")}
      />
      <MdList
        className={twCascade(
          "h-8 w-8 cursor-pointer text-gray-500 transition-colors",
          listView === "list" && "text-secondary-500"
        )}
        onClick={() => onListViewChange?.("list")}
      />
      <Divider vertical />
      <MdCloudDownload
        className={twCascade(
          "h-7 w-7 text-gray-200 transition-colors",
          selectedFileIds.length && "text-blue-600 cursor-pointer"
        )}
        onClick={() =>
          selectedFileObjs.length && downloadFiles(selectedFileObjs)
        }
      />
      <MdDeleteSweep
        className={twCascade(
          "h-7 w-7 text-gray-200 transition-colors",
          selectedFileIds.length && "text-red-600 cursor-pointer"
        )}
        onClick={() => deleteFiles(selectedFileIds)}
      />
    </div>
  );
};

export default MediaLibraryActions;
