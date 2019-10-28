const Config = (() => {
  let configs = null;

  if (process.env.NODE_ENV === 'development') {
    configs = require('./configDev');
  } else {
    configs = require('./configProd');
  }
  return configs;
})();

export default Config;
