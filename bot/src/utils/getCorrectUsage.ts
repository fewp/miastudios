export default (schema: string[], module: string): string => {
  const box = "`";
  let correctUsage: string = box + process.env.PREFIX + module + " ";
  schema.forEach((argument: string, index: number) => {
    correctUsage += `"${argument}" `;
  });
  correctUsage += box;
  return correctUsage.trim();
};
