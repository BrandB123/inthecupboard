import Database from 'better-sqlite3';

export function connectToDatabase(path) {
    
    console.log("[Preparing to connect to database...]");
    const db = new Database(path, { fileMustExist: true });
    console.log("[Database connection established]");
    return db;

}

export function createUser(db, user) {
    if (!db) {
        throw new Error("Missing Database Connection");
    }

    if (!user?.name?.first || !user?.email || !user?.password_hash) {
        console.log(`Name: ${user?.name?.first} ${user?.name?.last}`);
        console.log(`Email: ${user?.email}`);
        console.log("Password Hash: ", user.password_hash ? "********" : "Missing");
        throw new Error("Incomplete User Information");
    }

    let stmt;
    try {
        if (user?.name?.last) {
            stmt = db.prepare(`INSERT INTO users(first_name, last_name, email, password_hash) VALUES (?, ?, ?, ?)`);
            console.log(`Adding User To Database: ${user?.email}`);
            const result = stmt.run(
                user?.name?.first,
                user?.name?.last,
                user?.email,
                user?.password_hash
            );
        } else {
            stmt = db.prepare('INSERT INTO users (first_name, email, password_hash) VALUES (?, ?, ?)');
            console.log(`Adding User To Database: ${user?.email}`);
            const result = stmt.run(
                user?.name?.first,
                user?.email,
                user?.password_hash
            );
        }
    } catch (error) {
        throw error;
    }
}

export function getUser(db, email) {
    if (!db) {
        throw new Error("Missing Database Connection");
    }

    if (!email) {
        throw new Error("Missing Credentials To Locate User");
    }

    const stmt = db.prepare(`SELECT * FROM users WHERE email = $`);
    const user = stmt.get(email);
    return user;
}


