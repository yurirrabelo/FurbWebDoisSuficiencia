import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Comanda } from '../entities/Comanda';
import { ProdutoComanda } from '../entities/ProdutoComanda';

const comandaRepo = AppDataSource.getRepository(Comanda);
const produtoRepo = AppDataSource.getRepository(ProdutoComanda);

export const getAll = async (req: Request, res: Response, next: any) => {
  try {
    const comandas = await comandaRepo.find();
    res.status(200).json(comandas);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    const comanda = await comandaRepo.findOne({ where: { id: parseInt(id) }, relations: ['produtos'] });

    if (!comanda) {
      return res.status(404).json({ error: 'Comanda não encontrada' });
    }

    res.status(200).json(comanda);
  } catch (error) {
    next(error);
  }
};

export const create = async (req: Request, res: Response, next: any) => {
  try {
    const { idCliente, nomeCliente, telefoneCliente, produtos } = req.body;

    if (!idCliente || !nomeCliente || !telefoneCliente) {
      return res.status(400).json({ error: 'Campos obrigatórios faltando' });
    }

    const comanda = await comandaRepo.save({
      idCliente,
      nomeCliente,
      telefoneCliente,
    });

    if (produtos && produtos.length > 0) {
      for (const produto of produtos) {
        if (!produto.nome || produto.preco === undefined || produto.preco === null) {
          return res.status(400).json({ error: 'Produto deve ter nome e preco' });
        }
        await produtoRepo.save({
          nome: produto.nome,
          preco: produto.preco,
          comanda,
        });
      }
    }

    const comandaCriada = await comandaRepo.findOne({
      where: { id: comanda.id },
      relations: ['produtos'],
    });

    res.status(201).json({
      id: comandaCriada?.id,
      idCliente: comandaCriada?.idCliente,
      nomeCliente: comandaCriada?.nomeCliente,
      telefoneCliente: comandaCriada?.telefoneCliente,
      produtos: comandaCriada?.produtos || [],
      message: 'Comanda criada com sucesso',
    });
  } catch (error) {
    next(error);
  }
};

export const update = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    const { nomeCliente, telefoneCliente, produtos } = req.body;

    const comanda = await comandaRepo.findOne({
      where: { id: parseInt(id) },
      relations: ['produtos'],
    });

    if (!comanda) {
      return res.status(404).json({ error: 'Comanda não encontrada' });
    }

    if (nomeCliente !== undefined) comanda.nomeCliente = nomeCliente;
    if (telefoneCliente !== undefined) comanda.telefoneCliente = telefoneCliente;

    await comandaRepo.save(comanda);

    if (Array.isArray(produtos) && produtos.length > 0) {
      for (const p of produtos) {
        if (p.id) {
          const produtoExistente = comanda.produtos.find((prod) => prod.id === p.id);
          if (!produtoExistente) {
            return res.status(404).json({ error: `Produto com id ${p.id} não pertence a esta comanda` });
          }
          if (p.nome !== undefined) produtoExistente.nome = p.nome;
          if (p.preco !== undefined) produtoExistente.preco = p.preco;
          await produtoRepo.save(produtoExistente);
        } else {
          if (!p.nome || p.preco === undefined || p.preco === null) {
            return res.status(400).json({ error: 'Produto deve ter nome e preco' });
          }
          const novoProduto = produtoRepo.create({
            nome: p.nome,
            preco: p.preco,
            comanda: comanda,
          });
          await produtoRepo.save(novoProduto);
        }
      }
    }

    const comandaAtualizada = await comandaRepo.findOne({
      where: { id: comanda.id },
      relations: ['produtos'],
    });

    res.status(200).json({
      id: comandaAtualizada?.id,
      idCliente: comandaAtualizada?.idCliente,
      nomeCliente: comandaAtualizada?.nomeCliente,
      telefoneCliente: comandaAtualizada?.telefoneCliente,
      produtos: comandaAtualizada?.produtos || [],
      message: 'Comanda atualizada com sucesso',
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComanda = async (req: Request, res: Response, next: any) => {
  try {
    const { id } = req.params;
    const comanda = await comandaRepo.findOne({ where: { id: parseInt(id) } });

    if (!comanda) {
      return res.status(404).json({ error: 'Comanda não encontrada' });
    }

    await comandaRepo.remove(comanda);

    res.status(200).json({ message: 'Comanda deletada com sucesso' });
  } catch (error) {
    next(error);
  }
};
