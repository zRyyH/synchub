export function buildSearchFilter(search, fields) {
    if (!search || !fields || fields.length === 0) {
        return null;
    }

    return {
        _or: fields.map(field => ({
            [field]: { _icontains: search }
        }))
    };
}

export function buildQueryParams(search, searchFields = [], additionalFilters = {}) {
    const params = { ...additionalFilters };

    const searchFilter = buildSearchFilter(search, searchFields);
    if (searchFilter) {
        params.filter = params.filter
            ? { _and: [params.filter, searchFilter] }
            : searchFilter;
    }

    return params;
}

export function transformData(data, transformFn) {
    if (!data || !Array.isArray(data)) {
        return [];
    }

    return {
        data: data.map(transformFn)
    }
}

/**
 * Converte parâmetros estilo Directus para o formato Axios
 * @param {Object} params - Parâmetros da API do Directus
 * @returns {Object} - Objeto pronto para passar em axios.get(url, { params })
 */
export function directusToAxiosParams(params = {}) {
    const axiosParams = {};

    // Campos selecionados
    if (params.fields) {
        axiosParams.fields = Array.isArray(params.fields) ? params.fields.join(',') : params.fields;
    }

    // Filtros
    if (params.filter) {
        axiosParams.filter = JSON.stringify(params.filter);
    }

    // Ordenação
    if (params.sort) {
        axiosParams.sort = Array.isArray(params.sort) ? params.sort.join(',') : params.sort;
    }

    // Paginação
    if (params.limit !== undefined) {
        axiosParams.limit = params.limit;
    }

    if (params.offset !== undefined) {
        axiosParams.offset = params.offset;
    }

    // Busca textual
    if (params.search) {
        axiosParams.search = params.search;
    }

    // Inclusão de relações profundas
    if (params.deep) {
        axiosParams.deep = JSON.stringify(params.deep);
    }

    // Traduções
    if (params.translations) {
        axiosParams.translations = params.translations;
    }

    // Meta (por exemplo, total_count)
    if (params.meta) {
        axiosParams.meta = params.meta;
    }

    // Preservar chave para compatibilidade futura
    if (params.single) {
        axiosParams.single = params.single;
    }

    // Qualquer outro parâmetro direto do Directus
    Object.keys(params).forEach(key => {
        if (!axiosParams[key]) {
            axiosParams[key] = params[key];
        }
    });

    return axiosParams;
}