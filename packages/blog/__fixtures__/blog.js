import React from 'react';
import {Blog} from '../src';

const props = {
  posts: [
    {
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
    },
    {
      title: 'Test blog two',
      _createdAt: '2018-09-28T09:11:14Z',
      body:
        '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus id mollis erat. Vestibulum suscipit tincidunt commodo.</p>',
      author: 'Alan Reader',
      slug: 'test-blog-two',
      categories: [
        {
          title: 'New Front Door'
        },
        {
          title: 'Category two'
        }
      ]
    }
  ]
};

export default <Blog {...props} />;
