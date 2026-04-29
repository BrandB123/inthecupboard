import bcrypt from 'bcrypt';

export async function hashPassword(password) {
    if (!password){
        throw new Error("Missing Password")
    }
    
    const salt = 10;
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

export async function checkPassword(submission, hash) {

    if (!submission || !hash) {
        throw new Error("Missing Required Arguments");
    }

    const match = await bcrypt.compare(submission, hash);
    return match;
}