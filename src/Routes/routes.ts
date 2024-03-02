import express, { Request, Response } from 'express';
import { getMetabaseEmbedding } from '../Services/DashboardEmbedding';
import { fetchDataFromService } from '../Services/DatabaseApiFetch';
import { getClientCredentials, getSalesReport } from '../Services/BandCampController';

const router = express.Router();

router.get('/metabase', getMetabaseEmbedding);

router.get('/data-service', fetchDataFromService);

router.get('/sales-report', getSalesReport);

router.get('/bandcamp/credentials', getClientCredentials);


  export default router;