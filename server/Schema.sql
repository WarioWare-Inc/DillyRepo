\c postgres

DROP TABLE IF EXISTS reviews;
create TABLE reviews(
	id 	INTEGER PRIMARY KEY,
	product_id INTEGER,
	rating INTEGER,
	date INTEGER,
	summary VARCHAR(300),
	body VARCHAR(1000),
	recommend BOOLEAN,
	reported BOOLEAN,
	reviewer_name VARCHAR(100),
	reviewer_email VARCHAR(150),
	reponse VARCHAR(1000),
	helpfullness INTEGER
);

DROP TABLE IF EXISTS images;
CREATE TABLE IF NOT EXISTS images(
	id INTEGER PRIMARY KEY,
	review_id INTEGER,
	url VARCHAR(1000)
);

DROP TABLE IF EXISTS characteristic_reviews;
CREATE TABLE IF NOT EXISTS characteristic_reviews(
	id INTEGER PRIMARY KEY,
	characteristic_id INTEGER,
	review_id INTEGER,
	"value" INTEGER
);

COPY reviews FROM '/Users/dillonmigdol/Documents/SDC data/reviews.csv' DELIMITER',' CSV HEADER;

COPY images FROM '/Users/dillonmigdol/Documents/SDC data/reviews_photos.csv' DELIMITER',' CSV HEADER;

COPY characteristic_reviews FROM '/Users/dillonmigdol/Documents/SDC data/characteristic_reviews.csv' DELIMITER',' CSV HEADER;