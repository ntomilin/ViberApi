import https, { RequestOptions } from 'https';
import { IncomingMessage } from 'http';

async function post<T extends object>(urlString: string, options = {}, body?: T): Promise<any> {
    const url: URL = new URL(urlString);

    const defaultOptions = {
        ...options,
        hostname: url.hostname,
        path: url.pathname,
        method: 'POST'
    };

    return makeRequest(defaultOptions, body || {});
}

async function makeRequest(options: RequestOptions, requestBody: object) {
    const body: Buffer[] = [];
    return new Promise((resolve, reject) => {
        const onData = (chunk: Buffer) => {
            body.push(chunk);
        }

        const onEnd = () => {
            console.log(body.toString());
            resolve(JSON.parse(Buffer.concat(body).toString()));
        }

        const req = https.request(options, (res: IncomingMessage) => {
            res.on('data', onData);
            res.on('end', onEnd)
        })
            .on('error', reject)

        req.write(JSON.stringify(requestBody));
        req.end();
    });
}

export {
    post,
};
