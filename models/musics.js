'use strict';
module.exports = (sequelize, DataTypes) => {
  const musics = sequelize.define('musics', {
    thumbnail: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    playtime: DataTypes.INTEGER,
    video_url: DataTypes.STRING
  }, {});
  musics.associate = function(models) {
    musics.belongsTo(models.users, {
      foreignKey: 'user_id'
    });
  };
  return musics;
};