import bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword: string) => {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltRound);
    return hashedPassword;
}

export const verifyPassword = async (plainPassword: string, hashedPassword: string) => {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
}

async function example() {
    const password = "user-password";
    const hashed = await hashPassword(password);
    console.log("Hashed:", hashed);
    
    // Later when verifying
    const isValid = await verifyPassword(password, hashed);
    console.log("Password valid:", isValid);
}
  
// example();