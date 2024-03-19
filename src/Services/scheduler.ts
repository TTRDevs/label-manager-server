import cron from 'node-cron';
import axios from 'axios';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

const fetchSalesReport = async (attempt: number = 1): Promise<void> => {
  try {
    const response = await axios.get('https://recordlabelmanager.com:3001/api/sales-report/update-1d');
    console.log('Sales report updated successfully:', response.data);
  } catch (error: any) {
    console.error(`Attempt ${attempt}: Failed to update sales report -`, error.message);

    if (attempt < MAX_RETRIES) {
      console.log(`Retrying in ${RETRY_DELAY_MS / 1000} seconds...`);
      setTimeout(() => fetchSalesReport(attempt + 1), RETRY_DELAY_MS);
    } else {
      console.error('Max retries reached. Giving up.');
    }
  }
};

// Scheduled task runs daily at 00:00
cron.schedule('0 0 * * *', () => {
  console.log('Running task to fetch the sales report at 01:50 Brazil time.');
  fetchSalesReport();
}, {
  scheduled: true,
  timezone: "America/Sao_Paulo"
});