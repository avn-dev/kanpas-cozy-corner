// utils/decodeUnicode.ts
export const decodeUnicode = (str: string): string => {
  return str.replace(/\\u([\dA-Fa-f]{4})/g, (_, code) =>
    String.fromCharCode(parseInt(code, 16))
  );
};