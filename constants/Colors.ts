/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */
// types/Colors.ts
export type ColorScheme = 'light' | 'dark';

export interface ColorsType {
  light: {
    menubase: string;
    menuicon: string;
    base: string;
    coverbase: string;
    text: string;
    background: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
  dark: {
    menubase: string;
    menuicon: string;
    base: string;
    coverbase: string;
    text: string;
    background: string;
    tint: string;
    icon: string;
    tabIconDefault: string;
    tabIconSelected: string;
  };
}

const tintColorLight = '#FF7900';
const tintColorDark = '#fff';

export const Colors: ColorsType = {
  light: {
    menubase: tintColorDark ,
    menuicon: '#687076',
    base: '#F3F3F3',
    coverbase: '#E3E3E3',
    text: '#3F003B',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    menubase: '#E3E3E3',
    menuicon: tintColorDark,
    base: '#CCD0CF',
    coverbase: '#151718',
    text: '#fff',
    background: '#06141B',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
