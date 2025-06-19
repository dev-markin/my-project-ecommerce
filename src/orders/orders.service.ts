import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(items: any[]) {
    // Validação básica
    if (!items || items.length === 0) {
      throw new BadRequestException('O pedido não pode estar vazio');
    }

    try {
      const total = items.reduce((acc, item) => {
        // Verifica se cada item tem os campos obrigatórios
        if (!item.name || !item.price) {
          throw new BadRequestException(`Item inválido: ${JSON.stringify(item)}`);
        }
        return acc + Number(item.price);
      }, 0);

      return await this.prisma.order.create({
        data: {
          total,
          items: {
            create: items.map((item) => ({
              name: item.name,
              price: item.price,
              image: item.image || null, // Campo opcional
              provider: item.provider || 'unknown', // Valor padrão
            })),
          },
        },
        include: {
          items: true,
        },
      });
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new BadRequestException(
        error.message || 'Falha ao processar pedido'
      );
    }
  }

  async findAll() {
    return this.prisma.order.findMany({
      include: { items: true },
    });
  }
}