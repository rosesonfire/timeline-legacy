import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('timeline', 'root', '', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

export default sequelize;
