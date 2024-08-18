import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { IUserInput } from '../interfaces/user.interface';
import { User } from '../models/user.model';

export class UserService {
  async register(userData: IUserInput): Promise<User> {
    const existingUser = await prisma.user.findUnique({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
    return new User(user);
  }

  async login(email: string, password: string): Promise<{ token: string; user: User }> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '1d' });
    return { token, user: new User(user) };
  }

  async getUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users.map((user) => new User(user));
  }

  async getUserById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }
    return new User(user);
  }

  async updateUser(id: string, userData: Partial<IUserInput>): Promise<User> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    });
    return new User(updatedUser);
  }

  async deleteUser(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }
}
