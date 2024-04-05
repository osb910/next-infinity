'use server';

import aiWrite from '@/lib/ai/text/to-text/openai';
import {env} from '@/lib/helpers';
import {dates} from '@/utils/date';

export const fetchStockData = async (tickers: Array<string>) => {
  try {
    const stockData = await Promise.all(
      tickers.map(async ticker => {
        const url = `https://api.polygon.io/v2/aggs/ticker/${ticker}/range/1/day/${
          dates.startDate
        }/${dates.endDate}?apiKey=${env('POLYGON_API_KEY')}`;
        const response = await fetch(url);
        const data = await response.text();
        return data;
      })
    );
    return stockData;
  } catch (err) {
    console.error('error: ', err);
    // return {
    //   status: 'error',
    //   message: 'There was an error fetching stock data.',
    // };
  }
};

export const fetchReport = async (data: Array<string>) => {
  try {
    const report = await aiWrite({
      messages: data,
      systemMsg:
        'You are a trading guru with enormous stock knowledge and resources. Given data on share prices over the past 3 days, generate a report of no more than 150 words describing the stocks performance and recommending whether to buy or sell the shares.',
    });
    return report.status === 'error'
      ? report
      : {...report, status: 'success', text: report.messages[0].content ?? ''};
  } catch (err) {
    console.error('error: ', err);
  }
};
