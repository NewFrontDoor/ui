import React from 'react';
import {Blog} from '../src';

const props = {
  posts: [
    {
      title: 'Returning to campus',
      _createdAt: '2018-09-25T08:11:14Z',
      body:
        'When Jesus gave the great commission to his disciples he said, Matthew 28:18 Then Jesus came to them and said, All authority in heaven and on earth has been given to me. 19 Therefore go and make disciples of all nations, baptising them in the name of the Father and of the Son and of the Holy Spirit, 20 and teaching them to obey everything I have commanded you. And surely I am with you always, to the very end of the age. This is, in a nutshell, the mission of the church. Almost every church who has taken the time to write a mission statement has connected what they want to do with what Jesus commanded his first disciples to do in this passage. This website has a particular interest in thinking about how men and women can serve in ministry together. So, it’s worth thinking about this passage, where the mission of the church is clearly stated, and what it says to those thinking about men and women on mission together. The first thing to recognise is that these verses are full of universal statements. Jesus says, all authority has been given to him. He says to make disciples of all the nations. He says to teach the disciples of the nations to obey everything that he has commanded them. Finally, he says that Jesus will be with us always. These statements are unqualified, as seems appropriate for the last thing that Jesus would say before ascending to the Father. The second thing to notice is the way these universal commands apply to the passage itself. Jesus gives a command, ‘Go and make disciples of all the nations…’. Then he says, as part of this command, teach ‘them to obey everything I have commanded you.’ It would seem odd, if somehow the universal command to ‘go and make disciples’ was not included in the command to teach ‘everything I have commanded you’. Therefore, the command to go and make disciples is a command for all the believers who followed the original disciples. So, what we can deduce from this is that making disciples is something that we all have a responsibility to do. All of us. It does not matter what nation we are from, nor what time we live in, nor how long we have been a believer, nor does it matter if we are a man or a woman. What this could like though can vary considerably depending on our context. While it is clear that Jesus is making a grand universal statement about the importance that everyone goes and make disciples, he doesn’t here tell us what this will look like in every situation and in every context. We must baptize disciples in the name of the Father, Son and Spirit but that doesn’t mean that is all God has to say on how we disciple people. The rest of the New Testament gives us all sorts of examples of what the first followers of Christ did in their contexts. Sometimes, they even give us some clear instruction on good practice. It is then, in part, the work of every person who takes Jesus’ command to make disciples seriously to think through what this will look like in their own context using the biblical wisdom that God has given to us. So, to sum up, Jesus words here in Matthew 28 (often called the ‘Great Commission’) are for men and women, but we need the rest of the Scriptures to lead us in what this can look like in our local contexts. It is our hope that the WMPCA website will assist all our readers to do this well. This task is something that we all need to seek to do by the power of God’s spirit, humbly sitting under God’s Word, and being led by the wisdom of Christ, in order to glorify the Father. May the resources you find here bless you and whatever godly ministry you are in.',
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

export default (
  <Blog
    {...props}
    link={(link, children) => <a href={link}>{children}</a>}
    blockText={text => <p>{text}</p>}
  />
);
