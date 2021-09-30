import React from 'react';
import Head from 'next/head';
import 'styles/globals.scss';
import type {AppProps} from 'next/app';

function MyApp({Component, pageProps}: AppProps) {
    return (
        <div>
            <Head>
                <title>文章</title>
                <meta name="viewport"
                      content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
            </Head>
            <Component {...pageProps} />
        </div>
    );
}

export default MyApp;
