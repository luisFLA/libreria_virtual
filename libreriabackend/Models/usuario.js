const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Usuario = sequelize.define('Usuario', {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        correo: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        tipo_usuario: {
            type: DataTypes.ENUM('admin', 'cliente'),
            allowNull: false
        }
    }, {
        tableName: 'Usuario',
        timestamps: false
    });

    return Usuario;
};
