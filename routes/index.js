const express = require('express');
const Reviews = require('../core/functions/reviews');
const Review = require('../core/models/review.model');
const Visitors = require('../core/functions/visitors');
const Visitor = require('../core/models/visitor.model');
const get_ip = require('../utils/get_ip');
const router = express.Router();

async function authorize(req, res) {
    const ip = (req.headers['x-forwarded-for'] || get_ip());
    const token = req.signedCookies.token;

    try {
        if (token === undefined) {
            let visitor = new Visitor({ipv4: ip});
            visitor = await Visitors.createVisitor(visitor);
            res.cookie('token', visitor._id.toString(), {signed: true});
            return visitor;
        }
        else {
            const visitor = await Visitors.getVisitorByID(token.toString());
            if(visitor.ipv4 !== ip) { /*    TODO: request user for an email, and name (or create new account)   */ }
            return visitor;
        }
    }
    catch (e) {
        console.log('authorize error');
        console.error(e);
        return null;
    }
}

/* GET home page. */
router.get('/', async function (req, res, next) {
    const visitor = await authorize(req, res);
    const reviews = await Reviews.getReviews();

    res.render('index', {title: 'GuestBook', visitor: visitor, reviews: reviews});
});

router.post('/review', async function (req, res, next) {
    try {
        if(req.signedCookies.token !== req.body.sender) res.status(404).end();
        const visitor = await authorize(req, res);

        visitor.name = req.body.name;
        visitor.email = req.body.email;
        visitor.lastSeen = Date.now();

        await Visitors.findByIdAndUpdate(visitor._id, visitor);

        let review = new Review(req.body);
        review = await Reviews.createReview(review);
        return res.status(200).end(review._id.toString());
    }
    catch (e) {
        console.error(e);
        return res.status(500).end()
    }
});

router.post('/like', async function (req, res, next) {
    try {
        if(req.signedCookies.token === req.body.visitor_id) res.status(404).end();
        await Reviews.findByIdAndUpdate(req.body.id, {likes: req.body.likes});
        return res.status(200).end();
    }
    catch (e) {
        console.error(e);
        return res.status(500).end();
    }
});

router.post('/edit', async function (req, res, next) {
    try {
        if(req.signedCookies.token !== req.body.visitor_id) res.status(404).end();
        await Reviews.findByIdAndUpdate(req.body.post_id, {comment: req.body.comment});
        return res.status(200).end();
    }
    catch (e) {
        console.error(e);
        return res.status(500).end();
    }
});

module.exports = router;
