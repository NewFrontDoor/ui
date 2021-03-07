/** @jsx jsx */
import {
  FC,
  ReactNode,
  Children,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import PropTypes from 'prop-types';
import {useEmblaCarousel} from 'embla-carousel/react';
import {jsx} from 'theme-ui';
import {DotButton, PreviousButton, NextButton} from './carousel-buttons';

const dots = {
  position: 'absolute',
  marginTop: '1rem',
  display: 'flex',
  listStyle: 'none',
  paddingLeft: '0',
  justifyContent: 'center',
  left: '0',
  right: '0',
  top: '90%'
};

const relative = {
  position: 'relative'
};

type CallbackFunction = () => void;

function useInterval(callback: CallbackFunction, delay?: number): void {
  const savedCallback = useRef<CallbackFunction>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

type CarouselProps = {
  autoplay?: boolean;
  delayLength?: number;
  children: ReactNode;
  hidearrows?: boolean;
  dotStyling?: unknown;
};

const Carousel: FC<CarouselProps> = ({
  autoplay,
  delayLength,
  children,
  hidearrows,
  dotStyling
}) => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true
  });

  const [previousBtnEnabled, setPreviousBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [delay] = useState(delayLength);
  const [isRunning] = useState(autoplay);

  const scrollTo = useCallback((index) => embla.scrollTo(index), [embla]);
  const scrollPrevious = useCallback(() => embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla.scrollNext(), [embla]);

  useInterval(
    () => {
      if (embla.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla.scrollTo(0);
      }
    },
    isRunning ? delay : undefined
  );

  useEffect(() => {
    const onSelect = () => {
      setSelectedIndex(embla.selectedScrollSnap());
      setPreviousBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    };

    if (embla) {
      setScrollSnaps(embla.scrollSnapList());
      embla.on('select', onSelect);
      onSelect();
    }
  }, [embla]);

  return (
    <div sx={relative}>
      <div ref={viewportRef}>
        <div style={{display: 'flex'}}>
          {Children.map(children, (slide, index) => (
            <div key={index} style={{position: 'relative', flex: '0 0 100%'}}>
              <div style={{position: 'relative'}}>{slide}</div>
            </div>
          ))}
        </div>
      </div>
      <div id="dots" sx={dots}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            dotStyling={dotStyling}
            selected={index === selectedIndex}
            onClick={() => scrollTo(index)}
          />
        ))}
      </div>
      {!hidearrows && (
          <PreviousButton
            enabled={previousBtnEnabled}
            onClick={scrollPrevious}
          />
        ) && <NextButton enabled={nextBtnEnabled} onClick={scrollNext} />}
    </div>
  );
};

Carousel.propTypes = {
  autoplay: PropTypes.bool,
  delayLength: PropTypes.number,
  children: PropTypes.node,
  hidearrows: PropTypes.bool,
  dotStyling: PropTypes.object
};

export default Carousel;
