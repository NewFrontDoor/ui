/* eslint-disable camelcase */
import faker from 'faker';
import {subDays, addDays, addHours} from 'date-fns';

import Calendar from '..';

const now = new Date();
const twoMonthsAgo = subDays(now, 60);
const inTwoMongth = addDays(now, 60);

export function buildEvent() {
  const start_date = faker.date.between(twoMonthsAgo, inTwoMongth);
  const end_date = addHours(start_date, faker.random.number({min: 1, max: 48}));

  return {
    id: faker.random.uuid(),
    calendar_id: faker.random.uuid(),
    name: faker.fake(
      '{{company.bsBuzz}} {{company.bsAdjective}} {{company.bsNoun}}'
    ),
    description: faker.company.catchPhraseDescriptor(),
    where: faker.fake('{{address.streetAddress}} {{address.city}}'),
    start_date,
    end_date,
    color: faker.internet.color()
  };
}

const events = Array.from({length: 70}).map((k, i) => buildEvent(i)).sort((a, b) => a.start_date - b.start_date);

export default {
  component: Calendar,
  props: {
    events
  }
};
