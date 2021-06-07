import { IoCloseOutline } from "react-icons/io5";

interface ModalHeaderProps {
  title?: string;
  showClose?: boolean;
  onCloseClick?: () => void;
}

const ModalHeader = ({
  title,
  showClose = true,
  onCloseClick,
}: ModalHeaderProps) => {
  return (
    <div className="flex flex-row justify-between -mx-4 -mt-4 p-2 border-b border-gray-200 mb-4">
      <h6 className="flex-1">{title}</h6>
      <div className="flex flex-row items-center">
        {showClose && onCloseClick && (
          <a
            onClick={onCloseClick}
            className="p-2 cursor-pointer hover:bg-gray-100 rounded-md"
          >
            <IoCloseOutline size={20} />
          </a>
        )}
      </div>
    </div>
  );
};

export default ModalHeader;
