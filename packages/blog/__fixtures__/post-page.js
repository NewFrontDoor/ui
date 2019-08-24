import postPage from '../src/post-page';

export default {
  component: postPage,
  props: {
    post: {
      title: 'Returning to campus',
      _createdAt: '2018-09-25T08:11:14Z',
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
  }
};
