import { v4 } from "uuid";
export const formatFileName = (filename: string) => {
  const cleanDate = new Date()
    .toString()
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toLowerCase()
    .slice(0, -34);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newFilename = `images/upload-${cleanDate}-${cleanFileName}-${v4()}`;
  return newFilename;
};
