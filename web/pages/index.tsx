import useTheme from "@hooks/useTheme";
import Layout from "@layouts/mainLayout";
import MainMenu from "@layouts/_menus/mainMenu";
import Breadcrumbs from "components/breadcrumb";

const Home = () => {
  const theme = useTheme();
  return (
    <Layout
      headerRight={<MainMenu />}
      contentClassName="flex flex-col h-full"
      contentStyle={{
        background: "rgb(216, 220, 230)",
        boxShadow: "inset 0px 15px 178px rgba(0, 0, 0, 0.08)",
      }}
    >
      <Breadcrumbs />
      <div className="flex p-9 items-center justify-center">
        {/* <p className="text-gray-400">Empty Home page</p> */}
        <style jsx>
          {`
            .fancy-button {
              background-color: transparent;
              box-shadow: 15px 15px 28px rgba(0, 0, 0, 0.05),
                -10px -10px 28px rgba(255, 255, 255, 0.45),
                inset -10px -10px 50px rgba(65, 65, 92, 0.02),
                inset 30px 30px 50px rgba(255, 255, 255, 0.1);
              color: rgba(65, 65, 92, 0.7);
              transition: all 100ms;
              position: relative;
              overflow: hidden;
              transform: scale(1);
              border-radius: 50%;
              outline: none;
            }
            .fancy-button:active {
              box-shadow: 0px 0px 28px rgba(255, 255, 255, 0.03),
                0px 0px 28px rgba(255, 255, 255, 0.03),
                inset -10px -10px 50px rgba(255, 255, 255, 0.3),
                inset 30px 30px 50px rgba(65, 65, 92, 0.08);
              transform: scale(0.95);
            }
          `}
        </style>
        <button className="fancy-button px-14 py-20 bg-gray-100 text-4xl mt-96">
          Music
        </button>
        <button className="fancy-button px-14 py-20 bg-gray-100 text-4xl">
          Music
        </button>
        <button className="fancy-button px-10 py-16 bg-gray-100 text-4xl mt-52">
          Music
        </button>
        <button className="fancy-button px-14 py-20 bg-gray-100 text-4xl -mt-40">
          Music
        </button>
        <button className="fancy-button px-10 py-16 bg-gray-100 text-4xl mt-24">
          Music
        </button>
      </div>
    </Layout>
  );
};

export default Home;
