
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

export const getInput = () => {
    return fetch('http://localhost:8088/userInput')
    .then(res => res.json())
}

export const deleteInput = (id) => {
    return fetch(`http://localhost:8088/userInput/${id}`, {
        method: "DELETE"
    })
}

// Returns a list of the users input
export const getAnimeInput = () => {
    return fetch(`http://localhost:8088/animeInput`)
        .then(res => res.json())
}

export const getAnimeInfo = (id) => {
    return fetch(`http://localhost:8788/AnimeInfo`)
    .then(res => res.json())
}

export const getInfo = (id) => {
    return fetch(`https://imdb-api.com/en/API/Title/k_t2t7otz1/${id}/FullActor,FullCast,Trailer,Ratings,Wikipedia`)
    .then(res => res.json())
}


export const postInfo = (request) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }

    return fetch(`http://localhost:8788/AnimeInfo`, fetchOptions)
        .then(response => response.json())
        .then(() => {

        })
}

// Movies
//--------------------------------------------------------------------------------------------

// Returns a list of movies
export const getAnime = () => {
    return fetch(`${mediaApi}Anime`)
        .then(res => res.json())
}

// Returns the specific Movie Object
export const getAnimeShow = (id) => {
    return fetch(`http://localhost:8788/AnimeInfo/${id}`)
        .then(res => res.json())
}

// Adds a Movie to your list
export const postAnime = (request) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request)
    }

    return fetch(`http://localhost:8088/animeInput`, fetchOptions)
        .then(response => response.json())
        .then(() => {

        })
}

// Deletes a movie from your list
export const deleteAnime = (id) => {
    return fetch(`http://localhost:8088/animeInput/${id}`, {
        method: "DELETE"
    })
}

// Returns the movies from your list 
export const getMyAnime = () => {
    return fetch(`http://localhost:8088/animeInput`)
        .then(res => res.json())
}



