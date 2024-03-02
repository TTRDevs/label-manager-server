"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
function validateEnvVariables() {
    const requiredEnvVars = ['METABASE_SECRET_KEY', 'METABASE_SITE_URL'];
    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);
    if (missingEnvVars.length) {
        throw new Error(`Missing environment variables: ${missingEnvVars.join(', ')}`);
    }
}
// Call this function early in your application startup
validateEnvVariables();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://34.66.213.101:3000', 'http://localhost:5173', "http://34.66.213.101:5432", "http://localhost:3001"],
    credentials: true,
}));
app.get('/metabase', (req, res) => {
    try {
        const payload = {
            resource: { dashboard: 1 },
            params: {},
            exp: Math.round(Date.now() / 1000) + (10 * 60), // 10 minute expiration
        };
        if (!process.env.METABASE_SECRET_KEY) {
            throw new Error('METABASE_SECRET_KEY is not defined in your environment.');
        }
        const token = jsonwebtoken_1.default.sign(payload, process.env.METABASE_SECRET_KEY);
        const iframeUrl = `${process.env.METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;
        res.json({ iframeUrl }); // Send an object with the iframeUrl property
    }
    catch (error) {
        console.error('Error generating Metabase iframe URL:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(3001, () => {
    console.log('Server started on port 3001');
});
