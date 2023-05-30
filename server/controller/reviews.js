const axios = require('axios');
const db = require('../models/reviews');

module.exports = {
  getReviews(req, res) {
    db.getReviews({ product_id: req.query.product_id, review_id: req.query.review_id }, (err, result) => {
      if (err) {
        res.status(400).send('ERROR IN NEW GETTING OF REVIEWS: ', err);
      }
      // console.log('HERE!: ', result.rows);
      res.status(200).send(result.rows);
    });
  },

  getReviewsMeta(req, res) {
    db.getReviewsMeta({ product_id: req.query.product_id }, (err, result) => {
      if (err) {
        res.status(400).send('ERROR IN NEW GETTING OF REVIEWS META: ', err);
      }
      // console.log('HERE!: ', result.rows);
      res.status(200).send(result.rows[0]);
    });
  },

  // addReview(req, res) {
  //   const endpoint = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews';
  //   const option = {
  //     method: 'POST',
  //     url: endpoint,
  //     headers: {
  //       Authorization: process.env.AUTH,
  //     },
  //     data: req.body,
  //   };
  //   return axios(option)
  //     .then((result) => {
  //       res.status(200).send(result.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).send();
  //     });
  // },

  // markHelpful(req, res) {
  //   const endpoint = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/${req.body.review_id}/helpful`;
  //   const option = {
  //     method: 'PUT',
  //     url: endpoint,
  //     headers: {
  //       Authorization: process.env.AUTH,
  //     },
  //   };
  //   return axios(option)
  //     .then(() => {
  //       res.status(200).send('Successfully updated the review');
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(400).send();
  //     });
  // },

};
module.exports.getReviews({ query: { product_id: 1, review_id: 5774954 } }, (err, result) => {
  if (err) {
    console.error('ERROR IN NEW GETTING OF REVIEWS: ', err);
  }
  console.log(result);
});
