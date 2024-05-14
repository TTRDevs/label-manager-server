import express, { Request, Response } from 'express';
import { getMetabaseEmbedding } from '../Services/DashboardEmbedding';
import { fetchDataFromService } from '../Services/BandcampDatabaseInsert';
import { getClientCredentials, getSalesReport, ensureValidAccessToken } from '../Services/BandcampApiControl';
import { importAllExcelData } from '../Services/LabelworkxDatabaseInsert';
import { importZebralutionData } from '../Services/ZebralutionDatabaseInsert';

const router = express.Router();
const bandId = Number(process.env.BAND_ID);

router.get('/metabase', getMetabaseEmbedding);
router.get('/data-service', fetchDataFromService);
router.get('/bandcamp/credentials', getClientCredentials);

router.get('/sales-report', (req: Request, res: Response) => {
    res.send("Are you looking to fetch or update your reports?");
});

router.get('/sales-report/bandcamp-update-1d', async (req: Request, res: Response) => {
    // Date range: from yesterday to today
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const startDate = yesterday.toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    console.log(`Fetching sales report from ${startDate} to ${endDate}.`);

    try {
        const clientCreds = await getClientCredentials();
        if (!clientCreds) {
            console.log('No client credentials were retrieved.');
            return res.status(401).json({ message: 'Failed to retrieve client credentials. Try again.' });
        }

        const accessToken = await ensureValidAccessToken();
        if (!accessToken) {
            console.log('Access token could not be ensured.');
            return res.status(401).json({ message: 'Failed to ensure access token is valid. Try again.' });
        }

        const salesReport = await getSalesReport(bandId, startDate, endDate);
        if (Array.isArray(salesReport)) {
            await fetchDataFromService(salesReport);
            return res.json({
                message: 'Sales Report update complete.',
                reportDates: { startDate, endDate }
            });
        } else {
            return res.status(404).json({ message: 'Sales report data is not in the expected format.' });
        }
    } catch (error) {
        console.error('Error updating sales report:', error);

        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error occurred while updating sales report.', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error occurred while updating sales report.', error: 'An unexpected error occurred' });
        }
    }
});

router.get('/sales-report/bandcamp-update-6mo', async (req: Request, res: Response) => {
    // Date range: from 6 months ago to today
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setDate(sixMonthsAgo.getMonth() - 6);
    const startDate = sixMonthsAgo.toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    console.log(`Fetching sales report from ${startDate} to ${endDate}.`);

    try {
        const clientCreds = await getClientCredentials();
        if (!clientCreds) {
            console.log('No client credentials were retrieved.');
            return res.status(401).json({ message: 'Failed to retrieve client credentials. Try again.' });
        }

        const accessToken = await ensureValidAccessToken();
        if (!accessToken) {
            console.log('Access token could not be ensured.');
            return res.status(401).json({ message: 'Failed to ensure access token is valid. Try again.' });
        }

        const salesReport = await getSalesReport(bandId, startDate, endDate);
        if (Array.isArray(salesReport)) {
            await fetchDataFromService(salesReport);
            return res.json({
                message: 'Sales Report update complete.',
                reportDates: { startDate, endDate }
            });
        } else {
            return res.status(404).json({ message: 'Sales report data is not in the expected format.' });
        }
    } catch (error) {
        console.error('Error updating sales report:', error);

        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error occurred while updating sales report.', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error occurred while updating sales report.', error: 'An unexpected error occurred' });
        }
    }
});

router.get('/sales-report/bandcamp-update-max', async (req: Request, res: Response) => {
    // Date range: from max (01-01-2015) to today
    const max2015 = new Date();
    max2015.setFullYear(2015, 0, 1); // Year: 2015, Month: January (0), Day: 1
    const startDate = max2015.toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    console.log(`Fetching sales report from ${startDate} to ${endDate}.`);

    try {
        const clientCreds = await getClientCredentials();
        if (!clientCreds) {
            console.log('No client credentials were retrieved.');
            return res.status(401).json({ message: 'Failed to retrieve client credentials. Try again.' });
        }

        const accessToken = await ensureValidAccessToken();
        if (!accessToken) {
            console.log('Access token could not be ensured.');
            return res.status(401).json({ message: 'Failed to ensure access token is valid. Try again.' });
        }

        const salesReport = await getSalesReport(bandId, startDate, endDate);
        if (Array.isArray(salesReport)) {
            await fetchDataFromService(salesReport);
            return res.json({
                message: 'Sales Report update complete.',
                reportDates: { startDate, endDate }
            });
        } else {
            return res.status(404).json({ message: 'Sales report data is not in the expected format.' });
        }
    } catch (error) {
        console.error('Error updating sales report:', error);

        if (error instanceof Error) {
            return res.status(500).json({ message: 'Server error occurred while updating sales report.', error: error.message });
        } else {
            return res.status(500).json({ message: 'Server error occurred while updating sales report.', error: 'An unexpected error occurred' });
        }
    }
});

router.get('/sales_report/fetch-labelworkx-data', async (req: Request, res: Response) => {
    try {
        await importAllExcelData();
        res.status(200).json({
            message: 'Labelworkx data imported successfully.'
        });
    } catch (error) {
        console.error('Error during data import:', error);
        res.status(500).json({
            message: 'Failed to import data.',
            error: (error as Error).message || 'An unexpected error occurred.'
        });
    }
});

router.get('/sales_report/fetch-zebralution-data', async (req: Request, res: Response) => {
    try {
        await importZebralutionData('zebralution_sales_report.xlsx');
        res.status(200).json({
            message: 'Zebralution data imported successfully.'
        });
    } catch (error) {
        console.error('Error during data import:', error);
        res.status(500).json({
            message: 'Failed to import data.',
            error: (error as Error).message || 'An unexpected error occurred.'
        });
    }
});

export default router;
