import React from 'react';
import {Link} from '../src';

const props = {
  href: 'https://www.newfrontdoor.org'
};

const fixtures = {
  external: <Link {...props}>NEw FRont DOor</Link>,
  internal: <Link href="sermons">Link to /sermons</Link>
};

export default fixtures;
