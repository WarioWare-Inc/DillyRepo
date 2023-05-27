const axios = require('axios');
const db = require('../models/reviews');

module.exports = {
  getReviews(req, res) {
    db.getReviews(req.product_id, (err, result) => {
      if (err) {
        res.status(500).send('ERROR IN NEW GETTING OF REVIEWS: ', err);
      }
      res.status(200).json(result);
    });
  },

  // getReviewsMeta(req, res) {
  //   const endpoint = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta';
  //   const option = {
  //     method: 'GET',
  //     url: endpoint,
  //     headers: {
  //       Authorization: process.env.AUTH,
  //     },
  //     params: req.query,
  //   };
  //   return axios(option)
  //     .then((result) => {
  //       res.status(200).send(result.data);
  //     })
  //     .catch(() => {
  //       console.log('Fail to send GET request for metadata');
  //       res.status(400).send();
  //     });
  // },

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
