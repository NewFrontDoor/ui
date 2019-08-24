import React from 'react';
export default function Person({title, name, url}) {
  return (
    <div class="person-container col-md-3 col-sm-6">
      <div class="person-image">
        <img class="image-center" src={url} alt={name} />
      </div>
      <div class="person-name text-center">{name}</div>
      <div class="person-title text-center">{title}</div>
    </div>
  );
}