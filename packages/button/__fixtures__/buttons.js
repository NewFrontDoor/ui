import Button from '..';

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

const appearances = [
  'regular',
  'outline',
  'ghost',
  'highlight',
  'lowlight',
  'link',
  'muted'
].map(appearance => ({
  component: Button,
  name: capitalize(appearance),
  props: {
    appearance,
    children: capitalize(appearance)
  }
}));

export default [...appearances];
