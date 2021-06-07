import { twCascade } from "@mariusmarais/tailwind-cascade";
import axios from "axios";
import { getAccessToken } from "lib/auth";
import { mutate } from "swr";

export const mediaIcon = (file: UploadedFile, className?: string) => {
  let Icon = require("react-icons/fc").FcFile;
  switch (file.mimeType?.toLowerCase().split("/")[0]) {
    case "image":
      Icon = require("react-icons/fc").FcImageFile;
      break;
    case "audio":
      Icon = require("react-icons/fc").FcAudioFile;
      break;
    case "video":
      Icon = require("react-icons/fc").FcVideoFile;
      break;
  }
  return <Icon className={twCascade("h-28 w-28", className)} />;
};

export const downloadFiles = (files: Array<string | UploadedFile>) => {
  files.map((f) => downloadFile(f));
};

export const downloadFile = (
  file: string | UploadedFile,
  filename?: string
) => {
  // download it as a file
  const a = document.createElement("a");
  // set url and filename
  if (typeof file === "string") {
    a.href = file;
    a.download = file.split("/").pop();
  } else {
    a.href = `${process.env.NEXT_PUBLIC_API_File}/files/${file._id}/stream`;
    a.download = file.name
      ? `${file.name}.${file.extension}`
      : file.url?.split("/").pop();
  }
  // if filename defined, override previous settings
  if (filename) a.download = filename;
  // trigger download
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

export const deleteFiles = async (selectedFileIds: string[]) => {
  if (!selectedFileIds.length) return;
  // set loading
  // call api to delete files by id
  await axios.delete(
    `${process.env.NEXT_PUBLIC_API_File}/files?${selectedFileIds
      .map((id) => `_ids[]=${id}`)
      .join("&")}`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  // clear loading
  // update display
  mutate(`${process.env.NEXT_PUBLIC_API_File}/files?me`);
};
