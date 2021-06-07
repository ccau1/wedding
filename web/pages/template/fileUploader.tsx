import TemplateLayout from "@layouts/templateLayout";
import React, { useEffect, useRef } from "react";
// import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";

const FileUploaderTemplatePage = () => {
  const myDropzone = useRef();
  useEffect(() => {
    // Dropzone class:
    (async () => {
      const Dropzone = (await import("dropzone")).default;
      Dropzone.autoDiscover = false;
      myDropzone.current = new Dropzone("#my-awesome-dropzone", {
        url: "/file/post",
      });
    })();
  }, []);

  return (
    <TemplateLayout>
      <form
        action="/file-upload"
        className="dropzone"
        id="my-awesome-dropzone"
        encType="multipart/form-data"
      ></form>
      <a
        href="https://www.dropzonejs.com/"
        className="block mt-2"
        target="_blank"
      >
        [ Documentation ]
      </a>
    </TemplateLayout>
  );
};

export default FileUploaderTemplatePage;

// ref: https://www.creative-tim.com/learning-lab/nextjs/dropzone/argon-dashboard
