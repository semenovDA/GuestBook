const express = require('express');
const uuid = require('uuid/dist/v1');
const Reviews = require('../core/functions/reviews');
const Review = require('../core/models/review.model');
const router = express.Router();

/* GET home page. */
router.get('/', async function (req, res, next) {
    const reviews = await Reviews.getReviews();
    res.cookie('token', uuid(), {signed: true});
    res.render('index', {title: 'GuestBook', reviews: reviews});
});

router.post('/review', async function (req, res, next) {
    try {
        if(req.signedCookies.token === undefined) res.status(404).end();

        let review = new Review(req.body);
        review = await Reviews.createReview(review);

        return res.status(200).end(review.id);
    }
    catch (e) {
        console.error(e);
        return res.status(500).end()
    }
});

router.post('/like', async function (req, res, next) {
    try {
        if(req.signedCookies.token === undefined) res.status(404).end();
        await Reviews.findByIdAndUpdate(req.body.id, {likes: req.body.likes});
        return res.status(200).end();
    }
    catch (e) {
        console.error(e);
        return res.status(500).end();
    }
});

module.exports = router;
