import React from 'react';

export default function Person({title, name, avatar}) {
  return (
    <div className="person-container col-md-3 col-sm-6">
      <div className="person-image">
        <img className="image-center" src={avatar} alt={name} />
      </div>
      <div className="person-name text-center">{name}</div>
      <div className="person-title text-center">{title}</div>
    </div>
  );
}