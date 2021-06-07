import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/dist/client/router";
import useCountdown from "@hooks/useCountdown";
import { getCurrentUser } from "lib/auth";

const LoginSuccessPage = () => {
  const user = getCurrentUser();
  const router = useRouter();
  const secondsLeft = useCountdown(5, () => {
    // hit zero, time to redirect
    router.push((router.query?.redirect as string) || "/");
  });

  return (
    <div>
      <h1>Welcome back, {user?.username || "[N/A]"}!</h1>
      <p>This will redirect in {secondsLeft} seconds...</p>
    </div>
  );
};

export default LoginSuccessPage;
