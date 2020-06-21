/** @jsx jsx */
import {jsx} from 'theme-ui';
import {Navlink} from '../src';

const props = {
  href: 'https://www.newfrontdoor.org'
};

export default {
  default: () => {
    return (
      <ul>
        <Navlink {...props}>NEw FRont DOor</Navlink>
      </ul>
    );
  },
  active: () => {
    return (
      <ul
        sx={{
          listStyle: 'none',
          margin: '0',
          padding: '1rem',
          bg: 'primary'
        }}
      >
        <Navlink {...props}>NEw FRont DOor</Navlink>
        <Navlink active {...props}>
          Active Link
        </Navlink>
      </ul>
    );
  }
};
