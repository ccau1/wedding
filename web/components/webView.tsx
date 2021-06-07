import React, { useRef, useEffect } from "react";

export interface WebViewNativeEvent {
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: number;
}

export interface WebViewMessageEvent extends WebViewNativeEvent {
  data: any;
  url: string;
  loading: boolean;
  title: string;
  canGoBack: boolean;
  canGoForward: boolean;
  lockIdentifier: number;
  nativeEvent: {
    data: any;
    url: string;
  };
}

// ALERT: this is just a temp to handle mobile and web.
export interface WebViewNavigation extends WebViewNativeEvent {
  navigationType:
    | "click"
    | "formsubmit"
    | "backforward"
    | "reload"
    | "formresubmit"
    | "other";
  mainDocumentURL?: string;
}

interface WebViewProps {
  style?: React.CSSProperties;
  source: { uri: string };
  onNavigationStateChange?: (navigationState: WebViewNavigation) => void;
  onMessage?: (ev: WebViewMessageEvent) => void;
}

const WebView = ({
  style,
  source,
  onMessage,
  onNavigationStateChange,
}: WebViewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // const onIframeLoad = function () {
  //   try {
  //     const location = iframeRef.current?.contentWindow?.location;
  //     console.log("onIframeLoad location", location);

  //     onNavigationStateChange?.({
  //       url: location?.href || "",
  //       navigationType: "other",
  //       loading: false,
  //       title: "",
  //       canGoBack: false,
  //       canGoForward: false,
  //       lockIdentifier: 0,
  //     });
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // };

  useEffect(() => {
    const onIframeMessage = (event: MessageEvent) => {
      let { origin, data } = event;

      const message = {
        nativeEvent: {
          data,
          url: origin,
          loading: false,
          title: "",
          canGoBack: false,
          canGoForward: false,
          lockIdentifier: 0,
        },
        currentTarget: 0,
        target: 0,
        bubbles: false,
        cancelable: false,
        defaultPrevented: false,
        eventPhase: 0,
        isTrusted: false,
        preventDefault: () => null,
        stopPropagation: () => null,
        isDefaultPrevented: () => false,
        isPropagationStopped: () => false,
        timeStamp: new Date().valueOf(),
        type: "",
        persist: () => null,
      };
      onMessage?.(message as any);
    };
    if (window.addEventListener) {
      window.addEventListener("message", onIframeMessage);
    } else {
      (window as any).attachEvent("onmessage", onIframeMessage);
    }

    return () => {
      window.removeEventListener("message", onIframeMessage);
      // TODO: need to remove attachEvent?
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      src={source.uri}
      // onLoad={onIframeLoad}
      style={style}
    />
  );
};

export default WebView;
