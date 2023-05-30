const { Client } = require('pg');

const client = new Client({
  database: 'postgres',
  port: '5432',
});

client.connect();
// TODO: CONVERT PRODUCTID TO STRING
//       UN-HARDCODE THE DATA
const getReviews = (params, cb) => {
  client.query(`SELECT
    reviews.product_id AS product,
    (
      SELECT json_agg(results_data) FROM (
        SELECT
        id AS review_id,
        rating,
        summary,
        recommend,
        response,
        body,
        date,
        reviewer_name,
        helpfullness,
        (
          SELECT json_agg(photos_data) FROM (
            SELECT
            id,
            url
            FROM images WHERE images.review_id = $2
          ) AS photos_data
        ) AS photos
        FROM reviews WHERE reviews.product_id = $1 AND reviews.reported = false
      ) AS results_data
    ) AS results
    FROM reviews WHERE product_id = $1`, [params.product_id, params.review_id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    // console.log(result.rows[0].results[0])
    cb(null, result);
  });
};
// TODO: Find the ratings and add them
const getReviewsMeta = (params, cb) => {
  client.query(`SELECT DISTINCT ON (reviews.product_id)
  reviews.product_id,
  (
    SELECT json_object_agg(rating, ratings.number) FROM (
      (
        SELECT rating,
        COUNT(rating) AS number FROM reviews WHERE reviews.product_id = $1 GROUP BY rating
      )
    ) AS ratings
  ) AS ratings,

  (
    SELECT json_object_agg(recommend, recommended.number) FROM (
      (
        SELECT recommend,
        COUNT(recommend) AS number FROM reviews WHERE reviews.product_id = $1 GROUP BY recommend
      )
    ) AS recommended
  ) AS recommended,

  (
    SELECT json_object_agg(
      characteristic_id, json_build_object(
        'id', characteristic_reviews.characteristic_id,
        'value', characteristic_reviews.value
      )
    ) FROM characteristic_reviews WHERE review_id = $1
  ) AS characteristics

FROM reviews WHERE product_id = $1;`, [params.product_id], (err, result) => {

      /*
      SELECT DISTINCT ON (reviews.product_id)
      reviews.product_id,
      (
        SELECT json_object_agg(rating, ratings.number) FROM (
          (
            SELECT rating,
            COUNT(rating) AS number FROM reviews WHERE reviews.product_id = 1 GROUP BY rating
          )
        ) AS ratings
      ) AS ratings,

      (
        SELECT json_object_agg(recommend, recommended.number) FROM (
          (
            SELECT recommend,
            COUNT(recommend) AS number FROM reviews WHERE reviews.product_id = 1123 GROUP BY recommend
          )
        ) AS recommended
      ) AS recommended,

      (
        SELECT json_object_agg(
          characteristic_id, json_build_object(
            'id', characteristic_reviews.characteristic_id,
            'value', characteristic_reviews.value
          )
        ) FROM characteristic_reviews WHERE review_id = 1123
      ) AS characteristics

    FROM reviews WHERE product_id = 1123;




      */
    if (err) {
      cb(err, null);
    }
    const queryResults = {
      product_id: result.rows[0].product_id,
      ratings: result.rows[0].ratings
    };
    console.log('HERE:   ', result.rows[0]);
    cb(null, result);
  });
};

const getCharacteristicsMeta = (params, cb) => {

};

// const getImages = (params, cb) => {
//   client.query('SELECT * FROM images WHERE product_id = $1', [params.product_id], (err, result) => {
//     if (err) {
//       cb(err, null);
//     }
//     cb(null, result);
//   });
// };

module.exports = {
  getReviews,
  getReviewsMeta,
  // getImages,
};

module.exports.getReviewsMeta({ product_id: 1234 }, (err, result) => {
  if (err) {
    console.error('ERROR IN NEW GETTING OF REVIEWS: ', err);
  }
  console.log(result);
});
