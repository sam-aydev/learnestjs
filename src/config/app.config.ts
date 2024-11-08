export const appConfig = () => ({
  environment: {},
  database: {
    host: process.env.DATABSE_HOST || 'localhost',
    port: parseInt(process.env.DATABSE_PORT) || 5432,
    autoLoadEntities: true,
  },
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsRegion: process.env.AWS_REGION,
  awsCloudfrontUrl: process.env.AWS_CLOUDFRONT_URL,
  awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
  awsSecretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
