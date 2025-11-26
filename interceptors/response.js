// Importa o serviço responsável por renovar o token de autenticação
import { refreshTokenService } from '@/services/refreshToken';

// Importa o utilitário para armazenar e recuperar tokens (provavelmente usa localStorage/sessionStorage)
import { tokenStorage } from '@/utils/tokenStorage';

// Importa o gerenciador de fila para requisições pendentes durante a renovação do token
import { refreshQueue } from '@/utils/refreshQueue';

// Importa a instância configurada do axios para fazer requisições HTTP
import { directus } from '@/config/directus';

// Função auxiliar para redirecionar o usuário para a página de login
const redirectToLogin = () => {
    // Verifica se o código está sendo executado no navegador (não no servidor)
    if (typeof window !== 'undefined') {
        // Redireciona para a rota de login
        window.location.href = '/';
    }
};

// Interceptor de resposta para requisições bem-sucedidas
export const responseInterceptor = (response) => {
    // Retorna a resposta inalterada para continuar o fluxo normal
    return response;
};

// Interceptor de resposta para tratar erros nas requisições
export const responseErrorInterceptor = async (error) => {
    // Armazena a configuração da requisição original que falhou
    const originalRequest = error.config;

    // Tratamento específico para erro 401 (não autorizado/token expirado)
    // Verifica se o erro é 401 E se esta requisição ainda não tentou renovar o token
    if (error.response?.status === 401 && !originalRequest._retry) {

        // Verifica se já existe um processo de renovação de token em andamento
        if (refreshQueue.isRefreshing()) {
            // Aguarda na fila até que o token seja renovado
            const token = await refreshQueue.addToQueue();
            // Atualiza o header de autorização da requisição original com o novo token
            originalRequest.headers.Authorization = `Bearer ${token}`;
            // Tenta executar novamente a requisição original com o novo token
            return directus(originalRequest);
        }

        // Marca que esta requisição já tentou renovar o token (evita loop infinito)
        originalRequest._retry = true;

        // Indica que o processo de renovação de token está iniciando
        refreshQueue.setRefreshing(true);

        try {
            // Chama o serviço para renovar o token de acesso
            const accessToken = await refreshTokenService();

            // Atualiza o header padrão do axios com o novo token
            directus.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

            // Atualiza o header da requisição original com o novo token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;

            // Processa todas as requisições que estavam aguardando na fila
            // Passa null para erro (sucesso) e o novo token
            refreshQueue.processQueue(null, accessToken);

            // Tenta executar novamente a requisição original com o novo token
            return directus(originalRequest);

        } catch (refreshError) {
            // Se a renovação do token falhar, processa a fila passando o erro
            refreshQueue.processQueue(refreshError, null);

            // Remove os tokens armazenados (logout local)
            tokenStorage.clearTokens();

            // Redireciona o usuário para a página de login
            redirectToLogin();

            // Rejeita a promise com o erro de renovação
            return Promise.reject(refreshError);

        } finally {
            // Sempre executa ao final: indica que o processo de renovação terminou
            refreshQueue.setRefreshing(false);
        }
    }

    // Formata a mensagem de erro de forma padronizada
    // Tenta pegar a mensagem do servidor, senão usa a mensagem do erro, senão usa uma mensagem padrão
    const errorMessage = error.response?.data?.message || error.message || 'Erro ao processar requisição';

    // Retorna uma promise rejeitada com um objeto de erro padronizado
    return Promise.reject({
        message: errorMessage,              // Mensagem de erro formatada
        status: error.response?.status,     // Código de status HTTP
        data: error.response?.data,         // Dados completos da resposta de erro
        originalError: error,               // Erro original para debugging
    });
};