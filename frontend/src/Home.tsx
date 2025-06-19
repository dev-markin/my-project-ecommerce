import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  provider: string;
};

function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  const getTotal = () =>
    cart.reduce((total, item) => total + item.price, 0).toFixed(2);

  const removeFromCart = (indexToRemove: number) => {
    const newCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(newCart);
  };

  const finalizeOrder = async () => {
    try {
      await axios.post('http://localhost:3000/checkout', { items: cart });
      alert('Pedido finalizado com sucesso!');
      setCart([]);
    } catch (err) {
      console.error('Erro ao finalizar pedido:', err);
      alert('Erro ao finalizar pedido.');
    }
  };

  useEffect(() => {
    axios
      .get<Product[]>('http://localhost:3000/products')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error('Erro ao buscar produtos:', err));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesProvider =
      selectedProvider === 'all' || p.provider === selectedProvider;
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesProvider && matchesSearch;
  });

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary display-5 m-0">🛍️ E-commerce Devnology</h1>
        <button onClick={() => navigate('/orders')} className="btn btn-outline-secondary">
          Ver Pedidos Realizados
        </button>
      </div>

      <div className="row">
        {/* Carrinho */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">🛒 Carrinho</h5>
              {cart.length === 0 ? (
                <p className="text-muted">Nenhum item no carrinho.</p>
              ) : (
                <ul className="list-group list-group-flush mb-3">
                  {cart.map((item, i) => (
                    <li
                      key={i}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{item.name} — R$ {item.price.toFixed(2)}</span>
                      <button
                        onClick={() => removeFromCart(i)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              <p className="fw-bold">Total: R$ {getTotal()}</p>
              <button
                onClick={finalizeOrder}
                className="btn btn-success w-100"
                disabled={cart.length === 0}
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        </div>

        {/* Produtos */}
        <div className="col-md-8">
          <div className="mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Pesquisar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <h5>Filtrar por fornecedor:</h5>
            <div className="btn-group" role="group">
              <button
                className={`btn btn-outline-primary ${selectedProvider === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedProvider('all')}
              >
                Todos
              </button>
              <button
                className={`btn btn-outline-primary ${selectedProvider === 'brazilian' ? 'active' : ''}`}
                onClick={() => setSelectedProvider('brazilian')}
              >
                Brasileiro
              </button>
              <button
                className={`btn btn-outline-primary ${selectedProvider === 'european' ? 'active' : ''}`}
                onClick={() => setSelectedProvider('european')}
              >
                Europeu
              </button>
            </div>
          </div>

          <div className="row g-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-sm-6 col-lg-4 d-flex">
                  <div className="card h-100 shadow-sm w-100">
                    <img
                      src={product.image || 'https://via.placeholder.com/150'}
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'cover' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="text-muted small mb-1">{product.provider}</p>
                      <p className="fw-bold text-primary">R$ {product.price.toFixed(2)}</p>
                      <button
                        onClick={() => setCart([...cart, product])}
                        className="btn btn-outline-primary mt-auto"
                      >
                        Adicionar ao carrinho
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="alert alert-info">Nenhum produto encontrado.</div>
            )}
          </div>
        </div>
      </div>

      <footer className="text-center mt-5 text-muted small">
        &copy; {new Date().getFullYear()} Devnology. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default Home;