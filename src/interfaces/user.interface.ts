// src/interfaces/user.interface.ts

export interface IUser {
  id: string;
  email: string;
  name: string | null; // Ubah ini dari string | undefined menjadi string | null
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserInput {
  email: string;
  name?: string; // Ini tetap opsional untuk input
  password: string;
}
