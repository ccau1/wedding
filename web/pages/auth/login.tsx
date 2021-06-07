import React from "react";
import { GetServerSideProps } from "next";

const LoginPage = () => {
  return <div>login loading...</div>;
};

export default LoginPage;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const thisSiteDomain = process.env.NEXT_PUBLIC_SITE;
  return {
    redirect: {
      destination: `${
        process.env.NEXT_PUBLIC_SITE_ACCOUNT
      }/zh/auth/signIn?path=${thisSiteDomain}/auth/login-success-redirect?${
        ((req as any).__NEXT_INIT_QUERY as { [key: string]: string })?.redirect
          ? `redirect=${
              ((req as any).__NEXT_INIT_QUERY as { [key: string]: string })
                .redirect
            }`
          : ""
      }`,
      permanent: false,
    },
  };
};
