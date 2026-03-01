import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProdutoComanda } from './ProdutoComanda';

@Entity('comandas')
export class Comanda {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: 'id_cliente', type: 'int' })
  idCliente!: number;

  @Column({ name: 'nome_cliente', length: 100 })
  nomeCliente!: string;

  @Column({ name: 'telefone_cliente', length: 20 })
  telefoneCliente!: string;

  @OneToMany(() => ProdutoComanda, produto => produto.comanda, { cascade: true, eager: true })
  produtos!: ProdutoComanda[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date;
}