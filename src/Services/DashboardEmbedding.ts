import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();
validateEnvVariables();

export function getMetabaseEmbedding(req: Request, res: Response) {
    try {
        const oneDayInSeconds = 24 * 60 * 60; // 24 hours * 60 minutes * 60 seconds
        const payload = {
            resource: { dashboard: 1 },
            params: {},
            exp: Math.round(Date.now() / 1000) + oneDayInSeconds, // Expire in 1 day
        };
        if (!process.env.METABASE_SECRET_KEY) {
            throw new Error('METABASE_SECRET_KEY is not defined in your environment.');
        }
        const token = jwt.sign(payload, process.env.METABASE_SECRET_KEY);
        const iframeUrl = `${process.env.METABASE_SITE_URL}/embed/dashboard/${token}#bordered=false&titled=true`;

        res.json({ iframeUrl });
    } catch (error) {
        console.error('Error generating Metabase iframe URL:', error);
        res.status(500).send('Internal Server Error');
    }
}

function validateEnvVariables() {
    const requiredEnvVars = ['METABASE_SECRET_KEY', 'METABASE_SITE_URL'];
    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    if (missingEnvVars.length) {
        throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    }
}
