// Verifica se o código está sendo executado em um navegador
// typeof window !== 'undefined' retorna true apenas no ambiente do navegador
// Em ambientes Node.js ou SSR (Server-Side Rendering), window é undefined
const isBrowser = typeof window !== 'undefined';

// Exporta um objeto com métodos para gerenciar tokens de autenticação
export const tokenStorage = {

    // Método para recuperar o token de acesso do armazenamento local
    getAccessToken: () => {
        // Se estiver no navegador, busca o token no localStorage
        // Caso contrário (servidor), retorna null para evitar erros
        return isBrowser ? localStorage.getItem('accessToken') : null;
    },

    // Método para recuperar o token de atualização do armazenamento local
    getRefreshToken: () => {
        // Se estiver no navegador, busca o refresh token no localStorage
        // Caso contrário (servidor), retorna null
        return isBrowser ? localStorage.getItem('refreshToken') : null;
    },

    // Método para armazenar os tokens no localStorage
    // Recebe accessToken (obrigatório) e refreshToken (opcional) como parâmetros
    setTokens: (accessToken, refreshToken) => {
        // Se não estiver no navegador, sai da função sem fazer nada
        // Isso previne erros ao tentar acessar localStorage no servidor
        if (!isBrowser) return;

        // Armazena o token de acesso no localStorage
        localStorage.setItem('accessToken', accessToken);

        // Se um refresh token foi fornecido, armazena-o também
        // A verificação evita armazenar valores undefined ou null
        if (refreshToken) {
            localStorage.setItem('refreshToken', refreshToken);
        }
    },

    // Método para remover os tokens do armazenamento local
    // Útil para fazer logout do usuário
    clearTokens: () => {
        // Se não estiver no navegador, sai da função sem fazer nada
        if (!isBrowser) return;

        // Remove o token de acesso do localStorage
        localStorage.removeItem('accessToken');

        // Remove o refresh token do localStorage
        localStorage.removeItem('refreshToken');
    },
};