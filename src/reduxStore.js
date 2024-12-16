import { configureStore, createSlice } from '@reduxjs/toolkit';

// Slice para gerenciamento do cliente
const clienteSlice = createSlice({
    name: 'cliente',
    initialState: JSON.parse(localStorage.getItem('cliente')) || null,
    reducers: {
        setCliente: (state, action) => {
            localStorage.setItem('cliente', JSON.stringify(action.payload));
            return action.payload;
        },
    },
});

// Slice para gerenciamento do carrinho
const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState: JSON.parse(localStorage.getItem('carrinho')) || [],
    reducers: {
        addProduto: (state, action) => {
            const produtoExistente = state.find(prod => prod.id === action.payload.id);
            if (produtoExistente) {
                produtoExistente.quantidade += action.payload.quantidade;
            } else {
                state.push(action.payload);
            }
            localStorage.setItem('carrinho', JSON.stringify(state));
        },
        updateQuantidade: (state, action) => {
            const produto = state.find(prod => prod.id === action.payload.id);
            if (produto) {
                produto.quantidade = action.payload.quantidade;
            }
            localStorage.setItem('carrinho', JSON.stringify(state));
        },
        removeProduto: (state, action) => {
            const novoEstado = state.filter(prod => prod.id !== action.payload.id);
            localStorage.setItem('carrinho', JSON.stringify(novoEstado));
            return novoEstado;
        },
    },
});

// Configurando o store Redux
const store = configureStore({
    reducer: {
        cliente: clienteSlice.reducer,
        carrinho: carrinhoSlice.reducer,
    },
});

export const { setCliente } = clienteSlice.actions;
export const { addProduto, updateQuantidade, removeProduto } = carrinhoSlice.actions;
export default store;
