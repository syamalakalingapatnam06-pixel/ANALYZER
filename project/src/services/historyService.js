import api from './api';
import { MOCK_HISTORY } from '../utils/mockData';

export const historyService = {
  async getHistory() {
    try {
      const response = await api.get('/history');
      return response.data || response.history || [];
    } catch (err) {
      return MOCK_HISTORY;
    }
  }
};

export default historyService;
