import { Sequelize } from 'sequelize';
import db from './db.js';

  var User = db.define('users', {
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    }
  });

  await User.sync()
  export default User
