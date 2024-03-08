import express, { Request, Response } from 'express';
import { getMetabaseEmbedding } from '../Services/DashboardEmbedding';
import { fetchDataFromService } from '../Services/DatabaseApiFetch';
import { getClientCredentials, getSalesReport } from '../Services/bandCampController';

const router = express.Router();

router.get('/metabase', getMetabaseEmbedding);

router.get('/data-service', fetchDataFromService);

router.get('/sales-report', async (req: Request, res: Response) => {
  // Extract parameters passed when calling
    const { bandId, startDate, endDate } = req.query;

  // Validation to ensure required parameters are provided
    if (!bandId || !startDate || !endDate) {
        return res.status(400).send('Missing required query parameters: bandId, startDate, endDate');
    }

    try {
        // Convert bandId to number as Express query parameters are always strings
        const numericBandId = parseInt(bandId as string, 10);

        // Validate conversion success and numericBandId is a positive number
        if (isNaN(numericBandId) || numericBandId <= 0) {
            return res.status(400).send('Invalid bandId. Must be a positive number.');
        }

        // Call getSalesReport with the validated and converted parameters
        const report = await getSalesReport(numericBandId, startDate as string, endDate as string);
        res.json(report);
    } catch (error) {
        console.error('Error fetching sales report:', error);
        res.status(500).send('Server error occurred while fetching sales report.');
    }
});


router.get('/bandcamp/credentials', getClientCredentials);
export default router;
