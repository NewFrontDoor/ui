import React from 'react';
import PropTypes from 'prop-types';
import {css} from 'emotion';
import styled from 'react-emotion';

const button = ({fit, appearance, size, theme}) => {
  let width = 'auto';
  let textColor = theme.color('button', 'text');
  let hoverTextColor = theme.color('button', 'text');
  let background = 'none';
  let hoverBackground = 'none';
  let boxShadowColor = theme.color('button', 'boxShadow');
  let hoverBoxShadowColor = theme.color('button', 'hoverBoxShadow');
  let fontSize = theme.fontSize('base');
  let padding = `${theme.spacing(1)} ${theme.spacing(2)}`;

  if (fit) {
    width = '100%';
  }

  if (appearance === 'regular') {
    background = theme.color('button');
    hoverBackground = theme.color('button', 'hover');
    hoverTextColor = theme.color('button', 'hoverText');
  }

  if (appearance === 'outline') {
    boxShadowColor = theme.color('button', 'outlineBoxShadow');
    textColor = theme.color('button', 'outlineText');

    hoverBoxShadowColor = theme.color('button', 'outlineHoverBoxShadow');
    hoverBackground = theme.color('button', 'outlineHover');
    hoverTextColor = theme.color('button', 'outlineHoverText');
  }

  if (appearance === 'ghost') {
    boxShadowColor = theme.color('button', 'ghostBoxShadow');
    textColor = theme.color('button', 'ghostText');

    hoverBoxShadowColor = theme.color('button', 'ghostHoverBoxShadow');
    hoverBackground = theme.color('button', 'ghostHover');
    hoverTextColor = theme.color('button', 'ghostHoverText');
  }

  if (appearance === 'highlight') {
    boxShadowColor = theme.color('button', 'highlightBoxShadow');
    background = theme.color('button', 'highlight');
    textColor = theme.color('button', 'highlightText');

    hoverBoxShadowColor = theme.color('button', 'highlightHoverBoxShadow');
    hoverBackground = theme.color('button', 'highlightHover');
    hoverTextColor = theme.color('button', 'highlightHoverText');
  }

  if (appearance === 'lowlight') {
    boxShadowColor = theme.color('button', 'lowlightBoxShadow');
    background = theme.color('button', 'lowlight');
    textColor = theme.color('button', 'lowlightText');

    hoverBoxShadowColor = theme.color('button', 'lowlightHoverBoxShadow');
    hoverBackground = theme.color('button', 'lowlightHover');
    hoverTextColor = theme.color('button', 'lowlightHoverText');
  }

  if (appearance === 'link') {
    boxShadowColor = theme.color('button', 'linkBoxShadow');
    textColor = theme.color('button', 'linkText');

    hoverBoxShadowColor = theme.color('button', 'linkHoverBoxShadow');
    hoverBackground = theme.color('button', 'linkHover');
    hoverTextColor = theme.color('button', 'linkHoverText');
  }

  if (appearance === 'muted') {
    boxShadowColor = theme.color('button', 'mutedBoxShadow');
    background = theme.color('button', 'muted');
    textColor = theme.color('button', 'mutedText');

    hoverBoxShadowColor = theme.color('button', 'mutedHoverBoxShadow');
    hoverBackground = theme.color('button', 'mutedHover');
    hoverTextColor = theme.color('button', 'mutedHoverText');
  }

  if (size === 'small') {
    fontSize = theme.fontSize('s');
    padding = `${theme.spacing(1)} ${theme.spacing(2)}`;
  }

  if (size === 'large') {
    fontSize = theme.fontSize('m');
    padding = `${theme.spacing(3)} ${theme.spacing(4)}`;
  }

  const boxShadow = css`
    box-shadow: 0 0 0 2px ${boxShadowColor};
  `;
  const hoverBoxShadow = css`
    box-shadow: 0 0 0 2px ${hoverBoxShadowColor};
  `;

  return css`
    -webkit-appearance: none;
    align-items: baseline;
    background: ${background};
    border-radius: ${theme.get('borderRadius')};
    border-width: 0;
    box-sizing: border-box;
    color: ${textColor};
    cursor: pointer;
    display: inline-flex;
    font: normal ${fontSize} ${theme.get('type.fontFamily.system')};
    font-style: normal;
    font-weight: bold;
    margin: 0;
    max-width: 100%;
    padding: ${padding};
    text-align: center;
    transition: background 0.1s ease-out,
      box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38);
    width: ${width};
    ${boxShadow};

    &:hover,
    &:focus {
      background: ${hoverBackground};
      color: ${hoverTextColor};
      ${hoverBoxShadow};
    }
  `;
};

const linkButton = ({theme}) => css`
  transition: text-decoration 0.2s linear, color 0.2s linear;
  color: ${theme.color('link')};
  text-decoration: none;
  cursor: pointer;
  padding-left: 0;
  padding-right: 0;
  box-shadow: none;
  background: none;
  text-transform: none;
  font-weight: normal;

  &:hover,
  &:focus,
  &:active,
  &:visited {
    color: ${theme.color('link', 'hover')};
    text-decoration: underline;
    box-shadow: none;
  }

  ${'' /* Improve readability when focused and hovered in all browsers: h5bp.com/h */};
  &:hover,
  &:active {
    outline: 0;
  }
`;

class Button extends React.PureComponent {
  static defaultProps = {
    appearance: 'regular',
    component: 'button',
    fit: false,
    onClick: undefined,
    size: 'regular'
  };

  static propTypes = {
    appearance: PropTypes.oneOf([
      'regular',
      'outline',
      'ghost',
      'highlight',
      'lowlight',
      'link',
      'muted'
    ]),
    children: PropTypes.node.isRequired,
    component: PropTypes.oneOf(['button', 'a', 'submit']),
    fit: PropTypes.bool,
    onClick: PropTypes.func,
    size: PropTypes.oneOf(['small', 'regular', 'large'])
  };

  render() {
    const {appearance, component, children, onClick, ...props} = this.props;

    const Component = styled(component)`
      ${button};
      ${(component === 'a' || appearance === 'link') && linkButton};
    `;

    return (
      <Component {...props} onClick={onClick}>
        {children}
      </Component>
    );
  }
}

export default Button;
