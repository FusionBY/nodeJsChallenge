'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		queryInterface.removeIndex('products', 'product_id_test')
		queryInterface.changeColumn('products', 'product_id_test', { type: Sequelize.STRING });
		return queryInterface.renameColumn('products', 'product_id_test', 'product_name');
	},

	down: (queryInterface, Sequelize) => {
		/*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
	},
};
