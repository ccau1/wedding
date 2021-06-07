import TemplateLayout from "@layouts/templateLayout";
import Card from "components/card";
import Spacer from "components/spacer";
import { useEffect } from "react";
import introJs from "intro.js";
import "intro.js/introjs.css";

const IntroGuideTemplatePage = () => {
  useEffect(() => {
    introJs().start();
  }, []);

  return (
    <TemplateLayout>
      <div
        className="flex flex-row justify-around"
        data-title="This is our first one!"
        data-intro="Hello"
      >
        <Card
          data-title="This is our second one!"
          data-intro="second"
          title={"Design Tools"}
          text={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!"
          }
          image={"/images/stock-photo.jpeg"}
          actions={[
            {
              text: "View More",
              onClick: () => console.log("view more clicked"),
            },
            {
              text: "Delete",
              onClick: () => console.log("delete clicked"),
              className: "bg-red-500",
            },
          ]}
          className="w-80"
        />
        <Card
          data-title="This is our fourth one!"
          data-intro="fourth"
          title={"Design Tools"}
          text={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!"
          }
          image={"/images/stock-photo.jpeg"}
          actions={[
            {
              text: "View More",
              onClick: () => console.log("view more clicked"),
            },
            {
              text: "Delete",
              onClick: () => console.log("delete clicked"),
              className: "bg-red-500",
            },
          ]}
          className="w-80"
        />
      </div>
      <div className="flex justify-center">
        <Card
          data-title="This is our third one!"
          data-intro="third"
          data-step={3}
          title={"Design Tools"}
          text={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!"
          }
          image={"/images/stock-photo.jpeg"}
          actions={[
            {
              text: "View More",
              onClick: () => console.log("view more clicked"),
            },
            {
              text: "Delete",
              onClick: () => console.log("delete clicked"),
              className: "bg-red-500",
            },
          ]}
          className="w-80"
        />
      </div>
      <a
        href="https://introjs.com/docs/"
        className="block mt-2"
        target="_blank"
      >
        [ Documentation ]
      </a>
    </TemplateLayout>
  );
};

export default IntroGuideTemplatePage;
