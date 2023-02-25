const pool = require("./config.js");
const express = require("express");
const { response } = require("express");
const router = express.Router();

router.get("/film", (req, res) => {
    const query = `
        SELECT * FROM film
    `
    pool.query(query, (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows)
    })
})

router.get("/film/:id", (req,res) => {
   const {id} = req.params;

   const findQuery = `
    SELECT * FROM film
        WHERE film_id = $1
    `

    pool.query(findQuery, [id], (err, response) => {
        if (err) throw err

        res.status(200).json(response.rows[0])
    })

})


router.get("/cat", (req, res) => {
    const query = `
        SELECT * FROM category
    `
    pool.query(query, (err, response) => {
        if(err) throw err

        res.status(200).json(response.rows)
    })
})

router.get("/cat/:category/film", (req,res) => {
    const {id} = req.params;
 
    const findQuery = `
     SELECT 
        film.id AS film_id,
        film.title AS title,
        film.description AS description
        film.release_year AS release_year
        film.language_id AS language_id
        film.rental_duration AS rental_duration
        film.rental_rate AS rental_rate
        film.length AS length
        film.replacement_cost AS replacement_cost
        film.rating AS rating
        film.last_update AS last_update
        film.special_features AS special_features
        film.fulltext AS fulltext
     FROM film 
        INNER JOIN 
            film_category ON film.film_id = film_category.film_id
        INNER JOIN
            category ON film_category.category.id = category.category_id
    WHERE
        category.category_id = $1
     `
 
     pool.query(findQuery, [id], (err, response) => {
         if (err) throw err
 
         res.status(200).json(response.rows[0])
     })
 
 })


module.exports = router;