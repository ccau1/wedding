import Head from "next/head";
import Layout, { siteTitle } from "layouts/mainLayout";
import utilStyles from "styles/utils.module.scss";
import { getSortedPostsData } from "lib/posts";
import Link from "next/link";
import Date from "components/date";
import { GetStaticProps } from "next";
import Section from "components/section";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import MainMenu from "@layouts/_menus/mainMenu";

const PostPage = ({ allPostsData }) => {
  const { t } = useTranslation("page");

  return (
    <Layout headerRight={<MainMenu />}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Section className={`${utilStyles.headingMd} bg-red-500`}>
        <p>{t("index.msg_welcome_to_our_site")}</p>
      </Section>
      <Section>
        <h2>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a className="hover:text-primary-500">{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </Section>
    </Layout>
  );
};

export default PostPage;

export const getStaticProps: GetStaticProps = async ({ locale }, ...a) => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
      ...(await serverSideTranslations(locale, ["page"])),
    },
  };
};
