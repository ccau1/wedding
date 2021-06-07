import useCountdown from "@hooks/useCountdown";
import { useRouter } from "next/router";

const LogoutSuccessPage = () => {
  const router = useRouter();
  const secondsLeft = useCountdown(5, () => {
    // hit zero, time to redirect
    router.push((router.query?.redirect as string) || "/");
  });
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1>You've logged out!</h1>
      <p>This will redirect in {secondsLeft} seconds...</p>
    </div>
  );
};

export default LogoutSuccessPage;
