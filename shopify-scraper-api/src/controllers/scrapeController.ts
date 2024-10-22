import express from "express";
import {scrapeShopifyPage} from '../services/scraperService';
import{ formatErrorResponse, formatSuccessResponse } from '../utils/responseHelper';

export const scrapeRouter = express.Router();

scrapeRouter.get('/scrape', async (req, res) => {
    const url = req.query.url as string;

    if(!url) {
        return res.status(400).json(formatErrorResponse('No URL provided.'));
    }

    try {
        const result = await scrapeShopifyPage(url);
        res.status(200).json(formatSuccessResponse(result));
    } catch (error:any) {
        res.status(500).json(formatErrorResponse('Failed to scrape the page.', error.message))
    }
});