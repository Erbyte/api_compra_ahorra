// Import express and cors
const express = require('express')
const cors = require('cors');

// Import database connection
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // Routes path
        this.paths = {
            users: '/api/users',
            auth: '/api/auth',
            categories: '/api/categories',
            products: '/api/products',
        }

        // Database Connection
        this.connect();

        // Middlewares
        this.middlewares();
    
        // Routes
        this.routes();
    }

    async connect() {
        // Database connection
        await dbConnection();
    }

    middlewares() {
        // Cors
        this.app.use(cors());

        // Read and parse body
        this.app.use(express.json());

        // Public directory - not used
        this.app.use(express.static('public'));
    }

    routes() {
        // Initialize routes
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products, require('../routes/products'));
    }

    listen() {
        // Listen port
        this.app.listen(this.port, () => {
            console.log('Running server on port', this.port)
        })
    }
}

module.exports = Server;