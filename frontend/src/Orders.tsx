import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type OrderItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  provider: string;
};

type Order = {
  id: number;
  createdAt: string;
  total: number;
  items: OrderItem[];
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Order[]>('http://localhost:3000/checkout')
      .then((res) => setOrders(res.data))
      .catch((err) => console.error('Erro ao buscar pedidos:', err));
  }, []);

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary m-0">📦 Pedidos Realizados</h2>
        <button onClick={() => navigate('/')} className="btn btn-outline-secondary">
          ⬅ Voltar para Produtos
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="alert alert-info text-center">
          Nenhum pedido realizado ainda.
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">
                Pedido #{order.id} — <span className="text-success">R$ {order.total.toFixed(2)}</span>
              </h5>
              <p className="card-subtitle text-muted mb-3">
                Realizado em: {new Date(order.createdAt).toLocaleString()}
              </p>
              <ul className="list-group list-group-flush">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div>
                      <strong>{item.name}</strong>
                      <br />
                      <small className="text-muted">Fornecedor: {item.provider}</small>
                    </div>
                    <span className="fw-bold">R$ {item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}

      <footer className="text-center mt-5 text-muted small">
        &copy; {new Date().getFullYear()} Devnology. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default Orders;