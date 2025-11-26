// Importa o módulo tokenStorage que contém funções utilitárias para manipular tokens no armazenamento local
import { tokenStorage } from '@/utils/tokenStorage';

// Importa a constante DIRECTUS_BASE_URL que contém a URL base da API para fazer requisições
import { DIRECTUS_BASE_URL } from '@/config/directus';

// Importa a biblioteca axios para realizar requisições HTTP
import axios from 'axios';

// Exporta uma função assíncrona chamada refreshTokenService que será responsável por renovar o token de acesso
export const refreshTokenService = async () => {
    // Busca o refresh token armazenado através do método getRefreshToken do tokenStorage
    const refreshToken = tokenStorage.getRefreshToken();

    // Verifica se o refreshToken existe; caso não exista (null, undefined, ou string vazia)
    if (!refreshToken) {
        // Lança um erro informando que não há refresh token disponível, interrompendo a execução
        throw new Error('No refresh token available');
    }

    // Faz uma requisição POST para o endpoint de refresh da API, aguardando a resposta
    // Envia o refreshToken no corpo da requisição para validação no servidor
    const response = await axios.post(`${DIRECTUS_BASE_URL}/auth/refresh`, {
        refreshToken,
    });

    // Desestrutura a resposta da API extraindo o novo accessToken e o novo refreshToken
    // Usa um alias 'newRefreshToken' para diferenciar do refreshToken original
    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // Armazena os novos tokens (accessToken e refreshToken) usando o método setTokens do tokenStorage
    // Isso substitui os tokens antigos pelos novos no armazenamento
    tokenStorage.setTokens(accessToken, newRefreshToken);

    // Retorna o novo accessToken para que possa ser usado imediatamente após a renovação
    return accessToken;
};