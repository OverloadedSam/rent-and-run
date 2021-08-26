const calculateNumberOfDays = (firstDate, secondDate) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const date1 = new Date(firstDate);
  const date2 = new Date(secondDate);

  return Math.ceil(Math.abs((date1 - date2) / oneDay));
};

module.exports = calculateNumberOfDays;
