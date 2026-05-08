import type {
  ReactNode,
  ReactElement} from 'react';
import {
  Children,
  cloneElement,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';
import {useEmblaCarousel} from 'embla-carousel/react';
import {DotButton, PreviousButton, NextButton} from './carousel-buttons';

type CallbackFunction = () => void;

function useInterval(callback: CallbackFunction, delay?: number): void {
  const savedCallback = useRef<CallbackFunction | undefined>(undefined);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (typeof delay === 'number') {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
}

type CarouselProps = {
  autoplay?: boolean;
  delayLength?: number;
  children: ReactNode;
  customdot?: ReactElement;
  showNav?: boolean;
  showDots?: boolean;
  startIndex?: number;
  draggable?: boolean;
};

const Carousel = ({
  autoplay,
  delayLength,
  children,
  customdot,
  startIndex = 0,
  draggable = true,
  showNav = true,
  showDots = true
}: CarouselProps) => {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    startIndex,
    draggable
  });

  const [previousBtnEnabled, setPreviousBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [delay] = useState(delayLength);
  const [isRunning] = useState(autoplay);
  const scrollSnaps = embla?.scrollSnapList() ?? [];

  const scrollTo = useCallback(
    (index: number) => {
      embla?.scrollTo(index);
    },
    [embla]
  );
  const scrollPrevious = useCallback(() => {
    embla?.scrollPrev();
  }, [embla]);
  const scrollNext = useCallback(() => {
    embla?.scrollNext();
  }, [embla]);

  useInterval(
    () => {
      if (embla?.canScrollNext()) {
        embla.scrollNext();
      } else {
        embla?.scrollTo(0);
      }
    },
    isRunning ? delay : undefined
  );
  const onSelect = useCallback(() => {
    if (embla) {
      setSelectedIndex(embla.selectedScrollSnap());
      setPreviousBtnEnabled(embla.canScrollPrev());
      setNextBtnEnabled(embla.canScrollNext());
    }
  }, [embla]);

  useEffect(() => {
    if (embla) {
      embla.on('select', onSelect);
    }
  }, [embla, onSelect]);

  return (
    <div
      sx={{
        position: 'relative'
      }}
    >
      <div ref={viewportRef}>
        <div data-testid="carousel-slides" style={{display: 'flex'}}>
          {Children.map(children, (slide, index) => (
            <div key={index} style={{position: 'relative', flex: '0 0 100%'}}>
              <div style={{position: 'relative'}}>{slide}</div>
            </div>
          ))}
        </div>
      </div>
      {showDots && (
        <div
          id="dots"
          sx={{
            position: 'absolute',
            marginTop: '1rem',
            display: 'flex',
            listStyle: 'none',
            paddingLeft: '0',
            justifyContent: 'center',
            left: '0',
            right: '0',
            top: '90%'
          }}
        >
          {scrollSnaps.map((_, index) => {
            if (typeof customdot === 'undefined') {
              return (
                <DotButton
                  key={index}
                  selected={index === selectedIndex}
                  onClick={() => {
                    scrollTo(index);
                  }}
                />
              );
            }

            return cloneElement(customdot, {
              key: index,
              selected: index === selectedIndex,
              onClick: () => {
                scrollTo(index);
              }
            } as Partial<unknown> & React.Attributes);
          })}
        </div>
      )}
      {showNav && (
        <PreviousButton enabled={previousBtnEnabled} onClick={scrollPrevious} />
      )}
      {showNav && <NextButton enabled={nextBtnEnabled} onClick={scrollNext} />}
    </div>
  );
};

/* Carousel.propTypes = {
  autoplay: PropTypes.bool,
  delayLength: PropTypes.number,
  children: PropTypes.node
}; */

export default Carousel;
