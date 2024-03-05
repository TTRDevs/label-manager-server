import express, { Request, Response } from 'express';
import { getMetabaseEmbedding } from '../Services/DashboardEmbedding';
import { fetchDataFromService } from '../Services/DatabaseApiFetch';
import { getClientCredentials, getSalesReport } from '../Services/bandCampController';

const router = express.Router();

router.get('/metabase', getMetabaseEmbedding);

router.get('/data-service', fetchDataFromService);

router.get('/sales-report', getSalesReport);

router.get('/bandcamp/credentials', getClientCredentials);

router.get('/teste', () => {
  console.log('teste 1')
})
  export default router;