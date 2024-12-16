import React from 'react';
import { useDispatch } from 'react-redux';
import { addProduto } from '../reduxStore';
import Produto from "../templates/Produto";

function GradeProdutos({ listaProdutos }) {
    const dispatch = useDispatch();

    const handleAddToCart = (produto) => {
        dispatch(addProduto({ ...produto, quantidade: 1 }));
    };

    // Se não há produtos ou está vazio, exibe a mensagem "Carregando..."
    if (!listaProdutos || listaProdutos.length === 0) {
        return <h1>Carregando...</h1>;
    }

    return (
        <div style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            margin: '10px',
            padding: '10px',
            gap: '20px'
        }}>
            {listaProdutos.map((produto) => (
                <div key={produto.id} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    width: '200px',
                    margin: '10px'
                }}>
                    <Produto produto={produto} />
                    <button
                        style={{
                            backgroundColor: '#ff4e4e',
                            color: '#fff',
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginTop: '10px'
                        }}
                        onClick={() => handleAddToCart(produto)}
                    >
                        Comprar
                    </button>
                </div>
            ))}
        </div>
    );
}

export default GradeProdutos;
