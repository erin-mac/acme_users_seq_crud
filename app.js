const express = require('express');
const router = express.Router();
const swig = require('swig');
swig.setDefaults({ cache: false })

const methodOverride = require('method-override');

const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
// router.set('view enigine', 'html');
// router.engine('html', swig.renderFile())

const test = ['a', 'b', 'c']
router.get('/', (req, res, next) => {
    res.render('index', { test })
});

router.get('/users', (req, res, next) => {

})

router.post('/users', (req, res, next) => {

})


router.put('/users', (req, res, next) => {

})

router.delete('/users', (req, res, next) => {

})
module.exports = {
    router,
    swig
}
