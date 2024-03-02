import axios from 'axios';
import { Request, Response } from 'express';
import pool from './Database'; // Make sure you have a file that exports the configured pool

export const fetchDataFromService = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(
            'https://info.dengue.mat.br/api/alertcity?geocode=5300108&disease=dengue&format=json&ew_start=1&ew_end=50&ey_start=2010&ey_end=2024'
        );
        const insertQuery = `
      INSERT INTO dengue_data (
        data_iniSE, SE, casos_est, casos_est_min, casos_est_max, casos, p_rt1,
        p_inc100k, Localidade_id, nivel, id, versao_modelo, tweet, Rt, pop,
        tempmin, umidmax, receptivo, transmissao, nivel_inc, umidmed, umidmin,
        tempmed, tempmax, casprov, casprov_est, casprov_est_min, casprov_est_max,
        casconf, notif_accum_year
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16,
        $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30
      )
    `;

        // Assuming response.data is an array of objects
        for (const item of response.data) {
            const values = [
                item.data_iniSE, item.SE, item.casos_est, item.casos_est_min, item.casos_est_max, item.casos, item.p_rt1,
                item.p_inc100k, item.Localidade_id, item.nivel, item.id, item.versao_modelo, item.tweet, item.Rt, item.pop,
                item.tempmin, item.umidmax, item.receptivo, item.transmissao, item.nivel_inc, item.umidmed, item.umidmin,
                item.tempmed, item.tempmax, item.casprov, item.casprov_est, item.casprov_est_min, item.casprov_est_max,
                item.casconf, item.notif_accum_year
            ];
            await pool.query(insertQuery, values);
        }

        res.json({ message: 'Data inserted successfully' });
    } catch (error) {
        console.error('There was an error fetching the data:', error);
        if (axios.isAxiosError(error) && error.response) {
            // This will log the full response from the Axios error if available
            console.error(error.response.data);
        }
        res.status(500).send('Internal Server Error');
    }
};
