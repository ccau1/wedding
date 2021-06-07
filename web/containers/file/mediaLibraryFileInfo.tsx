import Button from "components/button";
import Date from "components/date";
import Divider from "components/divider";
import { deleteFiles, downloadFiles, mediaIcon } from "./utils";

interface MediaLIbraryFileInfoProps {
  file: UploadedFile;
}

const MediaLibraryFileInfo = ({ file }: MediaLIbraryFileInfoProps) => {
  const isMediaFile = (file: UploadedFile) => /^(image)\//.test(file.mimeType);

  return (
    <div className="mx-2 flex flex-col items-center">
      {isMediaFile(file) ? (
        <img
          src={file.thumbnailUrl || file.url}
          className="object-contain h-36"
        />
      ) : (
        <div className="flex items-center justify-center w-36 h-36">
          {mediaIcon(file, "h-10 w-10")}
        </div>
      )}
      <p className="text-center">
        <strong>Type: </strong>
        {file.mimeType.split("/")[0]}
      </p>
      <p className="text-center">
        <strong>Last Modified: </strong>
        <Date dateString={file.updatedAt} />
      </p>
      <Divider />
      <p>
        <strong>Name: </strong>
        {file.name || file.originalFileName}
      </p>
      <Divider />
      <div className="flex justify-around w-full">
        <Button text="download" onClick={() => downloadFiles([file])} />
        <Button
          text="delete"
          className="bg-red-600"
          onClick={() => deleteFiles([file._id])}
        />
      </div>
    </div>
  );
};

export default MediaLibraryFileInfo;
