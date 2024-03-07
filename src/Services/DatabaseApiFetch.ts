// Importing necessary modules and interfaces
import { db } from './Database';
import { BandcampSalesReport } from '../Models/BandCampSchema';

export const fetchDataFromService = async (salesReportData: BandcampSalesReport[]): Promise<void> => {
  if (salesReportData.length === 0) {
    console.error('No sales report data was retrieved.');
    return;
  }

  for (const saleItem of salesReportData) {
    try {
      // Log the values being inserted
      console.log('Inserting sale item:', saleItem);

      // Since the `date` is already a Date object or null, there's no need to convert it
      // Prepare the data for insertion directly using the properties from the saleItem
      const insertData = {
        unique_bc_id: saleItem.unique_bc_id,
        date: saleItem.date, // Directly using Date or null as per the BandcampSalesReport interface
        paid_to: saleItem.paid_to,
        item_type: saleItem.item_type,
        item_name: saleItem.item_name,
        artist: saleItem.artist,
        currency: saleItem.currency,
        item_price: saleItem.item_price,
        quantity: saleItem.quantity,
        discount_code: saleItem.discount_code,
        sub_total: saleItem.sub_total,
        shipping: saleItem.shipping,
        ship_from_country_name: saleItem.ship_from_country_name,
        transaction_fee: saleItem.transaction_fee,
        fee_type: saleItem.fee_type,
        item_total: saleItem.item_total,
        amount_you_received: saleItem.amount_you_received,
        bandcamp_transaction_id: saleItem.bandcamp_transaction_id,
        paypal_transaction_id: saleItem.paypal_transaction_id,
        net_amount: saleItem.net_amount,
        package: saleItem.package,
        option: saleItem.option,
        item_url: saleItem.item_url,
        catalog_number: saleItem.catalog_number,
        upc: saleItem.upc,
        isrc: saleItem.isrc,
        buyer_name: saleItem.buyer_name,
        buyer_email: saleItem.buyer_email,
        buyer_phone: saleItem.buyer_phone,
        buyer_note: saleItem.buyer_note,
        ship_to_name: saleItem.ship_to_name,
        ship_to_street: saleItem.ship_to_street,
        ship_to_street_2: saleItem.ship_to_street_2,
        ship_to_city: saleItem.ship_to_city,
        ship_to_state: saleItem.ship_to_state,
        ship_to_zip: saleItem.ship_to_zip,
        ship_to_country: saleItem.ship_to_country,
        ship_to_country_code: saleItem.ship_to_country_code,
        ship_date: saleItem.ship_date,
        ship_notes: saleItem.ship_notes,
        country: saleItem.country,
        country_code: saleItem.country_code,
        region_or_state: saleItem.region_or_state,
        city: saleItem.city,
        referer: saleItem.referer,
        referer_url: saleItem.referer_url,
        sku: saleItem.sku,
        seller_tax: saleItem.seller_tax,
        marketplace_tax: saleItem.marketplace_tax,
      };

      // Perform the insert operation
      const result = await db.insertInto('sales_report').values(insertData).execute();

      // Log the result of the insert operation
      console.log('Insert result:', result);
    } catch (error) {
      // If an error occurs while inserting an item, log it and continue with the next item
      console.error('Error inserting sale item:', saleItem, error);
    }
  }

  console.log('Data insertion process completed.');
};
