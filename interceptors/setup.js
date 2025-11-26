// Importa a instância configurada do axios (directus) do arquivo de configuração
// Esta é a instância que será usada para fazer todas as requisições HTTP
import { directus } from '@/config/directus';
import { express } from '@/config/express';
    ;
// Importa os interceptadores de requisição (request)
// requestInterceptor: função que será executada ANTES de cada requisição ser enviada
// requestErrorInterceptor: função que trata erros que ocorrem ANTES da requisição ser enviada
import {
    requestInterceptor,
    requestErrorInterceptor,
} from './request';

// Importa os interceptadores de resposta (response)
// responseInterceptor: função que será executada quando uma resposta bem-sucedida for recebida
// responseErrorInterceptor: função que trata erros nas respostas (ex: 401, 404, 500, etc)
import {
    responseInterceptor,
    responseErrorInterceptor,
} from './response';

// Exporta a função que configura todos os interceptadores
// Esta função deve ser chamada uma vez na inicialização da aplicação
export const setupInterceptors = () => {
    // Configura os interceptadores de REQUISIÇÃO na instância do axios
    // Primeiro parâmetro: função executada antes de enviar a requisição (pode adicionar headers, tokens, etc)
    // Segundo parâmetro: função executada se houver erro ao preparar a requisição
    directus.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
    express.interceptors.request.use(requestInterceptor, requestErrorInterceptor);

    // Configura os interceptadores de RESPOSTA na instância do axios
    // Primeiro parâmetro: função executada quando a resposta é bem-sucedida (status 2xx)
    // Segundo parâmetro: função executada quando há erro na resposta (status 4xx, 5xx, erro de rede, etc)
    directus.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
    express.interceptors.request.use(requestInterceptor, requestErrorInterceptor);
};