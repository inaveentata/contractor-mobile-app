/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#ff6600';  // Keeping your vibrant orange
const tintColorDark = '#ff9500';   // Slightly brighter orange for dark mode

export const Colors = {
  light: {
    text: '#11181C',               // No change
    background: '#FFFFFF',         // No change
    tint: tintColorLight,          // Orange accent
    icon: '#687076',               // No change
    tabIconDefault: '#687076',     // No change
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',               // No change
    background: '#151718',         // Dark, ensures good contrast
    tint: tintColorDark,           // Brighter orange for better visibility
    icon: '#FFAB62',               // Lighter orange-based hue for consistency
    tabIconDefault: '#9BA1A6',     // No change
    tabIconSelected: tintColorDark,
  },
};

