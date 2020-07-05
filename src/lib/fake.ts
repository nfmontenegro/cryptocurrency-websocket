import {promisify} from "util";
import bcrypt from "bcryptjs";

async function hashPassword(password: string): Promise<string> {
  const asyncHash = promisify(bcrypt.hash);
  return asyncHash(password, 10);
}
async function comparePasswords(password: string, hashedPassword: string): Promise<any> {
  const asyncComparePassword = promisify(bcrypt.compare);
  return asyncComparePassword(password, hashedPassword);
}

export {hashPassword, comparePasswords};

export default comparePasswords;
