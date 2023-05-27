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
        FROM reviews WHERE reviews.product_id = $1
      ) AS results_data
    ) AS results
    FROM reviews WHERE product_id = $1`, [params.product_id, params.review_id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    console.log(result.rows[0].results[0])
    cb(null, result);
  });
};
// TODO: Find the ratings and add them
const getReviewsMeta = (params, cb) => {
  client.query(`SELECT
      reviews.product_id,
      (
        SELECT json_object_agg(rating, ratings) FROM (
          (
          SELECT
            COUNT(case when reviews.product_id = $1 AND reviews.rating = 1 then 1 else null end)
            AS "1",
            COUNT(case when reviews.product_id = $1 AND reviews.rating = 2 then 1 else null end)
            AS "2",
            COUNT(case when reviews.product_id = $1 AND reviews.rating = 3 then 1 else null end)
            AS "3",
            COUNT(case when reviews.product_id = $1 AND reviews.rating = 4 then 1 else null end)
            AS "4",
            COUNT(case when reviews.product_id = $1 AND reviews.rating = 5 then 1 else null end)
            AS "5"
            FROM reviews
          )
        ) AS ratings
      ) AS ratings
    FROM reviews WHERE product_id = $1`, [params.product_id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    // console.log('HERE:   ', result.rows);
    // console.log('HERE:   ', result.rows[1].ratings);
    cb(null, result);
  });
};

const getImages = (params, cb) => {
  client.query('SELECT * FROM images WHERE product_id = $1', [params.product_id], (err, result) => {
    if (err) {
      cb(err, null);
    }
    cb(null, result);
  });
};

module.exports = {
  getReviews,
  getReviewsMeta,
  getImages,
};

getReviewsMeta({ product_id: 1, review_id: 5774954 }, (err, result) => {
  if (err) {
    console.error('ERROR IN NEW GETTING OF REVIEWS: ', err);
  }
  console.log(result);
});
