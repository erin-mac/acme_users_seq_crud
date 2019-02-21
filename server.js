const express = require('express');
const app = express();
router = require('./app')
const { User, syncAndSeed, addUser, deleteUser, getUsers, updateUser } = require('./db')
//const { swig } = require('./app')
const swig = require('swig');
swig.setDefaults({ cache: false })
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', './views')
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

const test = ['a', 'b', 'c']

app.get('/', async (req, res, next) => {
    try {
        const gotUsers = await User.findAll({
            attributes: ['id', 'firstName', 'lastName']
        })

        res.render('index', { gotUsers })
    } catch (error) { next(error) }
}
)

app.post('/user/', (req, res, next) => {
    const first = req.body.firstName
    const last = req.body.lastName
    console.log(first, last)
    addUser(first, last)
    res.redirect('/')
})

app.delete('/:id/', (req, res, next) => {
    const userID = (req.params.id * 1);
    deleteUser(userID)
    console.log('destroyed')
    res.redirect('/')
})

app.get('/user/:id', async (req, res, next) => {
    const userID = (req.params.id * 1);
    try {
        const gotUsers = await User.findAll({
            attributes: ['id', 'firstName', 'lastName']
        })
        const user = await User.findOne({
            where: { id: userID }
        })
        res.render('index2', { gotUsers, user })
    } catch (error) { next(error) }
})

app.put('/user/:id/', (req, res, next) => {
    const userID = (req.params.id * 1);
    const first = req.body.firstName;
    const last = req.body.lastName;
    updateUser(first, last, userID)
    res.redirect('/')
}
)

syncAndSeed()
app.listen(3000, () => console.log('listening on port 3000'))