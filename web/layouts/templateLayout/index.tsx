import Layout from "@layouts/mainLayout";
import MainMenu from "@layouts/_menus/mainMenu";
import TemplateMenu from "@layouts/_menus/templateMenu";
import { twCascade } from "@mariusmarais/tailwind-cascade";
import Breadcrumbs from "components/breadcrumb";

interface TemplateLayoutProps {
  children?: React.ReactNode;
  templateFileNames?: string[];
  contentClassName?: string;
}

const TemplateLayout = ({
  children,
  contentClassName,
}: TemplateLayoutProps) => {
  return (
    <Layout
      leftBar={<TemplateMenu />}
      headerRight={<MainMenu />}
      contentHeader={<Breadcrumbs />}
      contentClassName={"flex flex-col"}
    >
      <div className={twCascade("flex-1", contentClassName)}>{children}</div>
    </Layout>
  );
};

export default TemplateLayout;
