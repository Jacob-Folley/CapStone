
const imdb = {
    API: "https://imdb-api.com/",
    key: 'k_e23ph14d'
    
}

const mediaApi = 'http://localhost:8788/'

// User Input
//--------------------------------------------------------------------------------------------

// Adds your input
export const postInput = (request) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }

    return fetch(`http://localhost:8088/userInput`, fetchOptions)
        .then(response => response.json())
        .then(() => {

        })
}

// Returns a list of the users input
export const getUserInput = () => {
    return fetch(`http://localhost:8088/userInput`)
        .then(res => res.json())
}

// Movies
//--------------------------------------------------------------------------------------------

// Returns a list of movies
export const getMovies = () => {
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



// Series
//--------------------------------------------------------------------------------------------

// Returns a list of shows
export const getSeries = () => {
    return fetch(`${mediaApi}Series`)
        .then(res => res.json())
}

// Returns specific show object
export const getShow = (id) => {
    return fetch(`http://localhost:8788/Series/${id}`)
        .then(res => res.json())
}

// Adds a show to your list
export const postShow = (request) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }

    return fetch(`http://localhost:8088/seriesInput`, fetchOptions)
        .then(response => response.json())
        .then(() => {

        })
}

// Deletes a show from your list
export const deleteShow = (id) => {
    return fetch(`http://localhost:8088/seriesInput/${id}`, {
        method: "DELETE"
    })
}

// Returns a list of your shows
export const getMyShows = () => {
    return fetch(`http://localhost:8088/seriesInput`)
        .then(res => res.json())
}


// //-------------------------------------------------------------------------------

// // LISTS

// // Most Popular Movies
// export const getPopularMovies = () => {
//     return fetch(`${imdb.API}'en/API/MostPopularMovies/k_e23ph14d`)
//     .then(res => res.json())
// }

// //Movies Coming Soon
// export const getComingSoon = () => {
//     return fetch(`${imdb.API}'en/API/ComingSoon/k_e23ph14d`)
//     .then(res => res.json())
// }

// //In Theaters
// export const getInTheaters = () => {
//     return fetch(`${imdb.API}'en/API/InTheaters/k_e23ph14d`)
//     .then(res => res.json())
// }

// //Top Rated
// export const getTopRated = () => {
//     return fetch(`${imdb.API}'en/API/Top250Movies/k_e23ph14d`)
//     .then(res => res.json())
// }

// //-------------------------------------------------------------------------------

// //SEARCHES

// //Search Movies
// export const getSearchMovie = (keyword) => {
//     return fetch(`${imdb.API}'en/API/SearchMovie/k_e23ph14d/${keyword}`)
//     .then(res => res.json())
// }