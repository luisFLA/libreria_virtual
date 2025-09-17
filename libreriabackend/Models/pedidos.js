const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Pedidos = sequelize.define('Pedidos', {
        id_pedido: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Usuario',
                key: 'id_usuario'
            }
        },
        id_libro: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Libro',
                key: 'id_libro'
            }
        },
        ejemplar_fisico: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    }, {
        tableName: 'Pedidos',
        timestamps: false
    });

    return Pedidos;
};