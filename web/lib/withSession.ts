import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { IncomingMessage } from "http";
import { withIronSession, Session } from "next-iron-session";
import { NextApiRequestCookies } from "next/dist/next-server/server/api-utils";

export type HandlerContext = GetServerSidePropsContext & {
  req: IncomingMessage & {
    cookies: NextApiRequestCookies;
    session: Session;
    __NEXT_INIT_QUERY: { [key: string]: any };
  };
};

export default <T = HandlerContext>(
  handler: (ctx: T) => Promise<GetServerSidePropsResult<{}>>,
  cookieName: string = `next_session_${process.env.NEXT_PUBLIC_NAME}`
): ((ctx: T) => Promise<GetServerSidePropsResult<{}>>) =>
  withIronSession(handler, {
    cookieName,
    password: process.env.SESSION_PASSWORD,
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });
