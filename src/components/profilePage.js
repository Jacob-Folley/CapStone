import React, { useEffect, useState } from "react"
import { getMyMovies, getUserInput, getMyShows, getCustomer } from "./Fetch/imdb"
import { getMyAnime } from "./Fetch/anime"
import { useHistory } from "react-router-dom"
import { ListNavBar } from "./NavBar/listNavBar"

export const ProfilePage = () => {
    const [movies, setMovies] = useState([]);
    const [movieRatings, setMovieRatings] = useState([]);
    const [customer, setCustomer] = useState({});

    const history = useHistory()

    useEffect(
        () => {
            getCustomer()
                .then((data) => {
                    setCustomer(data)
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
            getUserInput()
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
            getUserInput()
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
            getUserInput()
                .then((data) => {
                    setAnimeRatings(data)
                })
        },
        []
    )

    const getAnimeRating = (movie) => {
        const ratingObj = animeRatings.find((rating) => {
            return rating.imdbId === movie.id
        })
        return ratingObj
    }

//--------------------------------------------------------------------------------------------------------------------------------


    return (
        <>
            <ListNavBar />
            <div className="container">
                <div className="left">
                    <section className="userPicture">
                        <div className="picFrame"></div>
                        <div className="name"><h2>{customer.name}</h2></div>
                    </section>

                    <section className="userStatistics">
                        <div className="stats">Total: </div>
                        <div className="stats">Movies: </div>
                        <div className="stats">Series: </div>
                        <div className="stats">Anime: </div>
                        <div className="stats">Books: </div>
                    </section>
                </div>

                <section className="userList">
                    {movies.map((movie) => {
                        let rating = getMovieRating(movie)
                        { return <div className="listObj" onClick={() => { history.push(`/movie/${movie.id}`) }}> <div className="listTitle">{movie.title}</div> <img src={movie.image}></img> {rating ? <div className="rating">{rating.rating}</div> : ""} </div> }
                    })}
                    {series.map((show) => {
                        let rating = getSeriesRating(show)
                        { return <div className="listObj" onClick={() => { history.push(`/series/${show.id}`) }}> <div className="listTitle">{show.title}</div> <img src={show.image}></img> {rating ? <div className="rating">{rating.rating}</div> : ""} </div> }
                    })}
                    {anime.map((show) => {
                        let rating = getAnimeRating(show)
                        { return <div className="listObj" onClick={() => { history.push(`/anime/${show.id}`) }}> <div className="listTitle">{show.title}</div> <img src={show.image}></img> {rating ? <div className="rating">{rating.rating}</div> : ""} </div> }
                    })}
                </section>
            </div>
        </>

    )
}
