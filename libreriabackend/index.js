const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./Connection/database');
const defineUsuario = require('./models/usuario');
const defineLibro = require('./Models/libro');
const defineFavoritos = require('./models/favoritos');
const definePedidos = require('./models/pedidos');


app.use(express.json());
app.use(cors());


const Usuario = defineUsuario(sequelize);
const Libro = defineLibro(sequelize);
const Favoritos = defineFavoritos(sequelize);
const Pedidos = definePedidos(sequelize);


// Relaciones entre tablas
Usuario.hasMany(Favoritos, { foreignKey: 'id_usuario' });
Favoritos.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Libro.hasMany(Favoritos, { foreignKey: 'id_libro' });
Favoritos.belongsTo(Libro, { foreignKey: 'id_libro' });

Usuario.hasMany(Pedidos, { foreignKey: 'id_usuario' });
Pedidos.belongsTo(Usuario, { foreignKey: 'id_usuario' });

Libro.hasMany(Pedidos, { foreignKey: 'id_libro' });
Pedidos.belongsTo(Libro, { foreignKey: 'id_libro' });



sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch((err) => console.error('Error sincronizando DB:', err));




// ===================================
//             COMIENZO DE API
// ===================================


// ===================================
//             RUTAS DE LOGIN
// ===================================



app.post('/login', async (req, res) => {
    try {
        const { correo, password } = req.body;
        if (!correo || !password) {
            return res.status(400).json({ error: 'Correo y contraseña son requeridos' });
        }

        // Encriptar el password con md5 para comparar
        const passwordMd5 = crypto.createHash('md5').update(password).digest('hex');

        // Buscar usuario
        const usuario = await Usuario.findOne({
            where: { correo, password: passwordMd5 }
        });

        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Aquí podrías generar un token JWT en lugar de devolver el usuario directamente
        res.status(200).json({
            message: 'Login exitoso',
            usuario: {
                id: usuario.id_usuario,
                correo: usuario.correo,
                tipo_usuario: usuario.tipo_usuario
            }
        });

    } catch (error) {
        res.status(500).json({ error: 'Error en el servidor al iniciar sesión' });
    }
});



// ===================================
//             RUTAS DE USUARIOS
// ===================================
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

const { QueryTypes } = require('sequelize');
const crypto = require('crypto');

app.post('/usuarios', async (req, res) => {
    try {
        // Encriptar la contraseña usando md5 (igual que MySQL)
        const { correo, password, tipo_usuario } = req.body;
        const passwordMd5 = crypto.createHash('md5').update(password).digest('hex');
        const nuevoUsuario = await Usuario.create({ correo, password: passwordMd5, tipo_usuario });
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el usuario' });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const [updated] = await Usuario.update(req.body, {
            where: { id_usuario: req.params.id }
        });
        if (updated) {
            const usuarioActualizado = await Usuario.findByPk(req.params.id);
            res.status(200).json(usuarioActualizado);
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        const deleted = await Usuario.destroy({
            where: { id_usuario: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
});



// ===================================
//             RUTAS DE LIBROS
// ===================================

// Rutas para Libro
app.get('/libros', async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener libros' });
    }
});

app.post('/libros', async (req, res) => {
    try {
        const nuevoLibro = await Libro.create(req.body);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el libro' });
    }
});

app.put('/libros/:id', async (req, res) => {
    try {
        const [updated] = await Libro.update(req.body, {
            where: { id_libro: req.params.id }
        });
        if (updated) {
            const libroActualizado = await Libro.findByPk(req.params.id);
            res.status(200).json(libroActualizado);
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
});

app.delete('/libros/:id', async (req, res) => {
    try {
        const deleted = await Libro.destroy({
            where: { id_libro: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Libro eliminado' });
        } else {
            res.status(404).json({ error: 'Libro no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
});

// ===================================
//             RUTAS DE FAVORITOS
// ===================================
app.get('/favoritos', async (req, res) => {
    try {
        const favoritos = await Favoritos.findAll({ include: [Libro] });
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener favoritos' });
    }
});

// Obtener favoritos por usuario (nuevo)
app.get('/favoritos/usuario/:id', async (req, res) => {
    try {
        const favoritos = await Favoritos.findAll({
            where: { id_usuario: req.params.id },
            include: [Libro]
        });
        res.json(favoritos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener favoritos del usuario' });
    }
});

app.post('/favoritos', async (req, res) => {
    try {
        const nuevoFavorito = await Favoritos.create(req.body);
        res.status(201).json(nuevoFavorito);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el favorito' });
    }
});

app.delete('/favoritos/:id', async (req, res) => {
    try {
        const deleted = await Favoritos.destroy({ where: { id_favorito: req.params.id } });
        if (!deleted) return res.status(404).json({ error: 'Favorito no encontrado' });
        res.status(200).json({ message: 'Favorito eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el favorito' });
    }
});

// ===================================
//             RUTAS DE PEDIDOS
// ===================================
app.get('/pedidos', async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll({
            include: [{ model: Libro }]
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener pedidos' });
    }
});

app.get('/pedidos/usuario/:id', async (req, res) => {
    try {
        const pedidos = await Pedidos.findAll({
            where: { id_usuario: req.params.id },
            include: [{ model: Libro }]
        });
        res.json(pedidos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener pedidos del usuario' });
    }
});

app.post('/pedidos', async (req, res) => {
    try {
        const nuevoPedido = await Pedidos.create(req.body);
        res.status(201).json(nuevoPedido);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear el pedido' });
    }
});

app.delete('/pedidos/:id', async (req, res) => {
    try {
        const deleted = await Pedidos.destroy({
            where: { id_pedido: req.params.id }
        });
        if (deleted) {
            res.status(204).json({ message: 'Pedido eliminado' });
        } else {
            res.status(404).json({ error: 'Pedido no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el pedido' });
    }
});


// ===================================
//             FIN APIS
// ===================================



app.listen(8000, () => {
    console.log('Server started on port 8000');
});
