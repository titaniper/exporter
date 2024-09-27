import 'reflect-metadata';
import Koa from 'koa';
import Router from '@koa/router';
import next from 'next';
import gracefulShutdown from 'http-graceful-shutdown';

const appServerPort = Number(process.env.PORT || 3000);
const app = next({ dev: process.env.NODE_ENV === "development", port: appServerPort });
const handle = app.getRequestHandler();

app.prepare()
    .then(async () => {
        const app = new Koa();
        const router = new Router();

        router.get('/ping', async (ctx) => {
            ctx.body = 'pong';
        });
        router.all('(.*)', async (ctx) => {
            console.log('ctx.req.url', ctx.req.url);
            ctx.status = 200;
            await handle(ctx.req, ctx.res);
        });
        app.use(router.routes());
        app.listen(appServerPort, () => {
            console.log(`Server running on port ${appServerPort}`);
        });

        gracefulShutdown(app, {
            signals: 'SIGINT SIGTERM',
            timeout: 30000,
            onShutdown: async () => {
                console.log('The server shuts down when the connection is cleaned up.');
            },
            finally: () => {
                console.log('bye 👋');
                process.exit();
            },
        });
    })
    .catch((err) => {
        // TODO: 에러 로깅
        console.error(err);
        throw err;
    });
