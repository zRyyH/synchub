import axios from 'axios';

const DIRECTUS_BASE_URL = process.env.NEXT_PUBLIC_DIRECTUS_URL || 'http://localhost:3000';

const directus = axios.create({
    baseURL: DIRECTUS_BASE_URL,
    timeout: 30000,
});

export { directus, DIRECTUS_BASE_URL };