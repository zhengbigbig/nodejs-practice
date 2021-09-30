import {NextPage} from 'next';
import {useRequest} from 'ahooks';

type Posts = {
    id: string;
    title: string;
    date: Date,
    content: string;
}

const PostsIndex: NextPage = () => {
    const {data=[], error, loading} = useRequest<Posts[]>('/api/v1/posts');
    console.log(data);
    return (
        <div>
            {
                data?.map?.(p => <div key={p.id}>{p.title}</div>)
            }
        </div>
    );
};

export default PostsIndex;