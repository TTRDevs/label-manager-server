import fs from 'fs';
import path from 'path';
import { CellValue, Workbook, Worksheet } from 'exceljs';
import { labelworkxdb } from './DatabaseConfig';
import { LabelworkxSalesReport } from '../Models/LabelworkxDbSchema';

// Function to read all files and import data
export const importLabelworkxData = async (): Promise<void> => {
    const directoryPath = path.resolve(__dirname, '../Assets/Spreadsheets');
    
    // Read all files in the directory
    fs.readdir(directoryPath, async (err, files) => {
        if (err) {
            console.error('Error reading the files:', err);
            return;
        }
        
        // Filter files that start with 'labelworkx'
        const labelworkxFiles = files.filter(file => file.startsWith('labelworkx') && file.endsWith('.xlsx'));
        
        for (const file of labelworkxFiles) {
            await importExcelData(file);
        }
    });
};

// Function to import data from a single Excel file
export const importExcelData = async (fileName: string): Promise<void> => {
    const filePath = path.resolve(__dirname, '../Assets/Spreadsheets', fileName);
    const workbook = new Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1); // Access the first sheet (1-indexed in exceljs)

    if (!worksheet) {
        console.error(`Worksheet not found in the file ${fileName}`);
        return; // Early return if no worksheet is found
    }

    const results: LabelworkxSalesReport[] = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 1) { // Assuming the first row is headers
            // Use a more careful approach to ensure type safety
            const data = row.values;
            const entry: LabelworkxSalesReport = {
                labelName: String((data as CellValue[])[1]),
                catalog: String((data as CellValue[])[2]),
                releaseArtist: String((data as CellValue[])[3]),
                releaseName: String((data as CellValue[])[4]),
                trackArtist: String((data as CellValue[])[5]),
                trackTitle: String((data as CellValue[])[6]),
                mixName: String((data as CellValue[])[7]),
                format: String((data as CellValue[])[8]),
                saleType: String((data as CellValue[])[9]),
                qty: Number((data as CellValue[])[10]),
                value: Number((data as CellValue[])[11]),
                royaltyISRC: String((data as CellValue[])[12]),
                EAN: String((data as CellValue[])[13]),
                storeName: String((data as CellValue[])[14]),
            };
            results.push(entry);
        }
    });

    try {
        console.log(`Beginning batch insert of items from file ${fileName}...`);
        const result = await labelworkxdb.insertInto('labelworkx_sales_report').values(results).execute();
        console.log('Insert result:', result);
    } catch (error) {
        console.error('Error during batch insert:', error);
    }
    console.log(`Excel data import process for file ${fileName} completed.`);
};
