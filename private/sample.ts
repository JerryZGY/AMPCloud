// Node modules
import * as got from 'got';
import * as yargs from 'yargs';
import * as winston from 'winston';
// Sample JSON data
import * as sample from './sample.json';

const logger = new winston.Logger({ transports: [new winston.transports.Console()] });
const url = 'http://localhost:3000/receive';
const argv = yargs
    .option('child', { alias: 'c', type: 'string', demandOption: true, describe: 'Select which child system to send' })
    .option('progress', { alias: 'p', type: 'number', describe: 'Send progress to child system 2|4|5' })
    .argv;

async function main() {
    try {
        const c = `c${argv.child}`;
        if (argv.child === '2' || argv.child === '4' || argv.child === '5') {
            if (argv.progress) {
                sample[c].progress = argv.progress;
            } else {
                logger.error('Please provide progress argv');
                process.exit(1);
            }
        }
        const res = await got.post(url, { body: sample[c] });
        logger.info(`C${argv.child}'s response: ${res.body}`);
    } catch (e) {
        logger.error(e);
    }
}

main().catch(e => {
    logger.error(e);
    process.exit(1);
});