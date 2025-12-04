export const getErrorMessage = (error: unknown, fallback = "Bir hata oluştu") => {
  if (typeof error === "string") return error;
  const err = error as any;
  const detail = err?.response?.data?.detail ?? err?.message;
  if (typeof detail === "string") return detail;
  return fallback;
};

