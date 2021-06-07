import Layout from "../../layouts/mainLayout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import Date from "../../components/date";
import utilStyles from "../../styles/utils.module.scss";
import { GetStaticPaths, GetStaticProps } from "next";
import staticLocalePaths from "lib/staticLocalePaths";
import Breadcrumbs from "components/breadcrumb";
import MainMenu from "@layouts/_menus/mainMenu";

export default function Post({ postData }) {
  return (
    <Layout headerRight={<MainMenu />}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <Breadcrumbs />
      <article>
        <h1>post content</h1>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths = getAllPostIds();

  return {
    paths: [...paths, ...staticLocalePaths(paths, locales)],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id);

  return {
    props: {
      postData,
    },
  };
};
