import axios from 'axios';
import type { BondRequest, BondResponse } from '../types/bond';

const api = axios.create({
    baseURL: 'https://bond-yield-calculator-api.onrender.com',
});

/**
 * Sends bond parameters to the backend for calculation.
 */
export const calculateBond = async (data: BondRequest): Promise<BondResponse> => {
    const response = await api.post('/bond/calculate', data);
    return response.data;
};
