class DateTime {
  // Calculate number of days between two dates
  static calculateNumberOfDays(firstDate, secondDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);

    return Math.ceil(Math.abs((date1 - date2) / oneDay));
  }

  // Check range of 2 dates and check dates are valid dates of future.
  // Returns null if date are valid otherwise returns error message/object.
  static validateDateRange(firstDate, secondDate) {
    try {
      const now = new Date();
      const date1 = new Date(firstDate);
      const date2 = new Date(secondDate);

      if (Number.isNaN(date1.valueOf()) || Number.isNaN(date2.valueOf())) {
        return { error: 'Invalid date' };
      }

      if (date1 >= date2 || date1 <= now || date2 <= now) {
        return { error: 'Invalid date range' };
      }
      return null;
    } catch (error) {
      return { error };
    }
  }
}

module.exports = DateTime;
