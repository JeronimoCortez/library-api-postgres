import bcrypt from "bcrypt";

const SALT_ROUNDS: number = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPass = async (pass: string, userPass: string) => {
  return await bcrypt.compare(pass, userPass);
};
