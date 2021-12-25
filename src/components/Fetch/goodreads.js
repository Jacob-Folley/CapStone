const bookApi = 'https://www.googleapis.com/books/v1/volumes?q=harry+potter&callback=handleResponse'

// Returns a list of movies
export const getBooks = () => {
    return fetch(`${mediaApi}Movies`)
        .then(res => res.json())
}

// Returns the trailer
export const getTrailer = () => {
    return fetch(`https://imdb-api.com/API/YouTube/k_qjajechb/8hP9D6kZseM`)
        .then(res => res.json())
}

// Returns the specific Movie Object
export const getMovie = (id) => {
    return fetch(`http://localhost:8788/Movies/${id}`)
        .then(res => res.json())
}

// Adds a Movie to your list
export const postMovie = (request) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }

    return fetch(`http://localhost:8088/showInput`, fetchOptions)
        .then(response => response.json())
        .then( () => {getMyMovies()})
        
}

// Deletes a movie from your list
export const deleteMovie = (id) => {
    return fetch(`http://localhost:8088/showInput/${id}`, {
        method: "DELETE"
    })
   
}

// Returns the movies from your list 
export const getMyMovies = () => {
    return fetch(`http://localhost:8088/showInput`)
        .then(res => res.json())
}


