const getDateFuture = (
  days: number
): Date => {
  const today = new Date();
  const futureDate = new Date(
    today
  );

  futureDate.setDate(
    today.getDate() + days
  );

  return new Date(futureDate);
};

export default getDateFuture;
