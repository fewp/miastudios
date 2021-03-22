export default (array: string[]): string[] => {
  const cleanArray = array.filter((value: string): boolean => {
    if (value != "" && value != " " && value != null) return true;
    return false;
  });
  return cleanArray;
};
