
const logger = {
  info: console.log,
  debug: console.debug ? console.debug : console.log,
  error: console.error ? console.error : console.log,
  warn: console.warn ? console.warn : console.log,
};

export default logger;
