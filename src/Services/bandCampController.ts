import dotenv from 'dotenv';
import Bandcamp from "@nutriot/bandcamp-api";
import fetch from 'node-fetch';

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
export const startDate = "2024-03-05"

export const getSalesReport = async () => {
    try {
        const salesReport = await api.getSalesReport(currentAccessToken as string, { band_id: 3460825363, start_time: startDate })
        console.log('Sales Report:', salesReport);
        return { salesReport }
    } catch (error) {
        const message = (error instanceof Error) ? error.message : 'Unknown error';
        console.error('Error fetching Report:', message);
        return { message }
    }

}