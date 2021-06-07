import withSession from "lib/withSession";
import axios from "axios";
import nookies, { destroyCookie } from "nookies";

const LogoutPage = () => {
  return <div>logging out user...</div>;
};

export default LogoutPage;

export const getServerSideProps = withSession(async (ctx) => {
  const { res, req } = ctx;
  // ensure this is not cached

  res.setHeader("cache-control", "no-store, max-age=0");
  // get user token

  const { accessToken } = nookies.get(ctx);
  // const accessToken = req.session.get("accessToken");
  // call api to logout

  try {
    const logoutRes = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ACCOUNT}/api/users/signOut`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  } catch (err) {
    console.log("err", err);

    if (err.request.res.statusCode === 403) {
      // if already unauthenticated, still continue logout
    } else {
      throw new Error(err);
    }
  }
  destroyCookie(ctx, "accessToken", { path: "/" });
  destroyCookie(ctx, "user", { path: "/" });
  // // TODO: should remove all? or we keeping some for browser tracking?
  // req.session.destroy();
  return {
    redirect: {
      destination: `/auth/logout-success`,
      permanent: false,
    },
  };
});
