const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create database path
const dbPath = path.join(__dirname, 'firesafe.db');

// Create database connection
let dbReady = false;
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    // Products table
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            image TEXT,
            category TEXT NOT NULL,
            featured BOOLEAN DEFAULT 0,
            discount REAL DEFAULT 0,
            stock INTEGER DEFAULT 0,
            specs TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) {
            console.error('Error creating products table:', err);
            return;
        }

        // Categories table
        db.run(`
            CREATE TABLE IF NOT EXISTS categories (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                icon TEXT DEFAULT 'layers',
                color TEXT DEFAULT 'bg-orange-500/10',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creating categories table:', err);
                return;
            }

            // Layout config table
            db.run(`
                CREATE TABLE IF NOT EXISTS layout_config (
                    id TEXT PRIMARY KEY,
                    title TEXT NOT NULL,
                    visible BOOLEAN DEFAULT 1,
                    label TEXT NOT NULL,
                    position INTEGER
                )
            `, (err) => {
                if (err) {
                    console.error('Error creating layout_config table:', err);
                    return;
                }

                // Users table for authentication
                db.run(`
                    CREATE TABLE IF NOT EXISTS users (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        email TEXT UNIQUE NOT NULL,
                        name TEXT NOT NULL,
                        role TEXT DEFAULT 'public',
                        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `, (err) => {
                    if (err) {
                        console.error('Error creating users table:', err);
                        return;
                    }

                    // Insert default data
                    insertDefaultData();
                });
            });
        });
    });
}

// Insert default data
function insertDefaultData() {
    // Check if data already exists
    db.get("SELECT COUNT(*) as count FROM products", (err, row) => {
        if (err) {
            console.error('Error checking products:', err);
            return;
        }

        if (row.count === 0) {
            // Insert default products
            const defaultProducts = [
                { name: "Lithium EV Suppression Blanket", price: 1850.00, image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800", category: "EV Kit", featured: 1, discount: 15, stock: 45, specs: '["Thermal Resistance: 2000°C", "Size: 6m x 8m", "Weight: 25kg"]' },
                { name: "Home Safety Tactical Bundle", price: 340.00, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800", category: "Home Kit", featured: 1, discount: 0, stock: 120, specs: '["1kg Dry Powder Extinguisher", "Smoke Detector (x2)", "Fire Blanket 1.2m"]' },
                { name: "Smart WiFi Gas Analyzer", price: 195.00, image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800", category: "Gas Detector", featured: 1, discount: 10, stock: 85, specs: '["WiFi Connection", "App Alert System", "Detects LPG & Natural Gas"]' },
                { name: "MKAA Industrial PFD Unit", price: 420.00, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800", category: "MKAA Kit", featured: 0, discount: 0, stock: 30, specs: '["ISO 12402-4 Certified", "Reflective Tape", "Whistle Included"]' },
                { name: "Static Rappelling Rope (11mm)", price: 950.00, image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&q=80&w=800", category: "Ropes", featured: 0, discount: 20, stock: 60, specs: '["Diameter: 11mm", "Length: 100m", "Breaking Strength: 32kN"]' },
                { name: "Professional AED Module", price: 6800.00, image: "https://images.unsplash.com/photo-1516515429572-1b12b5f903e6?auto=format&fit=crop&q=80&w=800", category: "Life Support", featured: 0, discount: 5, stock: 12, specs: '["Fully Automatic", "Voice Prompts", "5-Year Battery Life"]' },
                { name: "Field Athlete Trauma Station", price: 290.00, image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&q=80&w=800", category: "Athlete Kit", featured: 0, discount: 0, stock: 200, specs: '["Ice Packs", "Elastic Bandages", "Antiseptic Spray"]' },
                { name: "Hiking Survival Deep-Field Kit", price: 165.00, image: "https://images.unsplash.com/photo-1537225228614-56cc3556d7ed?auto=format&fit=crop&q=80&w=800", category: "Hiking Kit", featured: 0, discount: 0, stock: 150, specs: '["Compass", "Multi-tool", "Emergency Foil Blanket"]' },
                { name: "Urban Flood Barrier (5m)", price: 820.00, image: "https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&q=80&w=800", category: "Flood Kit", featured: 0, discount: 15, stock: 25, specs: '["Length: 5m", "Height: 0.5m", "Rapid Deployment"]' },
                { name: "Tactical Ops Manual", price: 55.00, image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800", category: "E-Book", featured: 0, discount: 0, stock: 999, specs: '["PDF Format", "200 Pages", "Illustrated Guides"]' },
                { name: "72-Hour Ration MRE Pack", price: 125.00, image: "https://images.unsplash.com/photo-1584263343923-d4855339c2ce?auto=format&fit=crop&q=80&w=800", category: "Survival Food", featured: 0, discount: 0, stock: 500, specs: '["3000 Calories/Day", "Self-Heating", "5-Year Shelf Life"]' },
                { name: "Expert Fire Safety Training", price: 1500.00, image: "https://images.unsplash.com/photo-1593115057321-44222097767d?auto=format&fit=crop&q=80&w=800", category: "Tech Support", featured: 0, discount: 0, stock: 5, specs: '["On-Site Training", "Certification Included", "Max 20 Participants"]' }
            ];

            const stmt = db.prepare("INSERT INTO products (name, price, image, category, featured, discount, stock, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
            defaultProducts.forEach(product => {
                stmt.run(product.name, product.price, product.image, product.category, product.featured, product.discount, product.stock, product.specs);
            });
            stmt.finalize();
        }
    });

    // Check if categories exist
    db.get("SELECT COUNT(*) as count FROM categories", (err, row) => {
        if (err) {
            console.error('Error checking categories:', err);
            return;
        }

        if (row.count === 0) {
            // Insert default categories
            const defaultCategories = [
                { name: "EV Kit", icon: "zap", color: "bg-orange-500/10" },
                { name: "Home Kit", icon: "home", color: "bg-blue-500/10" },
                { name: "Gas Detector", icon: "radar", color: "bg-red-500/10" },
                { name: "MKAA Kit", icon: "anchor", color: "bg-cyan-500/10" },
                { name: "Ropes", icon: "git-commit", color: "bg-slate-500/10" },
                { name: "Life Support", icon: "heart-pulse", color: "bg-pink-500/10" },
                { name: "Athlete Kit", icon: "award", color: "bg-green-500/10" },
                { name: "Hiking Kit", icon: "mountain", color: "bg-emerald-500/10" },
                { name: "Flood Kit", icon: "waves", color: "bg-blue-600/10" },
                { name: "E-Book", icon: "book-open", color: "bg-purple-500/10" },
                { name: "Survival Food", icon: "utensils-cross-side", color: "bg-amber-500/10" },
                { name: "Tech Support", icon: "shield-check", color: "bg-indigo-500/10" }
            ];

            const stmt = db.prepare("INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)");
            defaultCategories.forEach(category => {
                stmt.run(category.name, category.icon, category.color);
            });
            stmt.finalize();
        }
    });

    // Check if layout config exists
    db.get("SELECT COUNT(*) as count FROM layout_config", (err, row) => {
        if (err) {
            console.error('Error checking layout config:', err);
            return;
        }

        if (row.count === 0) {
            // Insert default layout config
            const defaultLayoutConfig = [
                { id: 'promo', title: "Tactical Deals", visible: 1, label: "Promotions", position: 1 },
                { id: 'categories', title: "Asset Modules", visible: 1, label: "Categories", position: 2 },
                { id: 'featured', title: "Priority Dispatch", visible: 1, label: "Featured", position: 3 },
                { id: 'inventory', title: "Full Inventory Index", visible: 1, label: "Inventory", position: 4 },
                { id: 'social', title: "Digital Network & Official Stores", visible: 1, label: "Social Media", position: 5 },
                { id: 'payment', title: "Payment Ecosystem", visible: 1, label: "Payments", position: 6 }
            ];

            const stmt = db.prepare("INSERT INTO layout_config (id, title, visible, label, position) VALUES (?, ?, ?, ?, ?)");
            defaultLayoutConfig.forEach(config => {
                stmt.run(config.id, config.title, config.visible, config.label, config.position);
            });
            stmt.finalize();
        }
    });

    // All initialization steps have been queued; mark DB as ready.
    // Note: operations above are asynchronous but queued on the same sqlite3 connection.
    // Setting `dbReady = true` here allows the server to proceed once the DB connection
    // and schema creation have been initiated. This is acceptable for this small app.
    dbReady = true;
}

// Database operations
const database = {
    // Products
    getAllProducts: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM products ORDER BY id", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    getProductById: (id) => {
        return new Promise((resolve, reject) => {
            db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        });
    },

    createProduct: (product) => {
        return new Promise((resolve, reject) => {
            const { name, price, image, category, featured, discount, stock, specs } = product;
            db.run(
                "INSERT INTO products (name, price, image, category, featured, discount, stock, specs) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
                [name, price, image, category, featured ? 1 : 0, discount, stock, JSON.stringify(specs)],
                function(err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID, ...product });
                }
            );
        });
    },

    updateProduct: (id, product) => {
        return new Promise((resolve, reject) => {
            const { name, price, image, category, featured, discount, stock, specs } = product;
            db.run(
                "UPDATE products SET name = ?, price = ?, image = ?, category = ?, featured = ?, discount = ?, stock = ?, specs = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
                [name, price, image, category, featured ? 1 : 0, discount, stock, JSON.stringify(specs), id],
                function(err) {
                    if (err) reject(err);
                    else resolve({ changes: this.changes });
                }
            );
        });
    },

    deleteProduct: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM products WHERE id = ?", [id], function(err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            });
        });
    },

    // Categories
    getAllCategories: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM categories ORDER BY id", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    createCategory: (category) => {
        return new Promise((resolve, reject) => {
            const { name, icon, color } = category;
            db.run(
                "INSERT INTO categories (name, icon, color) VALUES (?, ?, ?)",
                [name, icon || 'layers', color || 'bg-orange-500/10'],
                function(err) {
                    if (err) reject(err);
                    else resolve({ id: this.lastID, ...category });
                }
            );
        });
    },

    updateCategory: (id, category) => {
        return new Promise((resolve, reject) => {
            const { name, icon, color } = category;
            db.run(
                "UPDATE categories SET name = ?, icon = ?, color = ? WHERE id = ?",
                [name, icon, color, id],
                function(err) {
                    if (err) reject(err);
                    else resolve({ changes: this.changes });
                }
            );
        });
    },

    deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            db.run("DELETE FROM categories WHERE id = ?", [id], function(err) {
                if (err) reject(err);
                else resolve({ changes: this.changes });
            });
        });
    },

    // Layout Config
    getLayoutConfig: () => {
        return new Promise((resolve, reject) => {
            db.all("SELECT * FROM layout_config ORDER BY position", (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        });
    },

    updateLayoutConfig: (configs) => {
        return new Promise((resolve, reject) => {
            db.serialize(() => {
                db.run("BEGIN TRANSACTION");
                configs.forEach(config => {
                    db.run(
                        "UPDATE layout_config SET title = ?, visible = ?, position = ? WHERE id = ?",
                        [config.title, config.visible ? 1 : 0, config.position, config.id]
                    );
                });
                db.run("COMMIT", (err) => {
                    if (err) reject(err);
                    else resolve({ success: true });
                });
            });
        });
    },

    // Users
    authenticateUser: (email) => {
        return new Promise((resolve, reject) => {
            // Check if user exists, if not create them
            db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
                if (err) reject(err);
                else if (row) {
                    resolve(row);
                } else {
                    // Create new user
                    const name = email.split('@')[0];
                    const role = email.toLowerCase().includes('admin') ? 'admin' : 'public';
                    db.run(
                        "INSERT INTO users (email, name, role) VALUES (?, ?, ?)",
                        [email, name, role],
                        function(err) {
                            if (err) reject(err);
                            else resolve({ id: this.lastID, email, name, role });
                        }
                    );
                }
            });
        });
    }
};

// Database ready promise
database.ready = () => {
    return new Promise((resolve) => {
        const checkReady = () => {
            if (dbReady) {
                resolve();
            } else {
                setTimeout(checkReady, 100);
            }
        };
        checkReady();
    });
};

module.exports = database;