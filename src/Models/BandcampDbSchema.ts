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

export interface BandcampDatabase {
    sales_report: BandcampSalesReport;
}