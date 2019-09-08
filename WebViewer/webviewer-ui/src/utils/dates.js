export const formatDate = date => {
  if (date === undefined) return;
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  return `${year}/${month}/${day}`;
};
