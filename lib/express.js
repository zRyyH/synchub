import { express as express_api } from '@/config/express';
import { setupInterceptors } from '@/interceptors/setup';

setupInterceptors();

export const express = {
    post: (url, data = {}, config = {}) => {
        return express_api.post(url, data, config);
    },
};