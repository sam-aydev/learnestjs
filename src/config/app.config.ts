export const appConfig = () => ({
  environment: {},
  database: {
    host: process.env.DATABSE_HOST || 'localhost',
    port: parseInt(process.env.DATABSE_PORT) || 5432,
    autoLoadEntities: true,
  },
  apiVersion: process.env.API_VERSION,
});
