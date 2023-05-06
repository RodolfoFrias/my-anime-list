import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    postgres: {
      DB_NAME: process.env.POSTGRES_DB,
      PORT: process.env.POSTGRES_PORT,
      PASSWORD: process.env.POSTGRES_PASSWORD,
      USER: process.env.POSTGRES_USER,
      HOST: process.env.POSTGRES_HOST,
    },
    thirdPartyAPI: {
      API_KEY: process.env.API_KEY,
      API_HOST: process.env.API_HOST,
      API_URL: process.env.API_URL,
    },
  };
});
