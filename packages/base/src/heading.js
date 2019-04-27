import Text from 'mineral-ui/Text';
import { createThemedComponent } from 'mineral-ui/themes';

export default createThemedComponent(Text, ({theme, element}) => ({
  fontFamily: theme[`${element}_fontFamily`] || theme.heading_fontFamily || theme.fontFamily
}));
