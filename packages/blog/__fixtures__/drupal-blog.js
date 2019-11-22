import React from 'react';
import Blog, { drupalClient } from '../src';

const apiUrl =
    'https://api.armadalechurch.org/api/views/all_blog_posts_api';

export default <Blog client={drupalClient(apiUrl)} />;