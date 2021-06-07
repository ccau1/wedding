import { useEffect, useState } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const useFingerprint = () => {
  const [fingerprint, setFingerprint] = useState("");

  useEffect(() => {
    (async () => {
      const agent = await FingerprintJS.load();
      const result = await agent.get();
      setFingerprint(result.visitorId);
    })();
  }, []);

  return fingerprint;
};

export default useFingerprint;
