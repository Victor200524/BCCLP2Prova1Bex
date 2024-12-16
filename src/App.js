import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import GradeProdutos from './componentes/GradeProdutos';
import BarraBusca from './templates/BarraBusca';
import Cabecalho from './templates/Cabecalho';
import IdentificacaoCliente from './componentes/IdentificacaoCliente';
import CarrinhoDeCompras from './componentes/CarrinhoDeCompras';

function App() {
    const [produtos, setProdutos] = useState([]);
    const [pagina, setPagina] = useState('loja'); // Alterna entre 'loja' e 'carrinho'
    const [showIdentificacao, setShowIdentificacao] = useState(false);
    const cliente = useSelector((state) => state.cliente);

    // Carregar produtos da API
    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => setProdutos(data))
            .catch((error) => {
                console.error('Erro ao carregar produtos:', error);
                setProdutos([]); // Garantir que o estado seja atualizado mesmo em erro
            });
    }, []);

    // Mostrar formulário de identificação se o cliente não estiver definido
    useEffect(() => {
        if (!cliente) {
            setShowIdentificacao(true);
        }
    }, [cliente]);

    // Funções para alternar entre as páginas
    const mudarParaCarrinho = () => setPagina('carrinho');
    const mudarParaLoja = () => setPagina('loja');

    return (
        <div className="App">
            {/* Formulário de identificação do cliente */}
            {showIdentificacao && (
                <IdentificacaoCliente onClose={() => setShowIdentificacao(false)} />
            )}
            
            {/* Estrutura principal da aplicação */}
            {!showIdentificacao && (
                <>
                    <Cabecalho
                        nomeCliente={cliente?.nome}
                        onCarrinhoClick={mudarParaCarrinho} // Passa a função para o ícone de carrinho
                    />
                    {pagina === 'loja' && (
                        <>
                            <BarraBusca />
                            <GradeProdutos listaProdutos={produtos} />
                        </>
                    )}
                    {pagina === 'carrinho' && (
                        <CarrinhoDeCompras onVoltar={mudarParaLoja} />
                    )}
                </>
            )}
        </div>
    );
}

export default App;
