import {hash, compare} from "bcryptjs";
import {promisify} from "util";

async function hashPassword(password: string): Promise<string> {
  const asyncHash = promisify(hash);
  const hashedPassword = await asyncHash(password, 10);
  return hashedPassword;
}

async function comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
  const asyncComparePassword = promisify(compare);
  const isValidPassword = await asyncComparePassword(password, hashedPassword);
  return isValidPassword;
}

export {hashPassword, comparePasswords};
