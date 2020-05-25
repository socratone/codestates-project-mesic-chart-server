'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING
  }, {});
  users.associate = function(models) {    
    users.hasMany(models.musics, {
      foreignKey: 'user_id',
      as: 'musics'
    });
  };
  return users;
};