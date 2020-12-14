import React from "react";
import ModalImage from "react-modal-image";

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
}) => {
  return (
    <article className="photo">
      <ModalImage small={regular} large={regular} alt={alt_description} />
      <div className="photo-info">
        <h4>{name}</h4>
        <p>{likes} likes</p>
        <a href={portfolio_url} target="_blank">
          <img src={medium} alt={name} className="user-img" />
        </a>
      </div>
    </article>
  );
};

export default Photo;
