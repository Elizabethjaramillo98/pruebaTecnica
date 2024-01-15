const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

const mongoConnection = async () =>
{
    try
    {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Base de datos --> Conexión exitosa.')

    }catch(error)
    {
        console.log(error);
        process.exit(1);
    }
}

module.exports = mongoConnection;