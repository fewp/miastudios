export default (s: string) => {
  if (s.charAt(0) === " ") s = s.slice(1);
  return ` ${s.charAt(0).toUpperCase()}${s.slice(1)}`;
};
