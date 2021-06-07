import axios, { CancelTokenSource } from "axios";
import Button from "components/button";
import { getAccessToken } from "lib/auth";
import { useMemo, useRef, useState } from "react";
import useSWR, { mutate } from "swr";
import { IoCloseOutline } from "react-icons/io5";
import { FcFile } from "react-icons/fc";
import { AnimatePresence, motion } from "framer-motion";
import { ObjectID } from "bson";
import { twCascade } from "@mariusmarais/tailwind-cascade";

interface MediaLibraryAddProps {
  onUploadedFile?: (file: UploadedFile) => void;
  rightRender?: React.FunctionComponent;
}

interface UploadingFile {
  _id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "failed" | "aborted";
  cancelTokenSource?: CancelTokenSource;
}

const MediaLibraryAdd = ({
  onUploadedFile,
  rightRender,
}: MediaLibraryAddProps) => {
  const uploadingFiles = useRef<UploadingFile[]>([]);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const [_updatedAt, forceUpdate] = useState(new Date().valueOf());

  const uploadFiles = (files: FileList) => {
    console.log("selected files", files);
    const newUploadingFiles: UploadingFile[] = Array.from({
      length: files.length,
    }).map((_, i) => ({
      _id: new ObjectID().toHexString(),
      file: files.item(i),
      progress: 0,
      status: "uploading",
    }));

    uploadingFiles.current.push(...newUploadingFiles);
    forceUpdate(new Date().valueOf());

    const accessToken = getAccessToken();
    console.log("accessToken", accessToken);

    newUploadingFiles.forEach((fileToUpload) => {
      const formData = new FormData();
      formData.append("file", fileToUpload.file);
      formData.append("qualities", JSON.stringify([0.5]));
      fileToUpload.cancelTokenSource = axios.CancelToken.source();
      axios
        .post(`${process.env.NEXT_PUBLIC_API_File}/files`, formData, {
          data: formData,
          headers: {
            ["Accept-Language"]: "en",
            Authorization: `Bearer ${accessToken}`,
          },
          cancelToken: fileToUpload.cancelTokenSource.token,
          onUploadProgress: (progressEvent) => {
            // get total count in bits
            const totalLength = progressEvent.lengthComputable
              ? progressEvent.total
              : progressEvent.target.getResponseHeader("content-length") ||
                progressEvent.target.getResponseHeader(
                  "x-decompressed-content-length"
                );
            console.log("onUploadProgress", progressEvent, totalLength);
            // if can calculate total bits, update progress
            if (totalLength !== null) {
              // get progress 0-1
              fileToUpload.progress = Math.round(
                (progressEvent.loaded * 100) / totalLength
              );
              // force update to display change
              forceUpdate(new Date().valueOf());
            }
          },
        })
        .then((fileRes) => {
          console.log("upload complete", fileRes);

          const file = fileRes.data as UploadedFile;
          // set file upload status to complete
          fileToUpload.status = "completed";
          fileToUpload.progress = 1;
          // force update for above status change
          forceUpdate(new Date().valueOf());
          // wait 2 secs and remove it
          setTimeout(() => {
            uploadingFiles.current = uploadingFiles.current.filter(
              (f) => f._id !== fileToUpload._id
            );
            forceUpdate(new Date().valueOf());
          }, 2000);
          // trigger list to re-fetch
          mutate(`${process.env.NEXT_PUBLIC_API_File}/files?me`);
          // update parent on file uploaded
          onUploadedFile?.(file);
        })
        .catch((err) => {
          console.log("upload err", err);

          // update status
          fileToUpload.progress = 0;
          fileToUpload.status = "failed";
          forceUpdate(new Date().valueOf());
        });
    });
  };

  const cancelUploadingFile = (uploadingFile: UploadingFile) => {
    // cancel the request
    uploadingFile.cancelTokenSource.cancel();
    // update status
    uploadingFile.progress = 0;
    uploadingFile.status = "aborted";
    forceUpdate(new Date().valueOf());
  };

  const displayFileName = (name: string, maxLength = 30) => {
    // if name is no longer than maxLength, it is okay
    if (name.length <= maxLength) return name;
    // take 15 from the start
    const startStr = name.slice(0, Math.round(maxLength * 0.6));
    const endStr = name.slice(-1 * Math.round(maxLength * 0.3));
    return startStr + " ... " + endStr;
  };

  return (
    <div>
      <div className="flex flex-row justify-between">
        <Button
          text="Add new media item"
          onClick={() => fileUploadRef.current.click()}
          className="outline-none"
        />
        {rightRender?.({})}
      </div>
      <input
        ref={fileUploadRef}
        type="file"
        className="hidden"
        onChange={(e) => uploadFiles(e.target.files)}
        multiple
      />
      <div className="mt-2">
        <AnimatePresence>
          {uploadingFiles.current.map((uploadingFile, uploadingFileIndex) => (
            <motion.div
              key={uploadingFile._id}
              className="flex flex-row py-3 px-2 items-center hover:bg-gray-100 rounded-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FcFile size={30} className="mr-2" />
              <p>
                {displayFileName(uploadingFile.file.name)} (
                {uploadingFile.file.size})
              </p>
              <div className="flex-1 h-2 rounded-lg bg-gray-200 mx-2">
                <div
                  style={{ width: `${uploadingFile.progress * 100}%` }}
                  className={twCascade(
                    "h-full rounded-lg",
                    uploadingFile.status === "completed"
                      ? "bg-green-500"
                      : uploadingFile.status === "failed"
                      ? "bg-red-500"
                      : "bg-primary-500"
                  )}
                />
              </div>
              {uploadingFile.status === "uploading" && (
                <a
                  onClick={() => cancelUploadingFile(uploadingFile)}
                  className="p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                >
                  <IoCloseOutline size={20} />
                </a>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MediaLibraryAdd;
