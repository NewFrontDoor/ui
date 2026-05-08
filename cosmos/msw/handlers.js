import {http, HttpResponse} from 'msw';

const apiViews = 'https://cornerstoneapi.newfrontdoor.org/api/views';

const calendarEvents = [
  {
    id: 'cosmos-calendar-1',
    nid: 'cosmos-calendar-1',
    name: 'Morning Service',
    color: '#2f80ed',
    start_date: '2026-05-10T10:00:00+10:00',
    end_date: '2026-05-10T11:30:00+10:00',
    description: 'Fixture event supplied by MSW.',
    location: 'Main Auditorium',
    where: 'Main Auditorium',
    url: '/events/morning-service'
  },
  {
    id: 'cosmos-calendar-2',
    nid: 'cosmos-calendar-2',
    name: 'Community Dinner',
    color: '#27ae60',
    start_date: '2026-05-13T18:00:00+10:00',
    end_date: '2026-05-13T20:00:00+10:00',
    description: 'Fixture event supplied by MSW.',
    location: 'Hall',
    where: 'Hall',
    url: '/events/community-dinner'
  }
];

const people = [
  {
    name: 'Jane Elder',
    title: 'Elder',
    roles: ['Elder'],
    email: 'jane@example.com',
    image: 'https://vignette.wikia.nocookie.net/gumby/images/c/c7/Gumby_at_his_Desk.jpg'
  },
  {
    name: 'Sam Deacon',
    title: 'Deacon',
    roles: ['Deacon'],
    email: 'sam@example.com',
    image: 'https://vignette.wikia.nocookie.net/gumby/images/c/c7/Gumby_at_his_Desk.jpg'
  },
  {
    name: 'Alex Staff',
    title: 'Staff',
    roles: ['Staff Member'],
    email: 'alex@example.com',
    image: 'https://vignette.wikia.nocookie.net/gumby/images/c/c7/Gumby_at_his_Desk.jpg'
  }
];

const sermon = {
  node_title: 'A Fixture Sermon',
  preacher: 'Jane Speaker',
  datepreached: '2026-05-03',
  url: '/sermons/a-fixture-sermon',
  sermon_img: 'https://cornerstoneapi.newfrontdoor.org/sites/cornerstoneapi.newfrontdoor.org/files/default_images/sermonSeriesImage_1.jpg',
  series_img: 'https://cornerstoneapi.newfrontdoor.org/sites/cornerstoneapi.newfrontdoor.org/files/default_images/sermonSeriesImage_1.jpg',
  sermonseries: 'Fixture Series',
  text: 'Romans 8:31-39'
};

const series = {
  node_title: 'Fixture Series',
  'series thumbnail':
    'https://cornerstoneapi.newfrontdoor.org/sites/cornerstoneapi.newfrontdoor.org/files/default_images/sermonSeriesImage_1.jpg',
  series_img:
    'https://cornerstoneapi.newfrontdoor.org/sites/cornerstoneapi.newfrontdoor.org/files/default_images/sermonSeriesImage_1.jpg',
  image:
    'https://cornerstoneapi.newfrontdoor.org/sites/cornerstoneapi.newfrontdoor.org/files/default_images/sermonSeriesImage_1.jpg',
  url: '/sermons/series/fixture-series',
  series_id: 'fixture-series'
};

export const handlers = [
  http.get('https://serverless.newfrontdoor.org/bible', ({request}) => {
    const passage = new URL(request.url).searchParams.get('passage') ?? 'Romans 8';

    return HttpResponse.json([
      {
        bookname: passage.split(' ')[0] ?? 'Romans',
        chapter: '8',
        verse: '31',
        title: '',
        text: 'If God is for us, who can be against us?'
      },
      {
        bookname: passage.split(' ')[0] ?? 'Romans',
        chapter: '8',
        verse: '32',
        title: '',
        text: 'This fixture response is served by Cosmos MSW.'
      }
    ]);
  }),

  http.get(`${apiViews}/all_events_api`, () => HttpResponse.json(calendarEvents)),
  http.get('https://cornerstoneapi.newfrontdoor.org/api/all-people', () =>
    HttpResponse.json(people)
  ),
  http.get(`${apiViews}/all_sermons_api`, () => HttpResponse.json([sermon])),
  http.get(`${apiViews}/current_series_api`, () => HttpResponse.json([series])),
  http.get(`${apiViews}/recent_series_api`, () =>
    HttpResponse.json([series, {...series, node_title: 'Previous Fixture Series'}])
  ),
  http.get(`${apiViews}/all_sermon_series_api`, () => HttpResponse.json([series])),

  http.post('http://localhost:3000/api/sermon-upload', async ({request}) => {
    const body = await request.json().catch(() => ({name: 'cosmos-upload.mp3'}));
    const key = body.name ?? 'cosmos-upload.mp3';

    return HttpResponse.json({
      url: 'https://sermons.crossroadshobart.org/',
      fields: {
        key,
        Policy: 'cosmos-policy',
        'X-Amz-Signature': 'cosmos-signature'
      }
    });
  }),
  http.post('https://sermons.crossroadshobart.org/', () => new HttpResponse(null, {status: 204})),
  http.head('https://sermons.crossroadshobart.org/*', () => new HttpResponse(null, {status: 200}))
];
