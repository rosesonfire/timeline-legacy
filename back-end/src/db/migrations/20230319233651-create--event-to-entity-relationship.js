/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_to_entity_relationship', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        field: 'created_at',
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        field: 'updated_at',
        type: Sequelize.DATE,
      },
      deletedAt: {
        allowNull: true,
        field: 'deleted_at',
        type: Sequelize.DATE,
      },
      relationshipOfId: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'relationship_of_id',
        allowNull: false,
        references: {
          model: {
            tableName: 'event',
          },
        },
      },
      relationshipWithId: {
        type: Sequelize.DataTypes.INTEGER,
        field: 'relationship_with_id',
        allowNull: false,
        references: {
          model: {
            tableName: 'entity',
          },
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('event_to_entity_relationship');
  },
};
