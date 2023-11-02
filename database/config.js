const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODB);
    } catch (error) {
        console.log(error);
        throw new Error('Error de conexion a la base de datos');
    }

    console.log('Base de datos online');
}

module.exports = {
    dbConnection
}