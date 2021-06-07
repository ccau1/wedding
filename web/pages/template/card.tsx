import Card from "components/card";
import TemplateLayout from "@layouts/templateLayout";

const CardTemplate = () => {
  return (
    <TemplateLayout>
      <div>
        <Card
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
        />
      </div>
    </TemplateLayout>
  );
};

export default CardTemplate;
