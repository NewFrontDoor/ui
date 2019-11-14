import Text from 'mineral-ui/Text';
import {themed} from 'mineral-ui/themes';

export default themed(Text)(({theme, element}) => ({
  fontFamily:
    theme[`${element}_fontFamily`] ||
    theme.heading_fontFamily ||
    theme.fontFamily
}));
