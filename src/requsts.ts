import https, { RequestOptions } from 'https';
import { IncomingMessage } from 'http';

async function post(urlString: string): Promise<any> {
    const url: URL = new URL(urlString);

    const options = {
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST'
    };

    return makeRequest(options);
}

async function makeRequest(options: RequestOptions) {
    const body: Buffer[] = [];
    return new Promise((resolve, reject) => {
        const onData = (chunk: Buffer) => {
            body.push(chunk);
        }

        const onEnd = () => resolve(JSON.parse(Buffer.concat(body).toString()))

        https.request(options, (res: IncomingMessage) => {
            res.on('data', onData);
            res.on('end', onEnd)
        })
            .on('error', reject)
            .end();
    });
}

export {
    post,
};
