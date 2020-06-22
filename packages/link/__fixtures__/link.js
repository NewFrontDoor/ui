import React from 'react';
import {Link} from '../src';

const props = {
  href: 'https://www.newfrontdoor.org'
};

export default {
  external: <Link {...props}>NEw FRont DOor</Link>,
  internal: (
    <Link isInternal href="sermons">
      Link to /sermons
    </Link>
  )
};
