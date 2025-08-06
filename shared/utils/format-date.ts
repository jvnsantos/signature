import { parseISO, format } from "date-fns";

function formatDateUtils(dateInput: any, outputFormat = "dd/MM/yyyy") {
  try {
    const parsedDate =
      typeof dateInput === "string"
        ? parseISO(dateInput)
        : new Date(dateInput);

    return format(parsedDate, outputFormat);
  } catch {
    return dateInput;
  }
}

export default formatDateUtils;
