// if (process.env.NODE_ENV !== 'production') {
require('dotenv').config({
    path: require('find-config')('.env')
})
// }