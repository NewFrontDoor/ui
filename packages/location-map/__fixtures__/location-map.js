import {MapLayout, MapLayoutSimple} from '../src';

export default [
  {
    component: MapLayout,
    props: {
      heading: 'Summerleas Christian Church',
      actions: [{text: 'visit', slug: 'test'}],
      details: [
        {type: 'time', value: '9:30am'},
        {type: 'location', value: '27 Nautilus Grove, Huntingfield, TAS'}
      ],
      location: {
        location: {lat: -42.998185, lng: 147.29004},
        latcentrepoint: -42.998185,
        lngcentrepoint: 147.29004
      },
      mapsKey: 'AIzaSyBTThwaQ-dHQVR-gjylEOexM1TdWKl7RRQ'
    }
  },
  {
    component: MapLayoutSimple,
    props: {
      heading: 'Summerleas Christian Church',
      actions: [{text: 'visit', slug: 'test'}],
      details: [
        {type: 'time', value: '9:30am'},
        {type: 'location', value: '27 Nautilus Grove, Huntingfield, TAS'}
      ],
      location: {
        location: {lat: -42.998185, lng: 147.29004},
        latcentrepoint: -42.998185,
        lngcentrepoint: 147.29004
      },
      mapsKey: 'AIzaSyBTThwaQ-dHQVR-gjylEOexM1TdWKl7RRQ'
    }
  }
];
