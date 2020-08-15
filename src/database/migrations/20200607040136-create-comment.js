"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Comments",
      {
        uuid: {
          type: Sequelize.STRING(36),
          primaryKey: true,
          allowNull: false,
          validate: {
            isUUID: 4,
            notEmpty: true
          },
          defaultValue: Sequelize.UUIDV4
        },
        postId: {
          type: Sequelize.INTEGER
        },
        comment: {
          type: Sequelize.TEXT
        },
        userId: {
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        deletedAt: {
          allowNull: true,
          type: Sequelize.DATE
        }
      },
      {
        timestamps: true,
        paranoid: true
      }
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Comments");
  }
};
