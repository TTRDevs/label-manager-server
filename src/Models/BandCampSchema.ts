export interface BandcampSalesReport {
    unique_bc_id: string;
    date: Date | null;
    paid_to: string;
    item_type: string;
    item_name: string;
    artist: string;
    currency: string;
    item_price: number;
    quantity: number;
    discount_code: string | null;
    sub_total: number;
    shipping: number | null;
    ship_from_country_name: string | null;
    transaction_fee: number;
    fee_type: string;
    item_total: number;
    amount_you_received: number;
    bandcamp_transaction_id: string;
    paypal_transaction_id: string | null;
    net_amount: number;
    package: string | null;
    option: string | null;
    item_url: string | null;
    catalog_number: string | null;
    upc: string | null;
    isrc: string | null;
    buyer_name: string | null;
    buyer_email: string | null;
    buyer_phone: string | null;
    buyer_note: string | null;
    ship_to_name: string | null;
    ship_to_street: string | null;
    ship_to_street_2: string | null;
    ship_to_city: string | null;
    ship_to_state: string | null;
    ship_to_zip: string | null;
    ship_to_country: string | null;
    ship_to_country_code: string | null;
    ship_date: string | null;
    ship_notes: string | null;
    country: string | null;
    country_code: string | null;
    region_or_state: string | null;
    city: string | null;
    referer: string | null;
    referer_url: string | null;
    sku: string | null;
    seller_tax: number | null;
    marketplace_tax: number | null;
}

export interface Database {
    sales_report: BandcampSalesReport;
}

// export const BandcampSalesReport = {
//     unique_bc_id: { type: 'string' },
//     date: { type: 'date' },
//     paid_to: { type: 'string' },
//     item_type: { type: 'string' },
//     item_name: { type: 'string' },
//     artist: { type: 'string' },
//     currency: { type: 'string' },
//     item_price: { type: 'number' },
//     quantity: { type: 'number' },
//     discount_code: { type: 'string' },
//     sub_total: { type: 'number' },
//     shipping: { type: 'number' },
//     ship_from_country_name: { type: 'string' },
//     transaction_fee: { type: 'number' },
//     fee_type: { type: 'string' },
//     item_total: { type: 'number' },
//     amount_you_received: { type: 'number' },
//     bandcamp_transaction_id: { type: 'string' },
//     paypal_transaction_id: { type: 'string' },
//     net_amount: { type: 'number' },
//     package: { type: 'string' },
//     option: { type: 'string' },
//     item_url: { type: 'string' },
//     catalog_number: { type: 'string' },
//     upc: { type: 'string' },
//     isrc: { type: 'string' },
//     buyer_name: { type: 'string' },
//     buyer_email: { type: 'string' },
//     buyer_phone: { type: 'string' },
//     buyer_note: { type: 'string' },
//     ship_to_name: { type: 'string' },
//     ship_to_street: { type: 'string' },
//     ship_to_street_2: { type: 'string' },
//     ship_to_city: { type: 'string' },
//     ship_to_state: { type: 'string' },
//     ship_to_zip: { type: 'string' },
//     ship_to_country: { type: 'string' },
//     ship_to_country_code: { type: 'string' },
//     ship_date: { type: 'string' },
//     ship_notes: { type: 'string' },
//     country: { type: 'string' },
//     country_code: { type: 'string' },
//     region_or_state: { type: 'string' },
//     city: { type: 'string' },
//     referer: { type: 'string' },
//     referer_url: { type: 'string' },
//     sku: { type: 'string' },
//     seller_tax: { type: 'number' },
//     marketplace_tax: { type: 'number' },
// };