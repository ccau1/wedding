import { twCascade } from "@mariusmarais/tailwind-cascade";
import Checkbox from "components/checkbox";
import { motion } from "framer-motion";
import { mediaIcon } from "./utils";

interface MediaLibraryGridItemProps {
  file: UploadedFile;
  onSelectFile: (file: UploadedFile, isSelected: boolean) => void;
  selected?: boolean;
}

const MediaLibraryGridItem = ({
  file,
  onSelectFile,
  selected,
}: MediaLibraryGridItemProps) => {
  const isMediaFile = (file: UploadedFile) => /^(image)\//.test(file.mimeType);

  return (
    <motion.div
      className={twCascade(
        "p-3 bg-white shadow-md border border-transparent flex flex-col h-60 relative transition-shadow transition-colors duration-150 cursor-pointer"
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
      <Checkbox
        lg
        className="absolute top-2 left-2"
        inputClassName="border border-gray-300"
        checked={selected}
        onChange={() => onSelectFile?.(file, selected)}
      />
      {isMediaFile(file) ? (
        <img
          src={file.thumbnailUrl || file.url}
          className="flex-1 object-contain"
        />
      ) : (
        <div className="flex-1 flex items-center justify-center">
          {mediaIcon(file)}
        </div>
      )}

      <small className="mt-1 z-10 overflow-ellipsis overflow-hidden whitespace-nowrap">
        {file.name || file.originalFileName}
      </small>
    </motion.div>
  );
};

export default MediaLibraryGridItem;
