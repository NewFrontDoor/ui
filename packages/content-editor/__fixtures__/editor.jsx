import React from 'react';
import {PTEditor, toSlate} from '../src';

const initialPT = [
  {
    _key: 'c1b5c21ed335',
    _type: 'block',
    children: [
      {
        _key: 'c1b5c21ed3350',
        _type: 'span',
        marks: [],
        text: 'Sunday meetings'
      }
    ],
    markDefs: [],
    style: 'h2'
  },
  {
    _key: 'a345f913565b',
    _type: 'block',
    children: [
      {
        _key: 'a345f913565b0',
        _type: 'span',
        marks: [],
        text: 'We gather at '
      },
      {
        _key: 'a345f913565b0',
        _type: 'span',
        marks: ['strong'],
        text: '4.00pm and 6.00pm'
      },
      {
        _key: 'a345f913565b0',
        _type: 'span',
        marks: [],
        text:
          ' on Sundays to pray, listen to a sermon, sing Christian songs and spend informal time together. Our sermons tend to be exegetical. This means the content comes from a careful, week-by-week study of whole books of the Bible. Occasionally sermons are structured to respond to a topic.'
      }
    ],
    markDefs: [],
    style: 'normal'
  },
  {
    _key: '72a05efb749a',
    _type: 'block',
    children: [
      {
        _key: '72a05efb749a0',
        _type: 'span',
        marks: [],
        text: '4.00pm Sunday meeting'
      }
    ],
    markDefs: [],
    style: 'h5'
  },
  {
    _key: '7f244c159bba',
    _type: 'block',
    children: [
      {
        _key: '7f244c159bba0',
        _type: 'span',
        marks: [],
        text:
          "We've been meeting at 4.00 for many years. This is our largest service and it has a family focus as most of the people coming along are young families. Creche and Crossroads kids programs run during the meeting. This caters for kids from infants to age 7 and is run by screened volunteers. We sing around 5 songs a mix of classic hymns and modern songs and listen to a Bible-based sermon. The formal meeting finishes around 5.30pm with drinks and snacks afterwards."
      }
    ],
    markDefs: [],
    style: 'normal'
  },
  {
    _key: '37a76def0721',
    _type: 'block',
    children: [
      {
        _key: '37a76def07210',
        _type: 'span',
        marks: [],
        text: '6.00pm Sunday meeting'
      }
    ],
    markDefs: [],
    style: 'h5'
  },
  {
    _key: 'fcda4e2e8366',
    _type: 'block',
    children: [
      {
        _key: 'fcda4e2e83660',
        _type: 'span',
        marks: [],
        text:
          "Our evening service launched in 2017. As a newer service, it's smaller than 4.00pm but is growing. This meeting has a different feel to 4pm, without the large group of kids (although we have some!). Our people are mainly youth, single people, and couples. People love smaller church services because of the intimacy and the ability to maintain close relationships with most people. So do we! But our vision for this is for it to grow big – because this means more people have access to the life-saving gospel message. The formal meeting ends around 7.30pm. For every month that has 5 Sundays, the last Sunday is set aside for a community meal for all at 4pm and 6pm and anyone else who wants to come."
      }
    ],
    markDefs: [],
    style: 'normal'
  },
  {
    _key: '665d7f96a8c5',
    _type: 'block',
    children: [
      {
        _key: '665d7f96a8c50',
        _type: 'span',
        marks: [],
        text: 'Small groups'
      }
    ],
    markDefs: [],
    style: 'h2'
  },
  {
    _key: '50cba026be06',
    _type: 'block',
    children: [
      {
        _key: '50cba026be060',
        _type: 'span',
        marks: [],
        text:
          'We take seriously our responsibility to keep kids safe and are careful to comply with all government, church, and Biblical requirements. All our volunteers obtain '
      },
      {
        _key: '50cba026be061',
        _type: 'span',
        marks: ['0434c0e5b023'],
        text: 'blue-cards'
      },
      {
        _key: '50cba026be062',
        _type: 'span',
        marks: [],
        text:
          ' before commencing work with children. We also maintain our volunteers’ membership in the Presbyterian church of Australia’s own kid-safe program: '
      },
      {
        _key: '50cba026be063',
        _type: 'span',
        marks: ['17d13c6d9985', 'strong'],
        text: 'Breaking the silence'
      },
      {
        _key: '50cba026be064',
        _type: 'span',
        marks: [],
        text:
          '. As well as teaching and training, this program outlines codes of conduct for teaching, leading, and provides clear authority structures and reporting procedures.'
      }
    ],
    markDefs: [
      {
        _key: '0434c0e5b023',
        _type: 'link',
        href:
          'https://www.cbos.tas.gov.au/topics/licensing-and-registration/registrations/work-with-vulnerable-people'
      },
      {
        _key: '17d13c6d9985',
        _type: 'link',
        href: 'http://www.jerichoroad.org.au/bts/'
      }
    ],
    style: 'normal'
  }
];

export default (
  <div className="App">
    <h1>Portable Text editor</h1>
    <PTEditor initialValue={toSlate(initialPT)} />
  </div>
);
