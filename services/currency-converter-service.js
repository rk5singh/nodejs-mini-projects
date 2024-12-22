import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { config } from 'dotenv';
import https from 'https';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: join(__dirname, '../.env') });

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// const apiKey = '5c5364d700aeb39a5c90ec5b';
// const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;
const apiKey = process.env.EXCHANGE_API_KEY;
const baseUrl = process.env.EXCHANGE_BASE_URL;
const url = `${baseUrl}/${apiKey}/latest/USD`;

https.get(url, (response) => {
    let data = '';

    response.on('data', (chunk) => {
        data += chunk;
    });

    response.on('end', () => {
        const rates = JSON.parse(data).conversion_rates;
        // console.log(rates);

        rl.question(`Enter the amount in USD: `, (amount) => {
            rl.question(`Enter the target currency (e.g. INR, EUR, NPR)`, (currency) => {
                const rate = rates[currency.toUpperCase()];
                if(rate) {
                    console.log(`Converted USD amount in ${currency}: ${amount*rate}`);
                } else {
                    console.log('Invalid currency code');
                }
                rl.close();
            })
        })
    });
})
