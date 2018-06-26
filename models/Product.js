export default (sequelize, DataTypes) => {
	var product = sequelize.define(
		'product',
		{
			productName: DataTypes.STRING,
			reviews: DataTypes.STRING,
		},
		{}
	);
	product.associate = function (models) {
		// associations can be defined here
	};
	return product;
};
