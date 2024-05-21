import bcrypt from "bcrypt";

const createHash = async (plainPassword: string) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(plainPassword,salt);
}

const validatePassword = async (plainPassword: string,hashedPassword: string) => {
    return await bcrypt.compare(plainPassword,hashedPassword);
}

export {
    createHash,
    validatePassword
}