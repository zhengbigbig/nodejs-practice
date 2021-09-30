import React from 'react';
import {getPost, getPostIds, getPosts} from '../../lib/posts';
import {NextPage} from 'next';
import {Posts} from '../../additional';

type Props = {
    post: Posts
}

const postsShow: NextPage<Props> = (props) => {
    const {htmlContent} = props.post;
    return (
        <div>
            <h1>文章详情</h1>
            <article dangerouslySetInnerHTML={{__html:htmlContent}}></article>
        </div>
    );
};

export default postsShow;

export const getStaticPaths = async () => {
    const ids = await getPostIds();
    return {
        paths: ids?.map(d => ({params: {id: d}})),
        fallback:false
    };
};

export const getStaticProps = async (x: any) => {
    const id = x.params.id;
    const post = await getPost(id);
    return {
        props: {
            post: post
        }
    };
};