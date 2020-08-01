module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      userId: DataTypes.STRING
    },
    {}
  );
  Post.associate = models => {
    // associations can be defined here
    Post.hasMany(models.Comment, {
      foreignKey: "postId",
      as: "comments",
      onDelete: "CASCADE"
    });

    Post.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author",
      onDelete: "CASCADE"
    });
  };
  return Post;
};
