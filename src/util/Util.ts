export const encodeBase64 = (data: string) => {
  return Buffer.from(data).toString("base64");
};
