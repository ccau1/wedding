import { useEffect } from "react";
import useFingerprint from "@hooks/useFingerprint";
import { useDispatch } from "react-redux";
import { deviceActions } from "redux/device";
import { deviceDetect, OsTypes, osName, osVersion } from "react-device-detect";
import axios from "axios";
import { getAccessToken } from "lib/auth";

const DeviceManager = () => {
  const fingerprint = useFingerprint();
  const dispatch = useDispatch();

  const setOnline = async () => {
    console.log("deviceDetect()", deviceDetect());

    const onlineState = {
      fingerprint,
      user: null,
      deviceType: "web",
      deviceOS: osName,
      deviceName: osName,
      deviceVersion: osVersion,
      isOnline: true,
      lastOnTime: new Date(),
    };
    const accessToken = getAccessToken();
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_DEVICE}/devices/by-fingerprint`,
      onlineState,
      {
        headers: {
          ...(accessToken && {
            Authorization: `Bearer ${getAccessToken()}`,
          }),
        },
      }
    );
    dispatch(deviceActions.setDevice(onlineState));
  };

  const setOffline = async () => {
    const offlineState = {
      fingerprint,
      isOnline: false,
      lastOnTime: new Date(),
    };
    const accessToken = getAccessToken();
    await axios.put(
      `${process.env.NEXT_PUBLIC_API_DEVICE}/devices/by-fingerprint`,
      offlineState,
      {
        headers: {
          ...(accessToken && {
            Authorization: `Bearer ${getAccessToken()}`,
          }),
        },
      }
    );
    dispatch(deviceActions.setDevice(offlineState));
  };

  useEffect(() => {
    // ensure fingerprint is fetched first
    if (!fingerprint) return;
    // on load, set online to true
    setOnline();
    // update store
    dispatch(deviceActions.setDevice());
    // handle window close, trigger setOffline
    window.addEventListener("beforeunload", setOffline);
    return () => {
      // offline handled by unmount, so can remove window listener for close
      window.removeEventListener("beforeunload", setOffline);
      // on unmount, set online to false
      setOffline();
    };
  }, [fingerprint]);
  return null;
};

export default DeviceManager;
