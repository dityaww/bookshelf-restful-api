const Joi = require('joi');
const { AddBooks, GetAllBooks, GetDetailBooks, UpdateBooks, DeleteBooks } = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: AddBooks,  
    },
    {
        method: 'GET',
        path: '/books',
        handler: GetAllBooks,      
    },
    {
        method: 'GET',
        path: '/books/{bookId}',
        handler: GetDetailBooks,
    },
    {
        method: 'PUT',
        path: '/books/{bookId}',
        handler: UpdateBooks,
    },
    {
        method: 'DELETE',
        path: '/books/{bookId}',
        handler: DeleteBooks,
    },

];

module.exports = routes;

