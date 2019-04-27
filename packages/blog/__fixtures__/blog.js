import Blog from '../src';

export default {
  component: Blog,
  props: {
    posts: [
      {
        title: 'Returning to campus',
        _createdAt: '2018-09-28T08:11:14Z',
        body: ['Line one', 'line two', 'line three'],
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
    ]
  }
};
