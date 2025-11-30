// Importa o módulo tokenStorage que gerencia o armazenamento de tokens (salvar, recuperar, limpar)
import { tokenStorage } from '@/utils/tokenStorage';

// Importa a instância configurada do axios para fazer requisições HTTP à API
import { directus } from '@/config/directus';

// Exporta o objeto authService que contém todos os métodos relacionados à autenticação
export const authService = {
    // Método assíncrono para realizar login do usuário
    login: async (credentials) => {
        // Faz uma requisição POST para o endpoint de login enviando as credenciais (email/senha)
        const response = await directus.post('/auth/login', credentials);

        // Desestrutura a resposta para extrair os tokens de acesso e atualização
        const { access_token, refresh_token } = response.data.data;

        console.log(access_token, refresh_token)

        // Armazena os tokens (geralmente no localStorage ou sessionStorage) usando o tokenStorage
        tokenStorage.setTokens(access_token, refresh_token);

        // Retorna os dados da resposta (pode incluir informações do usuário além dos tokens)
        return response.data;
    },

    // Método para realizar logout do usuário
    logout: () => {
        // Remove os tokens armazenados (limpa localStorage/sessionStorage)
        tokenStorage.clearTokens();
    }
};