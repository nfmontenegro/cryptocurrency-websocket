import {hash} from "bcryptjs";
import {promisify} from "util";

async function hashPassword(password: string): Promise<string> {
  const asyncHash = promisify(hash);
  const hashedPassword = asyncHash(password, 10);
  return hashedPassword;
}

export {hashPassword};
