import axios from 'axios';

const EXPRESS_BASE_URL = process.env.NEXT_PUBLIC_EXPRESS_URL || 'http://localhost:4000';

const express = axios.create({
    baseURL: EXPRESS_BASE_URL,
    timeout: 30000
});

export { express, EXPRESS_BASE_URL };