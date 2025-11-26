// Importa a função tokenStorage do arquivo tokenStorage.js localizado na pasta utils
// Esta função é responsável por gerenciar os tokens de autenticação
import { tokenStorage } from '@/utils/tokenStorage';

// Exporta a função requestInterceptor que será usada como interceptador de requisições HTTP
// O parâmetro 'config' contém todas as configurações da requisição (URL, método, headers, etc.)
export const requestInterceptor = (config) => {
    // Chama o método getAccessToken() do tokenStorage para recuperar o token de acesso armazenado
    // Este token é normalmente salvo após o usuário fazer login
    const token = tokenStorage.getAccessToken();

    // Verifica se o token existe (não é null, undefined ou string vazia)
    if (token) {
        // Adiciona o token ao header 'Authorization' da requisição no formato Bearer
        // O padrão Bearer é amplamente usado para autenticação baseada em tokens
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Retorna o objeto config modificado para que a requisição possa prosseguir
    // Este retorno é essencial para o interceptador funcionar corretamente
    return config;
};

// Exporta a função requestErrorInterceptor para tratar erros que ocorrem antes da requisição ser enviada
// O parâmetro 'error' contém as informações do erro ocorrido
export const requestErrorInterceptor = (error) => {
    // Retorna uma Promise rejeitada com o erro recebido
    // Isso permite que o erro seja capturado por blocos catch() ou tratadores de erro subsequentes
    return Promise.reject(error);
};