export const mediumDateTimeFormat = (date: string | Date) => {
  let dateTime = new Date(date);
  return dateTime.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })
}