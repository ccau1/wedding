import { GetServerSidePropsResult } from "next";
import withSession, { HandlerContext } from "./withSession";

type HandlerWithCurrentUserContext = HandlerContext & {
  user: User;
  accessToken: string;
};

export default (
  handler: (
    context: HandlerWithCurrentUserContext
  ) => Promise<GetServerSidePropsResult<{}>>
) =>
  withSession<HandlerWithCurrentUserContext>(
    (ctx): Promise<GetServerSidePropsResult<{}>> => {
      return handler({
        ...ctx,
        user: ctx.req.session.get("user"),
        accessToken: ctx.req.session.get("accessToken"),
      } as HandlerWithCurrentUserContext);
    }
  ) as (
    ctx: HandlerWithCurrentUserContext
  ) => Promise<GetServerSidePropsResult<{}>>;
