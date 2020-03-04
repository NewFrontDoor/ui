import React from 'react';
import {PostPage} from '../src';

const props = {
  post: {
    title: 'Returning to campus',
    _createdAt: '2018-09-25T08:11:14Z',
    body:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id mollis erat. Vestibulum suscipit tincidunt commodo.</p>',
    author: 'Alan Reader',
    slug: 'returning-to-campus',
    categories: [
      {
        title: 'AFES'
      },
      {
        title: 'Supporters'
      },
      {
        title: 'Uni Fellowship'
      }
    ]
  }
};

export default <PostPage {...props} />;
