import {GetServerSideProps, NextPage} from 'next';
import Link from 'next/link';
import React from 'react';
// @ts-ignore
import styles from 'styles/Home.module.scss';
import {UAParser} from 'ua-parser-js'; // 解析ua
type Props = {
    browser: { name: string };
}

const Index: NextPage<Props> = (props) => {
    console.log(props.browser);
    return (
        <div>
            <h1>你的浏览器是:{props.browser?.name}</h1>
            <Link href="/posts"><a>文章</a></Link>
        </div>
    );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const ua = context.req.headers['user-agent'];
    const browser = UAParser(ua).browser;
    return {
        props: {
            browser: browser
        }
    };
};