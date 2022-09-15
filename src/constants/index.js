const env = process.env.REACT_APP_ENV;

export const config = {
  apiNetworkInterface: {
    development: 'http://20.232.153.176:9000',
    production: 'http://20.232.153.176:9000',
  }[env],
};

export const app_title = 'Data Magic';

export const gridLayoutConfig = {
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 100,
  preventCollision: false,
};
