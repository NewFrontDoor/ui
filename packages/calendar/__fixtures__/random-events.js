/* eslint-disable camelcase */
import faker from 'faker';
import {subMonths, addMonths, addHours} from 'date-fns';

import CalendarWrapper from '../src';

const now = new Date();
const twoMonthsAgo = subMonths(now, 2);
const inTwoMongth = addMonths(now, 2);

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

const events = Array.from({length: 100})
  .map((k, i) => buildEvent(i))
  .sort((a, b) => a.start_date - b.start_date);

export default {
  component: CalendarWrapper,
  props: {
    events,
    initialView: 'month'
  }
};
