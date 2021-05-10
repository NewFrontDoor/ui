/** @jsx jsx */
import {jsx, css} from 'theme-ui';
import {Carousel} from '../src';

const slide = css({
  flex: '0 0 auto',
  width: '80%',
  position: 'relative',
  paddingLeft: '10%',
  counterIncrement: 'my-counter',
  div: {
    backgroundColor: 'rgb(40, 44, 52)',
    position: 'relative',
    borderRadius: '0.5rem',
    minHeight: '200px',
    paddingBottom: '46%',
    fontSize: '5rem',
    color: 'white',
    fontWeight: 300,
    lineHeight: 1,
    textAlign: 'center'
  }
});

const Dot = (props) => (
  <button
    sx={{
      backgroundColor: 'transparent',
      cursor: 'pointer',
      position: 'relative',
      padding: '0',
      width: '3rem',
      height: '3rem',
      marginRight: '0.75rem',
      marginLeft: '0.75rem',
      border: '0',
      display: 'flex',
      alignItems: 'center',
      '&:after': {
        backgroundColor: props.selected ? '#1bcacd' : '#efefef',
        width: '100%',
        top: '10px',
        height: '0.4rem',
        content: "''"
      }
    }}
    {...props}
    type="button"
  />
);

export default (
  <Carousel autoplay delayLength={2000} customdot={<Dot />}>
    <div key="1" css={slide}>
      <div>1</div>
    </div>
    <div key="2" css={slide}>
      <div>2</div>
    </div>
    <div key="3" css={slide}>
      <div>3</div>
    </div>
  </Carousel>
);