import React from 'react';

export default function RenderSeriesComponent({id, title, image, link}) {
  return (
    <div key={id}>
      <img src={image} alt="Sermon Art" />
      <p>
        <a dangerouslySetInnerHTML={{__html: title}} href={link} />
      </p>
    </div>
  );
}
