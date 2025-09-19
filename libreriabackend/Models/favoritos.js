const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Favoritos = sequelize.define('Favoritos', {
        id_favorito: {
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
        valoracion: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5
            }
        },
        comentario: {
            type: DataTypes.TEXT
        }
    }, {
        tableName: 'Favoritos',
        timestamps: false
    });

    return Favoritos;
};