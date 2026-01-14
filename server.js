const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
// Choose database implementation based on environment
let database;
if (process.env.DATABASE_URL) {
    console.log('Using Postgres database (DATABASE_URL detected)');
    database = require('./database-postgres');
} else {
    console.log('Using SQLite database (default)');
    database = require('./database');
}

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
});

// Middleware
app.use(cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload configuration
let upload;
if (process.env.S3_BUCKET && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
    // Use S3-backed uploads in production when credentials and bucket are provided
    const AWS = require('aws-sdk');
    const multerS3 = require('multer-s3');

    const s3 = new AWS.S3({ region: process.env.AWS_REGION || 'us-east-1' });

    const s3Storage = multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });

    upload = multer({ storage: s3Storage, limits: { fileSize: parseInt(process.env.MAX_UPLOAD_SIZE) || 5 * 1024 * 1024 } });
    console.log('File uploads configured for S3 bucket:', process.env.S3_BUCKET);
} else {
    // Fallback to local disk storage (development)
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
            cb(null, uniqueSuffix + path.extname(file.originalname));
        }
    });
    upload = multer({ storage: storage, limits: { fileSize: parseInt(process.env.MAX_UPLOAD_SIZE) || 5 * 1024 * 1024 } });
    console.log('File uploads configured for local disk (uploads/).');
}

// Create uploads directory if it doesn't exist
const fs = require('fs');
if (!fs.existsSync('uploads')) {
    fs.mkdirSync('uploads');
}

// API Routes

// Products
app.get('/api/products', async (req, res) => {
    try {
        const products = await database.getAllProducts();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/products/:id', async (req, res) => {
    try {
        const product = await database.getProductById(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file ? (req.file.location || `/uploads/${req.file.filename}`) : req.body.image;
        const productData = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            image: imageUrl,
            category: req.body.category,
            featured: req.body.featured === 'true',
            discount: parseFloat(req.body.discount) || 0,
            stock: parseInt(req.body.stock) || 0,
            specs: req.body.specs ? JSON.parse(req.body.specs) : []
        };

        const product = await database.createProduct(productData);
        io.emit('productCreated', product);
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    try {
        const imageUrl = req.file ? (req.file.location || `/uploads/${req.file.filename}`) : req.body.image;
        const productData = {
            name: req.body.name,
            price: parseFloat(req.body.price),
            image: imageUrl,
            category: req.body.category,
            featured: req.body.featured === 'true',
            discount: parseFloat(req.body.discount) || 0,
            stock: parseInt(req.body.stock) || 0,
            specs: req.body.specs ? JSON.parse(req.body.specs) : []
        };

        const result = await database.updateProduct(req.params.id, productData);
        if (result.changes > 0) {
            const updatedProduct = await database.getProductById(req.params.id);
            io.emit('productUpdated', updatedProduct);
            res.json(updatedProduct);
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try {
        const result = await database.deleteProduct(req.params.id);
        if (result.changes > 0) {
            io.emit('productDeleted', { id: req.params.id });
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Categories
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await database.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/categories', async (req, res) => {
    try {
        const category = await database.createCategory(req.body);
        io.emit('categoryCreated', category);
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/categories/:id', async (req, res) => {
    try {
        const result = await database.updateCategory(req.params.id, req.body);
        if (result.changes > 0) {
            io.emit('categoryUpdated', { id: req.params.id, ...req.body });
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/api/categories/:id', async (req, res) => {
    try {
        const result = await database.deleteCategory(req.params.id);
        if (result.changes > 0) {
            io.emit('categoryDeleted', { id: req.params.id });
            res.json({ success: true });
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Layout Config
app.get('/api/layout-config', async (req, res) => {
    try {
        const config = await database.getLayoutConfig();
        res.json(config);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/api/layout-config', async (req, res) => {
    try {
        const result = await database.updateLayoutConfig(req.body);
        io.emit('layoutConfigUpdated', req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Authentication
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email } = req.body;
        const user = await database.authenticateUser(email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Backend is running' });
});

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.IO connection handling
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });

    // Handle real-time cart updates
    socket.on('cartUpdate', (cartData) => {
        socket.broadcast.emit('cartUpdated', cartData);
    });

    // Handle real-time user activity
    socket.on('userActivity', (activity) => {
        socket.broadcast.emit('userActivityUpdate', activity);
    });
});

// Wait for database to be ready
database.ready().then(() => {
    console.log('Database initialized, starting server...');

    // Start server
    const PORT = process.env.PORT || 3000;
    server.listen(PORT, () => {
        console.log(`FireSafe server running on port ${PORT}`);
        console.log(`Access at: http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});