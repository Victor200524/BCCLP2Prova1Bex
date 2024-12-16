import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCliente } from '../reduxStore';

function IdentificacaoCliente({ onClose }) {
    const [formData, setFormData] = useState({
        cpf: '',
        nome: '',
        endereco: '',
        cidade: '',
        uf: '',
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setCliente(formData)); // Salvar no estado global
        onClose(); // Fechar o formulário após a identificação
    };

    return (
        <div className="form-container">
            <h2>Identifique-se</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    value={formData.cpf}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="nome"
                    placeholder="Nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="endereco"
                    placeholder="Endereço"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="cidade"
                    placeholder="Cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    required
                />
                <input
                    type="text"
                    name="uf"
                    placeholder="UF"
                    value={formData.uf}
                    onChange={handleInputChange}
                    required
                />
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
}

export default IdentificacaoCliente;
