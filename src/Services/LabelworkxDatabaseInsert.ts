import fs from 'fs';
import csvParser from 'csv-parser';
import { labelworkxdb } from './DatabaseConfig';
import { LabelworkxSalesReport } from '../Models/LabelworkxDbSchema';

export const importCsvData = async (filePath: string): Promise<void> => {
    const results: LabelworkxSalesReport[] = [];

  fs.createReadStream(filePath)
    .pipe(csvParser({
      mapHeaders: ({ header }) => header.trim()
    }))
    .on('data', (data) => results.push({
      labelName: data['Label Name'],
      catalog: data['Catalog'],
      releaseArtist: data['Release Artist'],
      releaseName: data['Release Name'],
      trackArtist: data['Track Artist'],
      trackTitle: data['Track Title'],
      mixName: data['Mix Name'],
      format: data['Format'],
      saleType: data['Sale Type'],
      qty: parseInt(data['Qty'], 10),
      value: parseFloat(data['Value']),
      royaltyISRC: data['Royalty ISRC'],
      EAN: data['EAN'],
      storeName: data['Store Name']
    }))
    .on('end', async () => {
        for (const item of results) {
          try {
            console.log('Inserting item:', item);
  
            const result = await labelworkxdb.insertInto('labelworkx_sales_report').values(item).execute();
  
            console.log('Insert result:', result);
          } catch (error) {
            console.error('Error inserting item:', item, error);
          }
        }
        console.log('CSV data import process completed.');
      });
  };