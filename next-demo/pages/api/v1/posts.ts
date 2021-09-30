import { NextApiHandler } from "next";

const Posts: NextApiHandler = (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({name: 'zbb'}));
    res.end();
};

export default Posts;