import TemplateLayout from "@layouts/templateLayout";
import Card from "components/card";
import Checkbox from "components/checkbox";
import ListItem from "components/listItem";
import { AnimateSharedLayout, motion } from "framer-motion";
import { useState } from "react";

const MotionCard = motion(Card);
const MotionListItem = motion(ListItem);

const getActiveColor = (index: number) => {
  switch (index % 4) {
    case 0:
      return "#ff0055";
    case 1:
      return "#0099ff";
    case 2:
      return "#22cc88";
    case 3:
      return "#ffaa00";
  }
};

const ListItemTemplatePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  return (
    <TemplateLayout>
      <div className="grid grid-flow-col gap-2">
        <div>
          <h4>Regular list</h4>
          <Card
            // card props
            className="w-96 h-96 overflow-y-auto"
          >
            {Array.from({ length: 10 }).map((item, index) => (
              <ListItem
                // list item props
                key={index}
                icon={"/images/logo.jpg"}
                title={`list item ${index + 1}`}
                subtitle={"this is a subtitle"}
                rightText={"100 likes"}
                topDivider={index > 0}
                onClick={() => console.log(`list item ${index + 1} clicked`)}
              />
            ))}
          </Card>
        </div>
        <div>
          <h4>Motion list</h4>
          <AnimateSharedLayout>
            <MotionCard
              // card props
              className="w-96 h-96 overflow-y-auto"
              // motion props
              variants={{
                hidden: {
                  opacity: 0,
                },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3,
                  },
                },
              }}
              initial="hidden"
              animate="show"
            >
              {Array.from({ length: 10 }).map((item, index) => (
                <MotionListItem
                  // list item props
                  key={index}
                  icon={"/images/logo.jpg"}
                  title={`list item ${index + 1}`}
                  subtitle={"this is a subtitle"}
                  rightText={"100 likes"}
                  topDivider={index > 0}
                  onClick={() => {
                    console.log(`list item ${index + 1} clicked`);
                    setSelectedIndex(index);
                  }}
                  active={selectedIndex === index}
                  activeColor={getActiveColor(index)}
                  // motion props
                  variants={{
                    hidden: { opacity: 0, translateX: -50 },
                    show: { opacity: 1, translateX: 0 },
                  }}
                />
              ))}
            </MotionCard>
          </AnimateSharedLayout>
        </div>
      </div>
    </TemplateLayout>
  );
};

export default ListItemTemplatePage;
