export const IMAGE_PREFIX = `/assets/`;
export const BE_AWS_PATH = process.env.NEXT_PUBLIC_BE;
export const REFRESH_TOKEN_TIMEOUT: number =
  parseInt(process.env.NEXT_PUBLIC_REFRESH_TOKEN_TIMEOUT || "") || 300000;

export const COLORS = {
  primary: "#3b8644",
  secondary: "#151d70",
};
