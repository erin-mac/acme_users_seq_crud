const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL);

const User = db.define('user', {
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING
})

const syncAndSeed = function () {
    return db.sync({ force: true })
        .then(async () => {
            await Promise.all([
                User.create({ firstName: 'firstA', lastName: "lastA" }),
                User.create({ firstName: 'firstB', lastName: 'lastB' })
            ])
                .then(console.log('data synced!'))
        })
}

const addUser = function (first, last) {
    User.create({
        firstName: first,
        lastName: last
    })
}

const deleteUser = function (index) {
    User.destroy({
        where: { id: index }
    })
}

const getUsers = async function () {
    try {
        await User.findAll({
            attributes: ['firstName', 'lastName']
        })
            .then((data) => { console.log(data) })
    } catch (error) { return error }
}

const updateUser = function (first, last, index) {
    User.update(
        { firstName: first, lastName: last },
        { where: { id: index } }
    )
}

module.exports = {
    User,
    syncAndSeed,
    addUser,
    deleteUser,
    getUsers,
    updateUser
}