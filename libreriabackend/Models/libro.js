const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Libro = sequelize.define('Libro', {
        id_libro: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        titulo: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        autor: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        genero: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'Libro',
        timestamps: false
    });

    return Libro;
};