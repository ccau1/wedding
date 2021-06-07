import TemplateLayout from "@layouts/templateLayout";
import Button from "components/button";
import ModalHeader from "components/modal/modalHeader";
import ModalFooter from "components/modal/modalFooter";
import { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const ModalTemplatePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <TemplateLayout>
      <Button
        text="Open Modal"
        className="rounded-md"
        onClick={() => setIsOpen(true)}
      />
      <Modal
        isOpen={isOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalHeader title="Hello" onCloseClick={() => setIsOpen(false)} />
        <div>I am a modal</div>
        <ModalFooter
          actions={[
            {
              text: "submit",
              onClick: () => console.log("submit clicked"),
              autoFocus: true,
            },
            {
              text: "cancel",
              onClick: () => console.log("cancel clicked"),
              color: "red",
            },
          ]}
        />
      </Modal>
    </TemplateLayout>
  );
};

export default ModalTemplatePage;
