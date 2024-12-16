import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantidade, removeProduto } from '../reduxStore';
import BarraBusca from '../templates/BarraBusca';

function CarrinhoDeCompras({ onVoltar }) {
    const carrinho = useSelector((state) => state.carrinho);
    const dispatch = useDispatch();

    const handleAlterarQuantidade = (id, novaQuantidade) => {
        if (novaQuantidade > 0) {
            dispatch(updateQuantidade({ id, quantidade: novaQuantidade }));
        }
    };

    const handleRemoverProduto = (id) => {
        dispatch(removeProduto({ id }));
    };

    return (
        <div className="carrinho-container">
            <BarraBusca/>
            <h2>Carrinho de Compras</h2>
            {carrinho.length === 0 ? (
                <p>O carrinho está vazio.</p>
            ) : (
                <ul>
                    {carrinho.map((produto) => (
                        <li key={produto.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img 
                                src={produto.image} 
                                alt={produto.title} 
                                style={{ width: '80px', height: 'auto', marginRight: '10px' }} // Imagem menor
                            />
                            <div>
                                <h3>{produto.title}</h3>
                                <p>R$ {produto.price.toFixed(2)}</p>
                                <input
                                    type="number"
                                    value={produto.quantidade}
                                    min="1"
                                    onChange={(e) =>
                                        handleAlterarQuantidade(produto.id, parseInt(e.target.value, 10))
                                    }
                                />
                                <button onClick={() => handleRemoverProduto(produto.id)}>Remover</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <button onClick={onVoltar}>Voltar à Loja</button>
        </div>
    );
}

export default CarrinhoDeCompras;
