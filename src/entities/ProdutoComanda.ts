import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Comanda } from './Comanda';

@Entity('produtos_comanda')
export class ProdutoComanda {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 150 })
  nome!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco!: number;

  @ManyToOne(() => Comanda, comanda => comanda.produtos, { onDelete: 'CASCADE' })
  comanda!: Comanda;
}