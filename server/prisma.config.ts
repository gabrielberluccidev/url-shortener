import 'dotenv/config';

export default {
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  // The datasource URL is typically picked up from the .env file automatically
  // by the Prisma CLI using the provider defined in schema.prisma
};
