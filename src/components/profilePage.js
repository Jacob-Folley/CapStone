import React, { useEffect, useState } from "react"
import { getMyMovies, getMyShows, getCustomer } from "./Fetch/imdb"
import { getMyAnime, getInput } from "./Fetch/anime"
import { useHistory } from "react-router-dom"
import { ListNavBar } from "./NavBar/listNavBar"

export const ProfilePage = () => {
    const [movies, setMovies] = useState([]);
    const [movieRatings, setMovieRatings] = useState([]);
    const [customer, setCustomer] = useState({});
    const [search, setSearch] = useState('')
    const [sorted, setSorted] = useState([])

    const history = useHistory()

    useEffect(
        () => {
            getCustomer()
                .then((data) => {
                    const name = data.find((obj) => {
                        return obj
                    })
                    setCustomer(name)
                })
        },
        []
    )

    useEffect(
        () => {
            getMyMovies()
                .then((data) => {
                    setMovies(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getInput()
                .then((data) => {
                    setMovieRatings(data)
                })
        },
        []
    )

    // const customerInfo = customer.find((obj) => {
    //     return obj.id === localStorage.getItem('capstone_customer')
    // })

    const getMovieRating = (movie) => {
        const ratingObj = movieRatings.find((rating) => {
            return rating.imdbId === movie.id
        })
        return ratingObj
    }


    useEffect(
        () => {
            search === "" ? getMyMovies().then((data) => { setMovies(data) }).then(getMyShows().then((data) => { setSeries(data) })).then(getMyAnime().then((data) => { setAnime(data) })) :
                setMovies(movies.filter((movie) => {
                    return movie.title.toLowerCase().includes(search.toLowerCase())
                }))
            setSeries(series.filter((show) => {
                return show.title.toLowerCase().includes(search.toLowerCase())
            }))
            setAnime(anime.filter((ani) => {
                return ani.title.toLowerCase().includes(search.toLowerCase())
            }))

        },
        [search]
    )

    //--------------------------------------------------------------------------------------------------------------------------------
    const [series, setSeries] = useState([]);
    const [seriesRatings, setSeriesRatings] = useState([]);

    useEffect(
        () => {
            getMyShows()
                .then((data) => {
                    setSeries(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getInput()
                .then((data) => {
                    setSeriesRatings(data)
                })
        },
        []
    )

    const getSeriesRating = (movie) => {
        const ratingObj = seriesRatings.find((rating) => {
            return rating.imdbId === movie.id
        })
        return ratingObj
    }

    //--------------------------------------------------------------------------------------------------------------------------------
    const [anime, setAnime] = useState([]);
    const [animeRatings, setAnimeRatings] = useState([]);

    useEffect(
        () => {
            getMyAnime()
                .then((data) => {
                    setAnime(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getInput()
                .then((data) => {
                    setAnimeRatings(data)
                })
        },
        []
    )


    useEffect(
        () => {
            movies.map((data) => {
                data.type = 'movie'
            })

            series.map((data) => {
                data.type = 'series'
            })

            anime.map((data) => {
                data.type = 'anime'
            })
            let profileList = []
            let finalList = []
            profileList = movies.concat(series)
            finalList = profileList.concat(anime)
            setSorted(finalList)
        },
        [anime, series, movies]
    )

    //--------------------------------------------------------------------------------------------------------------------------------
    const [book, setBook] = useState([]);

    const getAnimeRating = (movie) => {
        const ratingObj = animeRatings.find((rating) => {
            return rating.imdbId === movie.id
        })
        return ratingObj
    }

    const searchFunction = () => {
        const foundMovie = movies.find((movie) => {
            return movie.title.toLowerCase() === search.toLowerCase()
        })
        const foundShow = series.find((show) => {
            return show.title.toLowerCase() === search.toLowerCase()
        })
        const foundAnime = anime.find((ani) => {
            return ani.title.toLowerCase() === search.toLowerCase()
        })
        if (foundMovie) {
            history.push(`/movie/${foundMovie.id}`)

        } else if (foundShow) {
            history.push(`/series/${foundShow.id}`)
        } else if (foundAnime) {
            history.push(`/anime/${foundAnime.id}`)
        }
    }


    const newest = () => {
        let profileList = []
        let finalList = []
        profileList = movies.concat(series)
        finalList = profileList.concat(anime)
        finalList.sort((a, b) => b.year.slice(0, 4) - a.year.slice(0, 4))
        setSorted(finalList)
    }

    const rating = () => {
        let profileList = []
        let finalList = []
        profileList = movies.concat(series)
        finalList = profileList.concat(anime)
        finalList.sort((a, b) => b.imDbRating - a.imDbRating)
        setSorted(finalList)
    }

    const movieList = () => {
        setSorted(movies)
    }


    const seriesList = () => {
        setSorted(series)
    }


    const animeList = () => {
        setSorted(anime)
    }




    const total = movies.length + series.length + anime.length + book.length;

    //--------------------------------------------------------------------------------------------------------------------------------


    return (
        <>
            <ListNavBar />
            <div className="container">
                <div className="containerLeft">
                <div className="left">
                    <section className="userPicture">
                        <div className="picFrame"></div>
                        <div className="customerName">{customer.name}</div>
                    </section>

                    <section className="userStatistics">
                        <div className="stats">Total: {total}</div>
                        <div className="stats">Movies: {movies.length}</div>
                        <div className="stats">Series: {series.length}</div>
                        <div className="stats">Anime: {anime.length}</div>
                        <div className="stats">Books: {book.length}</div>
                    </section>
                </div>
                </div>

                <div className="containerRight">
                    <div className="profileFilterSearch">

                        <section className="categoryName">

                            <div className="ProfilelistCategory">
                                <div><button className="filter" onClick={() => { rating() }}>Rating</button></div>
                                <div><button className="filter" onClick={() => { newest() }}>Date</button></div>
                                <div><button className="filter">Genre</button></div>
                                <div><button className="filter" onClick={() => { movieList() }}>Movies</button></div>
                                <div><button className="filter" onClick={() => { seriesList() }}>Series</button></div>
                                <div><button className="filter" onClick={() => { animeList() }}>Anime</button></div>
                                <div><button className="filter">Books</button></div>
                            </div>
                        </section>

                        <div className="searchContainer">

                            <input className="searchBar" onChange={(e) => {
                                const searchItem = e.target.value
                                setSearch(searchItem)
                            }} type="text" placeholder="search..."></input>
                            <button className="submit" type="submit" onClick={() => { searchFunction() }}>go</button>

                        </div>
                    </div>

                    <hr />

                    <section className="userList">
                        {sorted.map((show) => {
                            // let rating = getMovieRating(movie)
                            { return <div className="listObj" onClick={() => { history.push(`/${show.type}/${show.id}`) }}> <div className="listTitle">{show.title}</div> <img src={show.image}></img> </div> }
                        })}
                        {/* {series.map((show) => {
                            let rating = getSeriesRating(show)
                            { return <div className="listObj" onClick={() => { history.push(`/series/${show.id}`) }}> <div className="listTitle">{show.title}</div> <img src={show.image}></img> {rating ? <div className="rating">{rating.rating}</div> : ""} </div> }
                        })}
                        {anime.map((show) => {
                            let rating = getAnimeRating(show)
                            { return <div className="listObj" onClick={() => { history.push(`/anime/${show.id}`) }}> <div className="listTitle">{show.title}</div> <img src={show.image}></img> {rating ? <div className="rating">{rating.rating}</div> : ""} </div> }
                        })} */}
                    </section>
                </div>
            </div>
        </>

    )
}
