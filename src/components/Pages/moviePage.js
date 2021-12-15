import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { postMovie, getMyMovies, deleteMovie, getMovie, postInput, getUserInput } from "../Fetch/imdb"
import { ListNavBar } from "../NavBar/listNavBar"

export const Movie = () => {
    const user = parseInt(localStorage.getItem("capstone_customer"))
    const { movieId } = useParams()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [movie, setMovie] = useState({})
    const [trailer, setTrailer] = useState({})
    const [movies, setMovies] = useState([])
    const [userInput, setInput] = useState('')
    const [userRating, setRating] = useState('')
    const [checkInput, setCheck] = useState({})
    const [movieFound, addMovie] = useState({})


    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getMovie(movieId)
                .then((data) => {
                    setMovie(data)
                })
        },
        []
    )

    useEffect(
        () => {
            return fetch(`https://imdb-api.com/en/API/Trailer/k_qjajechb/${movieId}`)
                .then(res => res.json())
                .then((data) => {
                    setTrailer(data)
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
                    const foundObj = data.find((obj) => {
                        return obj.userId === user && obj.imdbId === movieId
                    })
                    setCheck(foundObj)
                })
        },
        []
    )

    useEffect(
        () => {
            let findMovie = movies.find((movie) => {
                return movie.id === movieId
            })
            addMovie(findMovie)
            
        },
        [movies]
    )

    
    
    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    
    let inputObject = {
        userId: user,
        imdbId: movieId,
        rating: userRating,
        review: userInput
    }
    
    
    const postMovieList = () => {
        postMovie(movie)
        .then(() => {
            getMyMovies()
            .then((data) => {
                setMovies(data)
            })
        })
    }

    const deleteMovies = () => {
        deleteMovie(movieId)
        .then(() => {
            getMyMovies()
            .then((data) => {
                setMovies(data)
            })
        })
    }

    const checkingInput = () => {
        postInput(inputObject)
        .then(() => {getUserInput()
                .then((data) => {
                    const foundObj = data.find((obj) => {
                        return obj.userId === user && obj.imdbId === movieId
                    })
                    setCheck(foundObj)
                })
            })
    }


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>

            <ListNavBar />
            <section className="overallContainer">
            <section className="infoContainer">

                <div className="picture">
                    <img src={movie.image} alt="moviePicture"></img>
                </div>

                <div className="info">

                </div>

            </section>

            <section className="MainContainer">

                <div className="title">
                    <h1>{movie.title}</h1>
                    {movieFound ? <button type="submit" onClick={() => { deleteMovies() }}>Remove</button> : <button type="submit" className="addDelete" onClick={() => { postMovieList() }}>Add</button>}
                </div>

                <div className="trailer">
                    <video src={trailer.link} controls></video>
                </div>

                <div className="synopsis">
                    <p>{trailer.videoDescription}</p>
                </div>

            </section>



            <section className="ratingsContainer">

                <div className="ratings">
                    imdb rating: {movie.imDbRating}
                </div>

            


            {checkInput ? <div className="userReviewRating">{checkInput.rating} {checkInput.review} </div> :
                <section className="userReviewContainer">

                    <select onChange={() => { setRating(document.querySelector('select').value) }} name="rating" id="userRate">
                        <option>Select a Rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>

                    <div className="userReview">
                        <textarea onChange={() => { setInput(document.querySelector('textarea').value) }}></textarea>
                    </div>

                    <button className="submit" onClick={() => {
                        checkingInput()
                        document.querySelector('textarea').value = ''
                    }}>submit</button>

                </section>}

                </section>
                </section>

        </>

    )
}