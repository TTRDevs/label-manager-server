import { SaleItem } from '../Models/SalesReportTypes';
import pool from './Database';

export const fetchDataFromService = async (salesReportData: Record<string, SaleItem>): Promise<void> => {
    try {
      if (!salesReportData) {
        console.error('No sales report data was retrieved.');
        return;
      }
      
      for (const [unique_bc_id, saleItem] of Object.entries(salesReportData)) {
            const saleDate = saleItem.date ? new Date(saleItem.date).toISOString() : null;

            const insertQuery = `
          INSERT INTO sales_reports (
            unique_bc_id, date, paid_to, item_type, item_name, artist, currency, item_price, quantity,
            discount_code, sub_total, shipping, ship_from_country_name, transaction_fee, fee_type,
            item_total, amount_you_received, bandcamp_transaction_id, paypal_transaction_id, net_amount,
            package, option, item_url, catalog_number, upc, isrc, buyer_name, buyer_email, buyer_phone,
            buyer_note, ship_to_name, ship_to_street, ship_to_street_2, ship_to_city, ship_to_state,
            ship_to_zip, ship_to_country, ship_to_country_code, ship_date, ship_notes, country,
            country_code, region_or_state, city, referer, referer_url, sku, seller_tax, marketplace_tax
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39,
            $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50
          )
        `;

            const values = [
                unique_bc_id, saleDate, saleItem.paid_to, saleItem.item_type, saleItem.item_name, saleItem.artist,
                saleItem.currency, saleItem.item_price, saleItem.quantity, saleItem.discount_code, saleItem.sub_total,
                saleItem.shipping, saleItem.ship_from_country_name, saleItem.transaction_fee, saleItem.fee_type,
                saleItem.item_total, saleItem.amount_you_received, saleItem.bandcamp_transaction_id, saleItem.paypal_transaction_id,
                saleItem.net_amount, saleItem.package, saleItem.option, saleItem.item_url, saleItem.catalog_number, saleItem.upc,
                saleItem.isrc, saleItem.buyer_name, saleItem.buyer_email, saleItem.buyer_phone, saleItem.buyer_note,
                saleItem.ship_to_name, saleItem.ship_to_street, saleItem.ship_to_street_2, saleItem.ship_to_city, saleItem.ship_to_state,
                saleItem.ship_to_zip, saleItem.ship_to_country, saleItem.ship_to_country_code, saleItem.ship_date, saleItem.ship_notes,
                saleItem.country, saleItem.country_code, saleItem.region_or_state, saleItem.city, saleItem.referer, saleItem.referer_url,
                saleItem.sku, saleItem.seller_tax, saleItem.marketplace_tax
            ];

            await pool.query(insertQuery, values);
        }

        console.log('Data inserted successfully');
    } catch (error) {
        console.error('There was an error fetching and inserting the data:', error);
        throw error;
    }
};
