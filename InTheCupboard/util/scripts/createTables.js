/*
    TABLES
    - users
        - id (integer) Primary Key, Auto-increment? Not null
        - user_id ??? (user facing id. UUID of ID?) 
        - first_name (text) not null
        - last_name (text)
        - email (text) not null unique
        - password_hash (text) not null

    - dishes
        - id (integer) Primary Key, Auto-increment? not null
        - name (text) not null
        - ingredients (text)
        - category (text) main, side, dessert - not null
        - user_id (integer) foreign key
        - TABLE CONSTRAINT  
            - UNIQUE pairing of user_id and name
*/

import Database from 'better-sqlite3';
import { createDishesTable, createDishNameConstraint, createUsersTable, enableForeignKeys } from '../helpers/dbHelpers.js';

console.log("[Connecting to Database...]");
const db = new Database('local.db', {fileMustExist: true});
console.log("[Database Connection Established]")

enableForeignKeys(db);

createUsersTable(db);

createDishesTable(db);

createDishNameConstraint(db);

db.close();
