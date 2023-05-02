export const setPort = (): number => {
  const regex = /[^0-9]/;
  let port = process.env.PORT;
  if (port === undefined || !regex.test(port)) {
    port = "5000";
  }
  return parseInt(port);
};
