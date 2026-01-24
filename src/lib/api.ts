import axiosInstance from "./axios";

export const getDashboardStats = async () => {
  // Implement dashboard stats API call
  const response = await axiosInstance.get('/dashboard');
  return response.data;
}

export const getUploadRequests = async (page: number = 1) => {
  // Implement upload requests API call
  const response = await axiosInstance.get('/batch-requests', {
    params: { page }
  });
  return response.data;
}

export const getUploadRequestDetail = async (requestId: string) => {
  // Implement upload request detail API call
  const response = await axiosInstance.get(`/batch-requests/${requestId}`);
  return response.data;
}

export const getAccountTransactions = async (page: number = 1) => {
  // Implement account transactions API call
  const response = await axiosInstance.get('/account-transactions', {
    params: { page }
  });
  return response.data;
}

export const getJournalTransactions = async () => {
  // Implement journal transactions API call
  const response = await axiosInstance.get('/journal-transactions');
  return response.data;
}

export const getAuditReports = async () => {
  // Implement audit reports API call
  const response = await axiosInstance.get('/audits');
  return response.data;
}

export const createUploadRequest = async (formData: FormData) => {
  // Implement create upload request API call
  const response = await axiosInstance.post('/batch-upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

export const approveRequest = async (requestId: string) => {
  // Implement approve request API call
  const response = await axiosInstance.post(`/batch-requests/${requestId}/approve`);
  return response.data;
}

export const rejectRequest = async (requestId: string) => {
  // Implement reject request API call
  const response = await axiosInstance.post(`/batch-requests/${requestId}/reject`);
  return response.data;
}
