export const resolveDates = (date: string, time: string, duration: number) => {
  const [year, month, day] = date.split("-");
  const [hour, minute] = time.split(":");

  const startDate = new Date(
    +year,
    +month - 1,
    +day,
    +hour,
    +minute,
    +"00"
  ).toISOString();
  const endDate = new Date(
    new Date(startDate).getTime() + duration * 60 * 1000
  ).toISOString();

  return { startDate, endDate };
};
