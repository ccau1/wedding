/**
 * USAGE: when SSO redirect back to our site, we determine whether:
 *  - user selects their role
 *  - continue to success
 *  - other initial login settings user needs to handle
 */

import withSession from "lib/withSession";
import axios from "axios";
import { useRouter } from "next/router";
import { getCurrentUser } from "lib/auth";
import nookies from "nookies";

const LoginSuccessRedirectPage = () => {
  const user = getCurrentUser();
  const router = useRouter();
  const redirect = router.query?.redirect;

  if (process.browser) {
    // based on user's role count, we'll redirect accordingly
    switch ((user.roles || []).length) {
      case 0:
        // user has no roles, let user select role to join
        router.push(
          `/account/roles/select${redirect && `?redirect=${redirect}`}`
        );
        break;
      case 1:
        // user only has one role, set this as user's selected role
        router.push(
          `/auth/login-success${redirect && `?redirect=${redirect}`}`
        );
        break;
      default:
        // user has multiple roles, let user choose
        router.push(
          `/account/roles/select${redirect && `?redirect=${redirect}`}`
        );
        break;
    }
  }

  return null;
};

export default LoginSuccessRedirectPage;

export const getServerSideProps = withSession(async (ctx) => {
  const { req, res } = ctx;
  const redirect = req.__NEXT_INIT_QUERY.redirect;
  // handle storing token & user session here
  // access_token
  const accessToken = req.__NEXT_INIT_QUERY.token?.replace(/\/zh$/, "");
  // if token not found, throw error
  if (!accessToken) {
    throw new Error("accessToken not found");
  }

  // set accessToken expires in
  const ONE_HOUR = 1000 * 60 * 60;
  const ONE_DAY = ONE_HOUR * 24;
  const ONE_MONTH = ONE_DAY * 30;
  const expires = new Date(new Date().valueOf() + ONE_MONTH * 6);

  // get user from token
  const user = (
    await axios.get(`${process.env.NEXT_PUBLIC_API_ACCOUNT}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  ).data.payload;

  // set cookie in response
  nookies.set(ctx, "accessToken", accessToken, {
    sameSite: "strict",
    secure: true,
    expires,
    path: "/",
  });
  nookies.set(ctx, "user", JSON.stringify(user), {
    sameSite: "strict",
    secure: true,
    expires,
    path: "/",
  });

  return { props: {} };
});
