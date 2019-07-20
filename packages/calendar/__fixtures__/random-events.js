/* eslint-disable camelcase */
import faker from 'faker';
import {startOfMonth, endOfMonth, addHours} from 'date-fns';

import Calendar from '../src';

export function buildEvent(currentDate) {
  const twoMonthsAgo = startOfMonth(currentDate);
  const inTwoMonths = endOfMonth(currentDate);

  const start_date = faker.date.between(twoMonthsAgo, inTwoMonths);
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

const client = {
  fetchEvents(currentDate) {
    const events = Array.from({length: 50})
      .map(() => buildEvent(currentDate))
      .sort((a, b) => a.start_date - b.start_date);

    return Promise.resolve(events);
  }
};

export default {
  component: Calendar,
  props: {
    client,
    initialView: 'month'
  }
};
