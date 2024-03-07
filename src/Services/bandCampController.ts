import dotenv from 'dotenv';
import Bandcamp from "@nutriot/bandcamp-api";
import fetch from 'node-fetch';
import { BandcampSalesReport } from '../Models/BandCampSchema';

dotenv.config();

interface BandcampTokenResponse {
    ok: boolean;
    access_token: string;
    token_type: string;
    expires_in: number;
    expires_at?: number;
    refresh_token: string;
}

let currentAccessToken: string | null = null;
let currentExpiresAt: number | null = null;
let currentRefreshToken: string | null = null;

const api = new Bandcamp({
    id: process.env.BANDCAMP_CLIENT_ID as string,
    secret: process.env.BANDCAMP_CLIENT_SECRET as string,
});

export const getClientCredentials = async () => {
    console.log(`Attempting to fetch client credentials at ${new Date().toISOString()}`);
    try {
        console.log('fetching bandcamp client credentials')
        const response = await api.getClientCredentials();
        if (!response || !response.ok) {
            console.error('getClientCredentials did not fetch a valid response:', response);
            return null;
        }
        console.log('Credentials fetched:', response);
        const tokenResponse = response as unknown as BandcampTokenResponse;
        const expires_in = 30;

        const expires_at = Date.now() + expires_in * 1000;

        console.log("Access Token:", tokenResponse.access_token);
        console.log("Refresh Token:", tokenResponse.refresh_token);

        currentAccessToken = tokenResponse.access_token;
        currentExpiresAt = expires_at;
        currentRefreshToken = tokenResponse.refresh_token;

        return { access_token: tokenResponse.access_token, refresh_token: tokenResponse.refresh_token, expires_at };

    } catch (error) {
        const message = (error instanceof Error) ? error.message : 'Unknown error';
        console.error('Error fetching client credentials:', message);
        console.error(`Error occurred at ${new Date().toISOString()}:`, error);
        return null;
    }
};

export const refreshAccessToken = async () => {
    console.log(`Attempting to refresh access token at ${new Date().toISOString()}`);
    try {
        if (!currentRefreshToken) {
            throw new Error('Refresh token not found.');
        }

        const response = await api.refreshToken(currentRefreshToken);
        const tokenResponse = response as unknown as BandcampTokenResponse;
        const expires_in = 30;
        const expires_at = Date.now() + expires_in * 1000;

        console.log("New Access Token:", tokenResponse.access_token);
        console.log('test accomplished');

        currentAccessToken = tokenResponse.access_token;
        currentExpiresAt = expires_at;

        return { access_token: tokenResponse.access_token, expires_at };
    } catch (error) {
        console.error('Error refreshing access token:', error);
        console.error(`Error occurred at ${new Date().toISOString()}:`, error);
        throw new Error('Failed to refresh access token');
    }
};

const isAccessTokenExpired = () => {
    if (!currentExpiresAt) {
        return true;
    }
    return Date.now() >= currentExpiresAt;
};

export const ensureValidAccessToken = async () => {
    if (isAccessTokenExpired() && currentRefreshToken) {
        const newCreds = await refreshAccessToken();
        if (newCreds) {
            currentAccessToken = newCreds.access_token;
            currentExpiresAt = newCreds.expires_at;
        }
    }
    return currentAccessToken;
};

export const tokenAccess = currentAccessToken

export const getMyBands = async () => {
    try {
        console.log('Fetching my bands from Bandcamp...');
        const bands = await api.getMyBands(currentAccessToken as string);
        console.log('Bands fetched:', bands);
        return bands;
    } catch (err) {
        console.log('Error Fetching Bands')
    }
}

export const band = getMyBands

export const startDate = "2015-01-01"


export const getSalesReport = async (): Promise<BandcampSalesReport[]> => {
    try {
        await ensureValidAccessToken();
        const report = await api.getSalesReport(currentAccessToken as string, { band_id: 3460825363, start_time: startDate });

        if (typeof report !== 'object' || report === null) {
            console.error('Sales report data is not in the expected object format.');
            return [];
        }

        const salesReportArray = Object.entries(report).map(([id, details]) => ({
            unique_bc_id: id,
            date: new Date(details.date),
            paid_to: details.paid_to,
            item_type: details.item_type,
            item_name: details.item_name,
            artist: details.artist,
            currency: details.currency,
            item_price: details.item_price,
            quantity: details.quantity,
            discount_code: details.discount_code,
            sub_total: details.sub_total,
            shipping: details.shipping,
            ship_from_country_name: details.ship_from_country_name,
            transaction_fee: details.transaction_fee,
            fee_type: details.fee_type,
            item_total: details.item_total,
            amount_you_received: details.amount_you_received,
            bandcamp_transaction_id: details.bandcamp_transaction_id,
            paypal_transaction_id: details.paypal_transaction_id,
            net_amount: details.net_amount,
            package: details.package,
            option: details.option,
            item_url: details.item_url,
            catalog_number: details.catalog_number,
            upc: details.upc,
            isrc: details.isrc,
            buyer_name: details.buyer_name,
            buyer_email: details.buyer_email,
            buyer_phone: details.buyer_phone,
            buyer_note: details.buyer_note,
            ship_to_name: details.ship_to_name,
            ship_to_street: details.ship_to_street,
            ship_to_street_2: details.ship_to_street_2,
            ship_to_city: details.ship_to_city,
            ship_to_state: details.ship_to_state,
            ship_to_zip: details.ship_to_zip,
            ship_to_country: details.ship_to_country,
            ship_to_country_code: details.ship_to_country_code,
            ship_date: details.ship_date,
            ship_notes: details.ship_notes,
            country: details.country,
            country_code: details.country_code,
            region_or_state: details.region_or_state,
            city: details.city,
            referer: details.referer,
            referer_url: details.referer_url,
            sku: details.sku,
            seller_tax: details.seller_tax,
            marketplace_tax: details.marketplace_tax,
        }));

        console.log('Transformed Sales Report:', salesReportArray);
        return salesReportArray;

    } catch (error) {
        console.error('Error fetching sales report:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

// export const getSalesReport = async () => {
//     try {
//         const salesReport = await api.getSalesReport(currentAccessToken as string, { band_id: 3460825363, start_time: startDate })
//         // console.log('Sales Report:', salesReport);
//         return { salesReport }
//     } catch (error) {
//         const message = (error instanceof Error) ? error.message : 'Unknown error';
//         console.error('Error fetching Report:', message);
//         return { message }
//     }

// }

