module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      uuid: {
        type: DataTypes.STRING(36),
        primaryKey: true,
        allowNull: false,
        validate: {
          isUUID: 4,
          notEmpty: true
        },
        defaultValue: DataTypes.UUIDV4
      },
      postId: {
        type: DataTypes.INTEGER
      },
      comment: {
        type: DataTypes.TEXT
      },
      userId: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: true,
      paranoid: true
    }
  );
  Comment.associate = models => {
    // associations can be defined here
    Comment.belongsTo(models.User, {
      foreignKey: "userId",
      as: "author"
    });
    Comment.belongsTo(models.Post, {
      foreignKey: "postId",
      as: "post"
    });
  };
  return Comment;
};
