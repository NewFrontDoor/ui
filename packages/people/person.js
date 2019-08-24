import React from 'react';
<<<<<<< HEAD
export default function Person({title, name, url}) {
  return (
    <div class="person-container col-md-3 col-sm-6">
      <div class="person-image">
        <img class="image-center" src={url} alt={name} />
=======

export default function Person({title, name, avatar}) {
  return (
    <div className="person-container col-md-3 col-sm-6">
      <div className="person-image">
        <img className="image-center" src={avatar} alt={name} />
>>>>>>> 74eec880f50f8f886c4c3cfc9e6ffb63ff61c3a5
      </div>
      <div className="person-name text-center">{name}</div>
      <div className="person-title text-center">{title}</div>
    </div>
  );
}
