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
  };
});
