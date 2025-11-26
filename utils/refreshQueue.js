// Variável de controle que indica se há um processo de refresh de token em andamento
let isRefreshing = false;

// Array que armazena as requisições que falharão enquanto o token está sendo atualizado
// Cada item contém as funções resolve e reject de uma Promise
let failedQueue = [];

// Objeto que gerencia a fila de requisições durante o refresh do token de autenticação
export const refreshQueue = {
    // Método getter que retorna o estado atual do refresh
    // Permite que outros módulos verifiquem se já existe um refresh em andamento
    isRefreshing: () => isRefreshing,

    // Método setter que atualiza o estado do refresh
    // Recebe um valor booleano (true/false) para indicar se está refreshing ou não
    setRefreshing: (value) => {
        isRefreshing = value;
    },

    // Método que adiciona uma requisição à fila de espera
    // Retorna uma nova Promise que será resolvida ou rejeitada quando o refresh terminar
    addToQueue: () => {
        return new Promise((resolve, reject) => {
            // Adiciona um objeto com as funções resolve e reject ao array failedQueue
            // Essas funções serão chamadas posteriormente pelo processQueue
            failedQueue.push({ resolve, reject });
        });
    },

    // Método que processa todas as requisições que estavam aguardando na fila
    // Recebe um erro (se houver) e o novo token (se o refresh foi bem-sucedido)
    processQueue: (error = null, token = null) => {
        // Itera sobre cada Promise armazenada na fila
        failedQueue.forEach((prom) => {
            // Se houve um erro no refresh, rejeita a Promise com o erro
            if (error) {
                prom.reject(error);
            } else {
                // Se o refresh foi bem-sucedido, resolve a Promise com o novo token
                prom.resolve(token);
            }
        });
        // Limpa a fila após processar todas as requisições
        failedQueue = [];
    },
};