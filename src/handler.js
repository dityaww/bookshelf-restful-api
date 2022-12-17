const { nanoid } = require('nanoid');
const books = require('./books')

const AddBooks = (req, h) => {
    const { 
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading
    } = req.payload;

    // jika field nama kosong
    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }

    // page yang dibaca tidak boleh lebih dari jumlah page
    if (readPage > pageCount) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        })
        response.code(400)
        return response
    }

    const isFinished = () => {
        if (pageCount === readPage) {
            return true
        } else{
            return false
        }
    }

    const id = nanoid(16);
    const finished = isFinished();
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    
    const newBooks = {
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading, 
        id, 
        finished, 
        insertedAt, 
        updatedAt,
    };

    books.push(newBooks);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
              bookId: id,
            },
        });
        response.code(201);
        return response;
    } 

    console.log(name);
}


const GetAllBooks = (req, h) => {
    const arrBooks = books.map(items => ({id: items.id, name: items.name, publisher: items.publisher}))

    const response = h.response({
        status: 'success',
        data: {
            books: arrBooks
        }
    });

    response.code(200);
    return response;
}

const GetDetailBooks = (req, h) => {
    const { bookId } = req.params;

    const book = books.filter((n) => n.id === bookId)[0];

    console.log(book);

    if (book !== undefined) {
        const response = h.response({
            status: 'success',
            data: ({
                book,
            })
        })

        response.code(200)
        return response
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    
    response.code(404);
    return response;
}

const UpdateBooks = (req, h) => {
    const { bookId } = req.params;

    const { 
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading
    } = req.payload;

    if (name === undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }

    if (readPage > pageCount){
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }

    const updatedAt = new Date().toISOString();

    const index = books.findIndex((item) => item.id === bookId);
    
    if (index !== -1) {
        books[index] = {
          ...books[index],
          name, 
          year, 
          author, 
          summary, 
          publisher, 
          pageCount, 
          readPage, 
          reading,
          updatedAt,
        };
    
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil diperbarui',
        });
    
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    
    response.code(404);
    return response;
}

const DeleteBooks = (req, h) => {
    const { bookId } = req.params;

    const index = books.findIndex((item) => item.id === bookId);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
          status: 'success',
          message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan'
    })

    response.code(404)
    return response
}

module.exports = { AddBooks, GetAllBooks, GetDetailBooks, UpdateBooks, DeleteBooks }