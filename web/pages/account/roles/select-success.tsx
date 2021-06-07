import useCountdown from "@hooks/useCountdown";
import withSession from "lib/withSession";
import { useRouter } from "next/router";

const RoleSelectSuccessPage = ({ userRole }) => {
  const router = useRouter();
  const secondsLeft = useCountdown(5, () => {
    // hit zero, time to redirect
    router.push((router.query?.redirect as string) || "/");
  });
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h4>You're now acting as {userRole || "[ PENDING ]"}!</h4>
      <p>This will redirect in {secondsLeft} seconds...</p>
    </div>
  );
};

export default RoleSelectSuccessPage;

export const getServerSideProps = withSession(async ({ req }) => {
  return {
    props: {
      userRole: req.session.get("userRole"),
    },
  };
});
