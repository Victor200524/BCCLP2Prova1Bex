import React from 'react';
import { useSelector } from 'react-redux';

function Cabecalho({ nomeCliente, onCarrinhoClick }) {
    const carrinho = useSelector((state) => state.carrinho);

    const totalItens = carrinho.reduce((acc, produto) => acc + produto.quantidade, 0);

    return (
        <header className="cabecalho">
            <h1>Bem-vindo(a), {nomeCliente}</h1>
            <button onClick={onCarrinhoClick}>
                Carrinho ({totalItens} {totalItens === 1 ? 'item' : 'itens'})
            </button>
        </header>
    );
}

export default Cabecalho;
