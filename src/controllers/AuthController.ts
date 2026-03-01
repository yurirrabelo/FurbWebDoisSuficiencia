import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

const userRepo = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response, next: any) => {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ error: 'Login e senha são obrigatórios' });
    }

    if (senha.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
    }

    const exists = await userRepo.findOne({ where: { login } });
    if (exists) {
      return res.status(409).json({ error: 'Login já existe' });
    }

    const hashedPassword = await bcrypt.hash(senha, 10);
    const user = await userRepo.save({
      login,
      senha: hashedPassword,
    });

    res.status(201).json({
      id: user.id,
      login: user.login,
      message: 'Usuário criado com sucesso',
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: any) => {
  try {
    const { login, senha } = req.body;

    if (!login || !senha) {
      return res.status(400).json({ error: 'Login e senha são obrigatórios' });
    }

    const user = await userRepo.findOne({ where: { login } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(senha, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { userId: user.id, login: user.login },
      process.env.JWT_SECRET || 'secret123'
    );

    res.status(200).json({
      token,
      userId: user.id,
      login: user.login,
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Logout realizado' });
};
