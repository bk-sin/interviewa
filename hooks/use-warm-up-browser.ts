import * as WebBrowser from "expo-web-browser";
import { useEffect } from "react";

/**
 * Hook to warm up the browser for OAuth flows on Android.
 * This pre-loads the browser, making the OAuth flow feel instant and native.
 *
 * Should be called in any screen that will initiate an OAuth flow.
 */
export function useWarmUpBrowser() {
  useEffect(() => {
    // Warm up the browser for Android
    // This makes the OAuth flow feel native and instant
    void WebBrowser.warmUpAsync();

    return () => {
      // Clean up when component unmounts
      void WebBrowser.coolDownAsync();
    };
  }, []);
}
