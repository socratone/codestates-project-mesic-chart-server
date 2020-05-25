'use strict';
module.exports = (sequelize, DataTypes) => {
  const musics = sequelize.define('musics', {
    thumbnail: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    playtime: DataTypes.INTEGER,
    videoId: DataTypes.STRING
  }, {});
  musics.associate = function(models) {
    musics.belongsTo(models.users, {
      foreignKey: 'userId'
    });
  };
  return musics;
};