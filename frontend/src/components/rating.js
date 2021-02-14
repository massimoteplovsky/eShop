import React from "react";

const MAX_STARS_NUMBER = 5;

const Rating = ({rating, reviewsCount, color}) => {

  const renderStars = (rating) => {
    const diff = (rating - Math.floor(rating)).toFixed(1);
    const fullStarsNumber = Math.floor(rating);
    const halfStarsNumber = diff >= .5 ? 1 : 0;
    const emptyStarsNumber = halfStarsNumber === 1 ? MAX_STARS_NUMBER - fullStarsNumber - 1 : MAX_STARS_NUMBER - fullStarsNumber;

    return [
      Array(fullStarsNumber).fill(),
      Array(halfStarsNumber).fill(),
      Array(emptyStarsNumber).fill()
    ].map((stars, index) => {
        return stars.map((_) => {

          if (index === 0) {
            return (
              <span key={`start-${Math.random()}`}>
                <i style={{color}} className={`fas fa-star`}></i>
              </span>
            )
          }

          if (index === 1) {
            return (
              <span key={`start-${Math.random()}`}>
                <i style={{color}} className={`fas fa-star-half-alt`}></i>
              </span>
            );
          }

          return (
            <span key={`start-${Math.random()}`}>
              <i style={{color}} className={`far fa-star`}></i>
            </span>
          );
      }).flat();
    });
  }

  return (
    <div className="rating">
      {renderStars(rating)} {reviewsCount} reviews
    </div>
  )
}

Rating.defaultProps = {
  color: "#f8e825",
  rating: 0
}

export default Rating;
