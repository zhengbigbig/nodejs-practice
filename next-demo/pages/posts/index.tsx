import {GetStaticProps, NextPage} from 'next';
import {getPosts} from 'lib/posts';
import {Posts} from 'additional';


type Props = {
    posts:Posts[];
}

const PostsIndex: NextPage<Props> = (props) => {
    return (
        <div>
            {
                props.posts.map(p=><div key={p.id}>{p.title}</div>)
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