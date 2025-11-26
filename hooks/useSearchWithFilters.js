// Importa o hook useState do React, que permite criar e gerenciar estados em componentes funcionais
import { useState } from "react";

// Declara e exporta um hook customizado que gerencia pesquisa e filtros
export default function useSearchWithFilters(queryKey) {
    // Cria um estado para armazenar o termo de pesquisa como string vazia inicialmente
    // 'search' é o valor atual e 'setSearch' é a função para atualizá-lo
    const [search, setSearch] = useState("");

    // Cria um estado para armazenar os filtros ativos como objeto vazio inicialmente
    // 'activeFilters' guarda os filtros aplicados e 'setActiveFilters' atualiza esse objeto
    const [activeFilters, setActiveFilters] = useState({});

    // Cria um estado para armazenar os dados como array vazio inicialmente
    // 'data' contém os dados e 'setData' é a função para modificá-los
    const [data, setData] = useState([]);

    // Define uma função que recebe um valor e atualiza o estado de pesquisa
    // Parâmetro 'value': o novo termo de pesquisa digitado pelo usuário
    const handleSearch = (value) => {
        // Atualiza o estado 'search' com o novo valor recebido
        setSearch(value);
    };

    // Define uma função que adiciona ou remove filtros do objeto de filtros ativos
    // Parâmetro 'key': a chave/nome do filtro (ex: "categoria", "status")
    // Parâmetro 'value': o valor do filtro (ex: "eletrônicos", "ativo")
    const handleFilter = (key, value) => {
        // Cria uma cópia do objeto de filtros ativos usando spread operator
        // Isso evita mutação direta do estado, seguindo boas práticas do React
        const newFilters = { ...activeFilters };

        // Verifica se o valor do filtro existe (não é null, undefined, string vazia, etc)
        if (value) {
            // Se existe valor, adiciona ou atualiza a chave no objeto de filtros
            newFilters[key] = value;
        } else {
            // Se não existe valor, remove a chave do objeto de filtros
            // Isso acontece quando o usuário limpa/desativa um filtro
            delete newFilters[key];
        }

        // Atualiza o estado com o novo objeto de filtros modificado
        setActiveFilters(newFilters);
    };

    // Retorna um objeto com todos os estados e funções que o hook disponibiliza
    // Isso permite que componentes que usam este hook tenham acesso a:
    return {
        search,          // O termo de pesquisa atual
        activeFilters,   // Os filtros ativos atualmente aplicados
        data,            // Os dados armazenados
        setData,         // Função para atualizar os dados diretamente
        handleSearch,    // Função para atualizar o termo de pesquisa
        handleFilter,    // Função para adicionar/remover filtros
    };
}