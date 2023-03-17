const { DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_HOST } = process.env;
const DIALECT = 'mysql';

const config = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  dialect: DIALECT,
  repositoryMode: true,
  define: {
    underscored: true,
    paranoid: true,
  },
};

module.exports = {
  development: config,
  test: config,
  production: { ...config, logging: false },
};
