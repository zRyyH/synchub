export function formatarData(dataISO) {
    const data = new Date(dataISO);

    return data.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).replace(',', '');
}

export function formatarReal(valor) {
    return Number(valor).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

export function formatarCEST(cest) {
    // Garante que é uma string com exatamente 7 dígitos
    cest = String(cest).padStart(7, '0').replace(/\D/g, '');

    // Aplica o formato XX.YYY.YY
    return cest.replace(/^(\d{2})(\d{3})(\d{2})$/, '$1.$2.$3');
}

export function formatarNCM(ncm) {
    // Garante que é uma string com exatamente 8 dígitos
    ncm = String(ncm).padStart(8, '0').replace(/\D/g, '');

    // Aplica o formato XX.XX.XX.XX
    return ncm.replace(/^(\d{2})(\d{2})(\d{2})(\d{2})$/, '$1.$2.$3.$4');
}