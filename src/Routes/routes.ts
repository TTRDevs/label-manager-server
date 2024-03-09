// routes.ts

import express, { Request, Response } from 'express';
import { getMetabaseEmbedding } from '../Services/DashboardEmbedding';
import { fetchDataFromService } from '../Services/DatabaseApiFetch';
import { getClientCredentials, getSalesReport, ensureValidAccessToken, getMyBands } from '../Services/bandCampController';
import { db } from '../Services/Database';

const router = express.Router();
const bandId = Number(process.env.BAND_ID);

router.get('/metabase', getMetabaseEmbedding);
router.get('/data-service', fetchDataFromService);
router.get('/bandcamp/credentials', getClientCredentials);

router.get('/sales-report', (req: Request, res: Response) => {
    res.send("Are you looking to fetch or update your reports?");
});

router.get('/sales-report/fetch', async (req: Request, res: Response) => {
    // Date range: from 6 months ago to today
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
    const startDate = sixMonthsAgo.toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    console.log(`Fetching sales report from ${startDate} to ${endDate}.`);
    res.send(`Fetching sales report from ${startDate} to ${endDate}. Please wait...`);

    try {
        const clientCreds = await getClientCredentials();
        if (!clientCreds) {
            console.log('No client credentials were retrieved.');
            return res.status(401).json({ message: 'Failed to retrieve client credentials.' });
        }

        const accessToken = await ensureValidAccessToken();
        if (!accessToken) {
            console.log('Access token could not be ensured.');
            return res.status(401).json({ message: 'Failed to ensure access token is valid.' });
        }

        // await getMyBands(); // This might not be necessary

        const salesReport = await getSalesReport(bandId, startDate, endDate);
        if (Array.isArray(salesReport)) {
            await fetchDataFromService(salesReport);
            // Send a single JSON response with both the message and report dates
            return res.json({
                message: 'Sales Report fetching complete.',
                reportDates: { startDate, endDate }
            });
        } else {
            return res.status(404).json({ message: 'Sales report data is not in the expected format.' });
        }
    } catch (error) {
        console.error('Error fetching sales report:', error);
        return res.status(500).send('Server error occurred while fetching sales report.');
    }
});

router.get('/sales-report/update', async (req: Request, res: Response) => {
    // Date range: from yesterday to today
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const startDate = yesterday.toISOString().split('T')[0];
    const endDate = new Date().toISOString().split('T')[0];

    try {
        const clientCreds = await getClientCredentials();
        if (!clientCreds) {
            console.log('No client credentials were retrieved.');
            return res.status(401).json({ message: 'Failed to retrieve client credentials.' });
        }

        const accessToken = await ensureValidAccessToken();
        if (!accessToken) {
            console.log('Access token could not be ensured.');
            return res.status(401).json({ message: 'Failed to ensure access token is valid.' });
        }

        await getMyBands(); // This might not be necessary

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
        return res.status(500).send('Server error occurred while updating sales report.');
    }
});

// router.get('/sales-report/init', async (req, res) => { // TODO: IMPLEMENT THE INIT TO CHECK IF THE TABLE EXISTS, KYSELEY IS HARD.
//     try {
//         // Attempt to count the number of entries in the sales_report table.
//         const result = await db.selectFrom('sales_report').count('id').execute();

//         const count = result[0].count as number;
//         if (count > 0) {
//             res.json({ message: `Table 'sales_report' exists with ${count} records.` });
//         } else {
//             res.json({ message: 'Table exists but no records found.' });
//         }
//     } catch (error: any) {
//         if (error instanceof Error && error.message.includes('relation "sales_report" does not exist')) {
//             res.status(404).json({ message: 'Table "sales_report" not found.' });
//         } else {
//             console.error('Unexpected error during table check:', error);
//             res.status(500).send('Unexpected error occurred while checking the table.');
//         }
//     }
// });




export default router;
