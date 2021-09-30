import {GetStaticProps, NextPage} from 'next';
import {getPosts} from 'lib/posts';
import {Posts} from 'additional';
import Link from 'next/link';
import React from 'react';


type Props = {
    posts:Posts[];
}

const PostsIndex: NextPage<Props> = (props) => {
    return (
        <div>
            {
                props.posts.map(p=>(
                    <div key={p.id}>
                        <Link href="/posts/[id]" as={`/posts/${p.id}`}>
                            <a>
                                {p.title}
                            </a>
                        </Link>
                    </div>
                ))
            }
        </div>
    );
};

export default PostsIndex;

export const getStaticProps:GetStaticProps = async () => {
    const posts = await getPosts();
    return {
        props: {
            posts: JSON.parse(JSON.stringify(posts))
        }
    };
};