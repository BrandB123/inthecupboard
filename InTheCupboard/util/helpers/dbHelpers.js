export function createDishesTable(db) {
    console.log("[Preparing to create dishes table...");

    const stmt = db.prepare(`
        CREATE TABLE IF NOT EXISTS dishes (
            id INTEGER PRIMARY KEY ASC NOT NULL,
            name TEXT NOT NULL,
            ingredients TEXT,
            category TEXT NOT NULL,
            user_id INTEGER REFERENCES users(id) NOT NULL
        )`)

    stmt.run();
    console.log("[Table Created: dishes]")
}

export function createDishNameConstraint(db) {
    const stmt = db.prepare(`
            CREATE UNIQUE INDEX IF NOT EXISTS
            dish_name ON dishes(
                name, user_id
            )`);

    const result = stmt.run();
    console.log("[Unique Constraint Created: dish_name]");
}

export function createUsersTable(db) {
    
    console.log("[Preparing to create users table...]");

    const stmt = db.prepare(`
            CREATE TABLE IF NOT EXISTS users (
               id INTEGER PRIMARY KEY ASC NOT NULL,
               first_name TEXT NOT NULL,
               last_name TEXT,
               email TEXT NOT NULL UNIQUE,
               password_hash TEXT NOT NULL
            )`);

    stmt.run();
    console.log("[Table Created: users]");
}



export function enableForeignKeys(db) {
 
    console.log("[Preparing to enable foreign keys...");

    if (!db.open) {
        throw new Error("Not connected to database. Initiate connection and retry.");
    }
    
    db.pragma('foreign_keys = ON');
    const foreignKeys = db.pragma('foreign_keys', {simple: true});

    if (!foreignKeys) throw new error("Failed to enable foreign keys");

    console.log("Foreign Keys Enabled:", foreignKeys ? "True" : "False");
}
 