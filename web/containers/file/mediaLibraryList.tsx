import { twCascade } from "@mariusmarais/tailwind-cascade";
import axios from "axios";
import Checkbox from "components/checkbox";
import ApiErrorAlert from "components/project/apiErrorAlert";
import { motion } from "framer-motion";
import { getAccessToken } from "lib/auth";
import extractApiErrors from "lib/extractApiErrors";
import { forwardRef, useImperativeHandle, useMemo } from "react";
import useSWR, { mutate } from "swr";
import MediaLibraryGridItem from "./mediaLibraryGridItem";
import MediaLibraryListItem from "./mediaLibraryListItem";
import { deleteFiles } from "./utils";

interface MediaLibraryListProps {
  selected?: string | UploadedFile | Array<string | UploadedFile>;
  onSelectFile?: (file: UploadedFile, isSelected: boolean) => void;
  listView?: "grid" | "list";
}

interface MediaLibraryListRef {
  refetch: () => void;
}

const MediaLibraryList = forwardRef<MediaLibraryListRef, MediaLibraryListProps>(
  ({ selected, onSelectFile, listView }: MediaLibraryListProps, ref) => {
    const selectedFileIds = useMemo(() => {
      if (typeof selected === "string") return [selected];
      if (Array.isArray(selected)) {
        return selected.map((s) => (typeof s === "string" ? s : s._id));
      }
      return [(selected as UploadedFile)._id];
    }, [selected]);

    // define ref functions
    useImperativeHandle(
      ref,
      () => ({
        refetch: () => mutate(`${process.env.NEXT_PUBLIC_API_File}/files?me`),
      }),
      []
    );

    const accessToken = getAccessToken();
    const { data, error } = useSWR<PaginateResult<UploadedFile>>(
      accessToken && `${process.env.NEXT_PUBLIC_API_File}/files?me`,
      (url) =>
        axios
          .get(url, {
            headers: {
              ["Accept-Language"]: "en",
              ...(accessToken && {
                Authorization: `Bearer ${accessToken}`,
              }),
            },
          })
          .then((r) => r.data)
    );

    console.log("files", data, error);

    return (
      <div>
        <ApiErrorAlert errors={extractApiErrors(error)} />
        {data && (
          <motion.div
            className={twCascade(
              "grid gap-2",
              listView === "grid" &&
                "grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2"
            )}
            // motion props
            variants={{
              hidden: {
                opacity: 0,
              },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {(data?.docs || []).map((file) => {
              switch (listView) {
                case "grid":
                  return (
                    <MediaLibraryGridItem
                      key={file._id}
                      file={file}
                      onSelectFile={onSelectFile}
                      selected={selectedFileIds.includes(file._id)}
                    />
                  );
                case "list":
                default:
                  return (
                    <MediaLibraryListItem
                      key={file._id}
                      file={file}
                      onSelectFile={onSelectFile}
                      selected={selectedFileIds.includes(file._id)}
                      onDeleteItem={(file) => deleteFiles([file._id])}
                    />
                  );
              }
            })}
          </motion.div>
        )}
      </div>
    );
  }
);

export default MediaLibraryList;
