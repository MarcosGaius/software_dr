export const doFetch = async (request: Request) => {
  const res = await fetch(request);
  const data = await res.json();

  return { data, res };
};

export const handleError = (
  error: any,
  defaultMessage = "Ocorreu um erro. Tente novamente."
) => {
  if (error.message) {
    throw new Error(error.message);
  } else {
    throw new Error(defaultMessage);
  }
};
