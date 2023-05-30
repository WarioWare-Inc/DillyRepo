const { Client } = require('pg');

const client = new Client({
  database: 'postgres',
  port: '5432',
});
client.connect();

describe('getReviews', () => {
  it('should retrieve reviews based off of product id', () => {
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
      FROM reviews WHERE product_id = $1`, [1234], (err, result) => {
        if (result) {
          expect(result).toBeTruthy();
        }
      });
  });
});

describe('getMetaData', () => {
  it('should retrieve meta data of a product', () => {
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

  FROM reviews WHERE product_id = $1;`, [1234], (err, result) => {
        if (result) {
          expect(result).toBeTruthy();
        }
      });
  });
});