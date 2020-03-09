import React from 'react';
import PropTypes from 'prop-types';
import {Styled} from 'theme-ui';
import {Button} from '@theme-ui/components';
import pptxgen from 'pptxgenjs';

export default function Form({title, description, contents}) {
  const pptx = new pptxgen();
  pptx.title = 'PptxGenJS Sample Presentation';
  pptx.layout = 'LAYOUT_16x10';

  pptx.defineSlideMaster({
    title: 'TITLE_SLIDE',
    objects: [
      {
        placeholder: {
          options: {
            name: 'title',
            type: 'title',
            x: 1.22,
            y: 0.76,
            w: 8.46,
            h: 3.07,
            align: 'left',
            bold: true,
            fontSize: 44,
            fontFace: 'Arial',
            color: 'D6FEFF',
            shadow: {
              angle: 45,
              blur: 3,
              offset: 3
            }
          },
          text: 'title here'
        }
      },
      {
        placeholder: {
          options: {
            name: 'hymnNumber',
            type: 'body',
            x: 1.28,
            y: 2.85,
            w: 7,
            h: 1.6,
            align: 'left',
            bold: true,
            fontSize: 21,
            fontFace: 'Arial',
            color: 'FFFFFF',
            shadow: {
              angle: 45,
              blur: 3,
              offset: 3
            }
          },
          text: 'hymn number here'
        }
      }
    ]
  });

  pptx.defineSlideMaster({
    title: 'LYRIC_SLIDE',
    objects: [
      {
        placeholder: {
          options: {
            name: 'body',
            type: 'body',
            x: 0.17,
            y: 0.21,
            w: 9.58,
            h: 5.42,
            align: 'left',
            fontSize: 37,
            bold: true,
            fontFace: 'Arial',
            color: 'FFFFFF',
            shadow: {
              angle: 45,
              blur: 3,
              offset: 3
            }
          },
          text: 'Lyrics here'
        }
      }
    ]
  });

  function produceSlide() {
    pptx
      .addSlide('TITLE_SLIDE')
      .addText('A Charge To Keep I Have', {placeholder: 'title'})
      .addText('Rejoice 464', {placeholder: 'hymnNumber'});
    contents.map(para =>
      pptx.addSlide('LYRIC_SLIDE').addText(para.body, {placeholder: 'body'})
    );
    pptx.writeFile('react-demo.pptx');
  }

  return (
    <div>
      <Styled.h2>{title}</Styled.h2>
      <Styled.p>{description}</Styled.p>
      <Button onClick={produceSlide}>Click Me</Button>
    </div>
  );
}

Form.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};
