import React, {useEffect, useState} from 'react';
import Blog, { drupalClient } from '../src';

const apiUrl =
    'https://api.armadalechurch.org/api/views/all_blog_posts_api';

const client = drupalClient(apiUrl);

function drupalBlog(){
    const [data, setData] = useState([]);
    useEffect(() => {
      client
        .fetchPosts()
        .then(result => {
          setData(result);
        })
        .catch(err => {
          console.error(err);
        })
    }, [client]);
    return(<Blog posts={data} />)

}
export default {drupalBlog};
