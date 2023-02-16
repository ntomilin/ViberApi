import https from 'https';

async function post(_url: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
        const url: URL = new URL(_url);

        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST'
        };

        let data: string = '';
        const req = https.request(options, (res) => {
            res.on('data', (_data) => {
                data += _data;
            });
        });

        req.on('finish', () => {
            return resolve(data);
        })

        req.on('error', (error) => {
            return reject(error);
        });

        req.end();
    });
}

export {
    post,
};
