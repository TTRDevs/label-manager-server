import cron from 'node-cron';
import axios, { AxiosResponse, AxiosError } from 'axios';

// This schedule runs every 5 minutes
cron.schedule('*/5 * * * *', () => {
  console.log('Running the task every 5 minutes to fetch the sales report.');
  axios.get('http://localhost:3001/sales-report/update-1d')
    .then((response: AxiosResponse) => console.log('Sales report updated successfully:', response.data))
    .catch((error: AxiosError) => console.error('Failed to update sales report:', error.message));
});
