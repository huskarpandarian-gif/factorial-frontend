import api from './api';

export const calculateFactorial = async (number) => {
    const response = await api.post('/factorial', { 
        number: Number(number)    
    });
    return response.data;

}