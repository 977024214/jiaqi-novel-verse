export type Theme = {
  name: string;
  label: string;
  colors: {
    background: string;
    foreground: string;
    card: string;
    "card-foreground": string;
    popover: string;
    "popover-foreground": string;
    primary: string;
    "primary-foreground": string;
    secondary: string;
    "secondary-foreground": string;
    muted: string;
    "muted-foreground": string;
    accent: string;
    "accent-foreground": string;
    destructive: string;
    "destructive-foreground": string;
    border: string;
    input: string;
    ring: string;
  };
};

export const themes: Theme[] = [
  {
    name: "qidian",
    label: "起点红",
    colors: {
      background: "#ffffff",
      foreground: "#333333",
      card: "#ffffff",
      "card-foreground": "#333333",
      popover: "#ffffff",
      "popover-foreground": "#333333",
      primary: "#bf2c24", // 起点特色红色
      "primary-foreground": "#ffffff",
      secondary: "#f6f6f6",
      "secondary-foreground": "#666666",
      muted: "#f6f6f6",
      "muted-foreground": "#999999",
      accent: "#fff1f0", // 红色背景
      "accent-foreground": "#bf2c24",
      destructive: "#ff4d4f",
      "destructive-foreground": "#ffffff",
      border: "#e5e5e5",
      input: "#e5e5e5",
      ring: "#bf2c24",
    },
  },
  {
    name: "light",
    label: "明亮",
    colors: {
      background: "#ffffff",
      foreground: "#333333",
      card: "#ffffff",
      "card-foreground": "#333333",
      popover: "#ffffff",
      "popover-foreground": "#333333",
      primary: "#00a8e6",
      "primary-foreground": "#ffffff",
      secondary: "#f6f6f6",
      "secondary-foreground": "#666666",
      muted: "#f6f6f6",
      "muted-foreground": "#999999",
      accent: "#f6f6f6",
      "accent-foreground": "#333333",
      destructive: "#ff4d4f",
      "destructive-foreground": "#ffffff",
      border: "#e5e5e5",
      input: "#e5e5e5",
      ring: "#00a8e6",
    },
  },
  {
    name: "dark",
    label: "暗黑",
    colors: {
      background: "#111111",
      foreground: "#ffffff",
      card: "#1a1a1a",
      "card-foreground": "#ffffff",
      popover: "#1a1a1a",
      "popover-foreground": "#ffffff",
      primary: "#00a8e6",
      "primary-foreground": "#ffffff",
      secondary: "#2a2a2a",
      "secondary-foreground": "#cccccc",
      muted: "#2a2a2a",
      "muted-foreground": "#999999",
      accent: "#2a2a2a",
      "accent-foreground": "#ffffff",
      destructive: "#ff4d4f",
      "destructive-foreground": "#ffffff",
      border: "#2a2a2a",
      input: "#2a2a2a",
      ring: "#00a8e6",
    },
  },
  {
    name: "sepia",
    label: "护眼",
    colors: {
      background: "#f5e6d3",
      foreground: "#433422",
      card: "#fff4e6",
      "card-foreground": "#433422",
      popover: "#fff4e6",
      "popover-foreground": "#433422",
      primary: "#8c7355",
      "primary-foreground": "#ffffff",
      secondary: "#eee0cc",
      "secondary-foreground": "#666666",
      muted: "#eee0cc",
      "muted-foreground": "#999999",
      accent: "#eee0cc",
      "accent-foreground": "#433422",
      destructive: "#ff4d4f",
      "destructive-foreground": "#ffffff",
      border: "#e5d5c0",
      input: "#e5d5c0",
      ring: "#8c7355",
    },
  },
];

export const defaultTheme = "qidian";
