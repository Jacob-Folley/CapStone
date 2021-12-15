import React, { useEffect, useState } from "react"
import { getMyMovies, getUserInput, getMyShows } from "./Fetch/imdb"
import { useHistory } from "react-router-dom"
import { ListNavBar } from "./NavBar/listNavBar"

export const ProfilePage = () => {
    const [movies, setMovies] = useState([]);
    const [movieRatings, setMovieRatings] = useState([]);

    const history = useHistory()

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

    return (
        <>
            <ListNavBar />
            <section className="userPicture">

            </section>

            <section className="userStatistics">

            </section>

            <section className="userList">
                {movies.map((movie) => {
                    let rating = getMovieRating(movie)
                    { return <div className="listObj" onClick={() => { history.push(`/movie/${movie.id}`) }}> <div className="listTitle">{movie.title}</div> <img src={movie.image}></img> {rating ? <div className="rating">{rating.rating}</div> : ""} </div> }
                })}
                {series.map((show) => {
                    let rating = getSeriesRating(show)
                    { return <div className="listObj" onClick={() => { history.push(`/series/${show.id}`) }}> <div className="listTitle">{show.title}</div> <img src={show.image}></img> {rating ? <div className="rating">{rating.rating}</div> : ""} </div> }
                })}
            </section>

            <section className="userHome">

            </section>
        </>

    )
}
