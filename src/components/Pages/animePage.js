import React, { useEffect, useState } from "react"
import { useParams, useHistory, Link, useLocation} from "react-router-dom"
import { postAnime, getMyAnime, deleteAnime, getAnimeShow, postInput, getAnimeInput, getInput, deleteInput } from "../Fetch/anime"
import { ListNavBar } from "../NavBar/listNavBar"

export const Anime = () => {
    const user = parseInt(localStorage.getItem("capstone_customer"))
    const { animeId } = useParams()
    const history = useHistory()
    const location = useLocation()



    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [anime, setAnime] = useState({}) // Sets information for show
    const [shows, setShows] = useState([]) // Returns all shows that are added to your list
    const [userInput, setInput] = useState('') // Sets user input for review
    const [userRating, setRating] = useState('') // Sets user input for rating
    const [checkInput, setCheck] = useState({}) // Sets an object that has user rating and review
    const [animeFound, addAnime] = useState({}) // Sets if show is on your show list
    const [similar, setSimilar] = useState([]) //
    const [edit, setEdit] = useState(false)
    const [checkEdit, setEditCheck] = useState({})
    const [editRating, setEditRating] = useState('')
    // const [inputNumber, setNumber] = useState('')


    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getAnimeShow(animeId)
                .then((data) => {
                    setAnime(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getMyAnime()
                .then((data) => {
                    setShows(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getInput()
                .then((data) => {
                    const foundObj = data.find((obj) => {
                        return obj.userId === user && obj.imdbId === animeId
                    })
                    setCheck(foundObj)
                })
        },
        [checkEdit]
    )

    useEffect(
        () => {
            let findAnime = shows.find((show) => {
                return show.id === animeId
            })
            addAnime(findAnime)
        },
        [shows]
    )


    const animeCopy = { ...anime }

    useEffect(
        () => {
            const similarCopy = animeCopy?.similars
            setSimilar(similarCopy)
        },
        [anime]
    )


    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------


    let inputObject = {
        userId: user,
        imdbId: animeId,
        rating: userRating,
        review: userInput
    }


    const postAnimeList = () => {
        postAnime(anime)
            .then(() => {
                getMyAnime()
                    .then((data) => {
                        setShows(data)
                    })
            })
    }

    const deleteAnimeShow = () => {
        deleteAnime(animeId)
            .then(() => {
                getMyAnime()
                    .then((data) => {
                        setShows(data)
                    })
            })
    }

    const checkingInput = () => {
        postInput(inputObject)
            .then(() => {
                getInput()
                    .then((data) => {
                        const foundObj = data.find((obj) => {
                            return obj.userId === user && obj.imdbId === animeId
                        })
                        setCheck(foundObj)
                    })
            })
    }

    const editInput = (id) => {
        deleteInput(id)
            .then(() => {
                postInput(inputObject)
                .then(
                    getInput()
                        .then((data) => {
                            const foundObj = data.find((obj) => {
                                return obj.userId === user && obj.imdbId === animeId
                            })
                            setEditCheck(foundObj)
                        }))
            })
    }


    const findSeasons = () => {

    }



    const findRatings = () => {

    }





    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <ListNavBar />
            <section className="overallContainer">
                <section className="infoContainer">

                    <div className="picture">
                        <img src={anime.image} alt="animePicture"></img>
                    </div>

                    {edit ? <section className="userReviewContainer">
                            <section className="userReviewflex">
                                <div> <select onChange={() => { setEditRating(document.querySelector('select').value) }} name="rating" id="userRate">
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
                                </div>
                                
                            </section>
                            <div className="userReview">
                                <textarea onChange={() => { setInput(document.querySelector('textarea').value) }}>{checkInput.review}</textarea>
                            </div>
                           
                            <div><button className="reviewButton" onClick={() => {
                                    editInput(checkInput.id)
                                    document.querySelector('textarea').value = ''
                                    setEdit(false)
                                }}>submit</button>
                                </div>


                        </section> :
                    (checkInput ? <div className="userReview"><b>{checkInput.rating}</b> {checkInput.review} <button onClick={() => {setEdit(true)}}>edit</button></div> :
                        <section className="userReviewContainer">
                            <section className="userReviewflex">
                                <div> <select onChange={() => { setRating(document.querySelector('select').value) }} name="rating" id="userRate">
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
                                </div>
                                
                            </section>
                            <div className="userReview">
                                <textarea placeholder=" write a review..."onChange={() => { setInput(document.querySelector('textarea').value) }}>{checkEdit.review}</textarea>
                            </div>
                           
                            <div><button className="reviewButton" onClick={() => {
                                    checkingInput()
                                    document.querySelector('textarea').value = ''
                                    setEdit(false)
                                }}>submit</button>
                                </div>


                        </section>)}

                    {/* <div className="info">

                    </div> */}

                </section>


                <section className="MainContainer">

                    <div className="title">
                        <h2>{anime.title}</h2>
                        {animeFound ? <button type="submit" className="addDelete" onClick={() => { deleteAnimeShow() }}>Remove</button> : <button type="submit" className="addDelete" onClick={() => { postAnimeList() }}>Add</button>}
                    </div>

                    <div className="info">
                        <div className="yearType">
                            <p><b>{anime.year}</b> {anime.type}</p>
                            <p>{anime.awards}</p>
                        </div>
                        <div className="starGenre">
                            <p><b>Stars: </b>{anime.stars}</p>
                            <p><b>Genres: </b>{anime.genres}</p>
                        </div>
                    </div>

                    <div className="trailer">
                        <video src={anime.trailer?.link} controls></video>
                    </div>

                    <div className="synopsis">
                        <p>{anime.plot}</p>
                    </div>

                </section>





                <section className="ratingsContainer">

                    <section className="mediaRatings">
                        <div className="ratings">
                            {anime.imDbRating !== "" ?
                                <div><b>{anime.imDbRating}</b>: IMDb</div> : null}

                            {anime.ratings?.rottenTomatoes !== "" ?
                                <div><b>{anime.ratings?.rottenTomatoes}</b>: Rotten Tomatoes</div> : null}

                            {anime.ratings?.theMovieDb !== "" ?
                                <div><b>{anime.ratings?.theMovieDb}</b>: MovieDb</div> : null}

                            {anime.ratings?.tV_com !== "" ?
                                <div><b>{anime.ratings?.tV_com}</b>: TV.com</div> : null}

                            {anime.ratings?.filmAffinity !== "" ?
                                <div><b>{anime.ratings?.filmAffinity}</b>: Film Affinity:</div> : null}

                            {anime.ratings?.metacritic !== "" ?
                                <div><b>{anime.ratings?.metacritic}</b>: MetaCritic</div> : null}

                        </div>
                    </section>

                    <div className="similarContainer">
                        <div className="similarTitle"><h4 className="similarTitle">Similar:</h4></div>
                        {similar ? similar.map((show) => { return <div className="similarObj" onClick={() => { history.push(`/anime/${show.id}`)}}>{show.title}</div>}) : null }
                    </div>

                </section>
            </section>

        </>

    )
}