const mockResponse = {
  json: jest.fn().mockImplementation(() => {
    return Promise.resolve([
      {
        bookname: 'Genesis',
        chapter: '1',
        verse: '1',
        text: 'In the beginning God created the heavens and the earth.',
        title: 'The Creation of the World',
        titles: ['The Creation of the World']
      }
    ]);
  })
};

const ky = jest.fn().mockImplementation(() => mockResponse);

export default ky;
