/** @jsx jsx */
import {useState, useEffect, useCallback, useRef} from 'react';
import EmblaCarouselReact from 'embla-carousel-react';
import {jsx, css} from '@emotion/core';
import {DotButton, PrevButton, NextButton} from './carousel-buttons';

const dots = css`
  position: absolute;
  margin-top: 1rem;
  display: flex;
  list-style: none;
  padding-left: 0;
  justify-content: center;
  left: 0;
  right: 0;
  top: 90%;
`;

const relative = css`
  position: relative;
`;

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default function Carousel({autoplay, delayLength, children}) {
  const [embla, setEmbla] = useState(null);
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [delay, setDelay] = useState(delayLength);
  const [isRunning, setIsRunning] = useState(autoplay);

  const scrollTo = useCallback(index => embla.scrollTo(index), [embla]);
  const scrollPrev = useCallback(() => embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla.scrollNext(), [embla]);

  useInterval(
    () => {
      if (selectedIndex === scrollSnaps.length - 1) {
        scrollTo(0);
      } else {
        scrollNext();
      }
    },
    isRunning ? delay : null
  );

  useEffect(() => {
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      setPrevBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    };

    if (embla) {
      setScrollSnaps(embla.scrollSnapList());
      embla.on('select', onSelect);
      onSelect();
    }

    return () => embla && embla.destroy();
  }, [embla]);

  return (
    <div css={relative}>
      <EmblaCarouselReact
        htmlTagName="div"
        emblaRef={c => setEmbla(c)}
        options={{loop: false}}
      >
        <div style={{display: 'flex'}}>
          {children.map((slide, index) => (
            <div key={index} style={{flex: '0 0 100%'}}>
              <div style={{position: 'relative'}}>{slide}</div>
            </div>
          ))}
        </div>
      </EmblaCarouselReact>
      <div id="dots" css={dots}>
        {scrollSnaps.map((snap, index) => (
          <DotButton
            key={index}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
      <PrevButton enabled={prevBtnEnabled} onClick={scrollPrev} />
      <NextButton enabled={nextBtnEnabled} onClick={scrollNext} />
    </div>
  );
}
