import React from 'react';
import Form from '../src';
import bgimg from '../public/PWADbg.jpg';
import mainbg from '../public/PWADbg2.jpg';

const props = {
  title: 'Test PPT Generator',
  description: 'This is a test button for testing PPT generation',
  bgimg,
  mainbg,
  contents: [
    {
      body: `A charge to keep I have,
a God to glorify,
a never-dying soul to save
to live eternally.`
    },
    {
      body: `To serve the present age,
my calling to fulfil:
O may it all my powers employ
to do my Master’s will!`
    },
    {
      body: `Arm me with jealous care,
as in Your sight to live,
and, O, Your servant Lord prepare
a strict account to give.`
    },
    {
      body: `Help me to watch and pray,
and on You, Lord, rely,
and let me ne’er my trust betray,
but press to realms on high.`
    }
  ]
};

export default <Form {...props} />;
