export const formattedRuntime = (length) => {
  const hour = Math.floor(length / 60);
  const remainingMinus = length % 60;
  if (!hour) return `${length}min`; // less than 1 hour
  if (!remainingMinus) return `${hour}h`; // exact hours length
  return `${hour}h ${remainingMinus}min`; // hours and mins
};