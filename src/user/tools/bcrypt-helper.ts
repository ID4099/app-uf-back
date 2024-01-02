import * as bcrypt from 'bcrypt';

export const encryptPassword = async (password): Promise<string> => {
  const saltOrRounds = 10;
  const encrypted = await bcrypt.hash(password, saltOrRounds);
  return encrypted;
}
export const isValidated = async (password, encrypted): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, encrypted);
  return isMatch;
}