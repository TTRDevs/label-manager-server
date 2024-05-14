// ImportZebralutionData.ts
import fs from 'fs';
import path from 'path';
import { CellValue, Workbook } from 'exceljs';
import { zebralutiondb } from './DatabaseConfig';
import { ZebralutionSalesReport } from '../Models/ZebralutionDbSchema';

export const importZebralutionData = async (fileName: string): Promise<void> => {
    const filePath = path.resolve(__dirname, '../Assets/Spreadsheets', fileName);
    const workbook = new Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet(1); // Assuming data is in the first sheet

    if (!worksheet) {
        console.error(`Worksheet not found in the file ${fileName}`);
        return;
    }

    const results: ZebralutionSalesReport[] = [];
    worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber > 1) {
            const data = row.values;
            const entry: ZebralutionSalesReport = {
                period: String((data as CellValue[])[1]),
                periodSold: String((data as CellValue[])[2]),
                code: String((data as CellValue[])[3]),
                name: String((data as CellValue[])[4]),
                licenseCc: String((data as CellValue[])[5]),
                label: String((data as CellValue[])[6]),
                lc: String((data as CellValue[])[7]),
                artist: String((data as CellValue[])[8]),
                title: String((data as CellValue[])[9]),
                ean: String((data as CellValue[])[10]),
                isrc: String((data as CellValue[])[11]),
                labelOrderProvider: String((data as CellValue[])[12]),
                shop: String((data as CellValue[])[13]),
                content: String((data as CellValue[])[14]),
                country: String((data as CellValue[])[15]),
                retailPrice: Number((data as CellValue[])[16]),
                retailPricePublic: Number((data as CellValue[])[17]),
                publMin: Number((data as CellValue[])[18]),
                publPiece: Number((data as CellValue[])[19]),
                publEurIncome: Number((data as CellValue[])[20]),
                sharePercent: Number((data as CellValue[])[21]),
                shareEur: Number((data as CellValue[])[22]),
                sales: Number((data as CellValue[])[23]),
                revenueEur: Number((data as CellValue[])[24]),
                revLessPublEur: Number((data as CellValue[])[25]),
            };
            results.push(entry);
        }
    });

    try {
        console.log(`Beginning batch insert of items from file ${fileName}...`);
        const result = await zebralutiondb.insertInto('zebralution_sales_report').values(results).execute();
        console.log('Insert result:', result);
    } catch (error) {
        console.error('Error during batch insert:', error);
    }
};
