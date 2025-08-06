const getDateAgo = (days: number): Date => {
  try {
    const today = new Date();
    const pastDate = new Date(today);

    pastDate.setDate(today.getDate() - days);

    return new Date(pastDate);
  } catch (error) {
    console.error(error);
    return new Date();
  }
};

export default getDateAgo;
