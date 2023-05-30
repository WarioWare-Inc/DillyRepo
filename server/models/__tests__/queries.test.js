const models = require('../reviews.js')

describe('getReviews', () => {
  it('Should use API to retrieve reviews', () => {
    models.getReviews({ product_id: 1, review_id: 5774954 }, (err, result) => {
      if (err) {
        console.error('ERROR IN NEW GETTING OF REVIEWS: ', err);
      }
      expect(result).toBeTruthy();
    });
  });
});

describe('getReviewsMeta', () => {
  it('Should use API to retrieve meta data of a Product', () => {
    models.getReviewsMeta({ product_id: 1 }, (err, result) => {
      if (err) {
        console.error('ERROR IN NEW GETTING OF REVIEWS: ', err);
      }
      expect(result).toBeTruthy();
    });
  });
});