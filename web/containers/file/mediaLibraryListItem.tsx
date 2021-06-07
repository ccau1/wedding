import { twCascade } from "@mariusmarais/tailwind-cascade";
import Checkbox from "components/checkbox";
import { Menu } from "components/menu";
import { motion } from "framer-motion";
import { mediaIcon } from "./utils";
import { MdMoreVert } from "react-icons/md";

interface MediaLibraryListItemProps {
  file: UploadedFile;
  onSelectFile: (file: UploadedFile, isSelected: boolean) => void;
  selected?: boolean;
  onDeleteItem?: (file: UploadedFile) => void;
}

const MediaLibraryListItem = ({
  file,
  onSelectFile,
  selected,
  onDeleteItem,
}: MediaLibraryListItemProps) => {
  const isMediaFile = (file: UploadedFile) => /^(image)\//.test(file.mimeType);

  const mimeTypeParts = file.mimeType.split("/");

  return (
    <motion.div
      className={twCascade(
        "p-3 bg-white shadow-md border border-transparent grid grid-cols-3 items-center justify-between relative transition-shadow transition-colors duration-150 cursor-pointer"
        // selectedFileIds.includes(file._id) &&
        //   "bg-secondary-100 shadow-sm"
      )}
      onClick={() => onSelectFile?.(file, selected)}
      // motion props
      variants={{
        hidden: { opacity: 0, translateX: -50 },
        show: { opacity: 1, translateX: 0 },
      }}
    >
      <div className="flex flex-row items-center">
        <Checkbox inputClassName="border border-gray-300" checked={selected} />
        {isMediaFile(file) ? (
          <img
            src={file.thumbnailUrl || file.url}
            className="object-contain w-10 h-10"
          />
        ) : (
          <div className="flex items-center justify-center w-10 h-10">
            {mediaIcon(file, "h-10 w-10")}
          </div>
        )}

        <small className="mt-1 ml-2 z-10 overflow-ellipsis overflow-hidden whitespace-nowrap">
          {file.name || file.originalFileName}
        </small>
      </div>
      <div>
        {mimeTypeParts.length === 2 && (
          <small className="text-gray-500">
            <span className="text-gray-300">{mimeTypeParts[0]}/</span>
            {mimeTypeParts[1]}
          </small>
        )}
      </div>
      <div className="flex justify-end">
        <Menu>
          <Menu.Toggle>
            <MdMoreVert size={25} />
          </Menu.Toggle>
          <Menu.Content>
            {/* FIXME: menu item covers menu, need to be global */}
            <Menu.Item onClick={() => onDeleteItem?.(file)}>Delete</Menu.Item>
          </Menu.Content>
        </Menu>
      </div>
    </motion.div>
  );
};

export default MediaLibraryListItem;
