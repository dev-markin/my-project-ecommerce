import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductsService {
  async getAllProducts() {
    const brazilian = await axios.get(
      'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'
    );

    const european = await axios.get(
      'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'
    );

    //  mapeando campos brasileiros para inglês
    const mappedBrazilian = brazilian.data.map((p: any) => ({
      id: p.id,
      name: p.nome || p.name || 'Produto sem nome',
      description: p.descricao || '',
      image: p.imagem || '',
      price: parseFloat(p.preco?.replace(',', '.') || '0'),
      provider: 'brazilian',
    }));

    const mappedEuropean = european.data.map((p: any) => ({
      id: p.id,
      name: p.name || 'No Name',
      description: p.description || '',
      image: p.image || '',
      price: Number(p.price),
      provider: 'european',
    }));

    // filtrando produtos com nome e preço válidos
    const isValid = (p: any) =>
      typeof p.name === 'string' &&
      p.name.trim().length > 0 &&
      !isNaN(p.price) &&
      p.price > 0;

    const allProducts = [...mappedBrazilian, ...mappedEuropean].filter(isValid);

    return allProducts;
  }
}
