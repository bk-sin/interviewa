import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Asset } from "expo-asset";
import * as Font from "expo-font";

/**
 * Critical assets that should be pre-cached before the app renders
 */
const CRITICAL_IMAGES = [
  require("@/assets/images/hero.png"),
  // Add more critical images here as needed
  // require("../assets/images/logo.png"),
];

/**
 * Fonts to preload
 */
const FONTS_TO_LOAD = {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
};

/**
 * Pre-caches critical image assets
 * @returns Promise that resolves when all images are cached
 */
async function cacheImages(images: number[]): Promise<void> {
  const cachePromises = images.map((image) => {
    return Asset.fromModule(image).downloadAsync();
  });
  await Promise.all(cachePromises);
}

/**
 * Pre-loads fonts
 * @returns Promise that resolves when all fonts are loaded
 */
async function cacheFonts(
  fonts: Record<string, Font.FontSource>
): Promise<void> {
  await Font.loadAsync(fonts);
}

/**
 * Pre-caches all critical assets (images and fonts)
 * Should be called during app initialization before hiding splash screen
 *
 * @example
 * ```tsx
 * useEffect(() => {
 *   async function prepare() {
 *     try {
 *       await preloadAssets();
 *     } catch (e) {
 *       console.warn(e);
 *     } finally {
 *       await SplashScreen.hideAsync();
 *     }
 *   }
 *   prepare();
 * }, []);
 * ```
 */
export async function preloadAssets(): Promise<void> {
  await Promise.all([cacheImages(CRITICAL_IMAGES), cacheFonts(FONTS_TO_LOAD)]);
}

/**
 * Pre-caches only critical images (useful when fonts are loaded separately)
 */
export async function preloadImages(): Promise<void> {
  await cacheImages(CRITICAL_IMAGES);
}

/**
 * Asset configuration for easy management
 */
export const assetConfig = {
  images: {
    hero: require("@/assets/images/hero.png"),
    // Add more image references here
  },
  /**
   * Get all critical images as an array
   */
  getCriticalImages: () => CRITICAL_IMAGES,
} as const;
