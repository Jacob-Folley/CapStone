import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { postAnime, getMyAnime, deleteAnime, getAnimeShow, postInput, getAnimeInput } from "../Fetch/anime"
import { ListNavBar } from "../NavBar/listNavBar"

export const Anime = () => {
    const user = parseInt(localStorage.getItem("capstone_customer"))
    const { animeId } = useParams()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [anime, setAnime] = useState({}) // Sets information for show
    const [shows, setShows] = useState([]) // Returns all shows that are added to your list
    const [userInput, setInput] = useState('') // Sets user input for review
    const [userRating, setRating] = useState('') // Sets user input for rating
    const [checkInput, setCheck] = useState({}) // Sets an object that has user rating and review
    const [animeFound, addAnime] = useState({}) // Sets if show is on your show list


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
            getAnimeInput()
                .then((data) => {
                    const foundObj = data.find((obj) => {
                        return obj.userId === user && obj.imdbId === animeId
                    })
                    setCheck(foundObj)
                })
        },
        []
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
        .then(() => {getAnimeInput()
                .then((data) => {
                    const foundObj = data.find((obj) => {
                        return obj.userId === user && obj.imdbId === animeId
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
                    <img src={anime.image} alt="animePicture"></img>
                </div>
                
                <div className="info">

                </div>
            
            </section>


            <section className="MainContainer">
             
                <div className="title">
                    <h1>{anime.title}</h1>
                    {animeFound ? <button type="submit" className="addDelete" onClick={() => { deleteAnimeShow() }}>Remove</button> : <button type="submit" className="addDelete" onClick={() => { postAnimeList() }}>Add</button>}
                </div>
               
                <div className="synopsis">
                    <p></p>
                </div>
            
            </section>

            
           


            <section className="ratingsContainer">
              
                <div className="ratings">
                    imdb rating: <b>{anime.imDbRating}</b>
                </div>

            


            
            {checkInput ? <div className="userReview"><b>{checkInput.rating}</b> {checkInput.review} </div> :
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

                    <div><button className="reviewButton" onClick={() => {
                        checkingInput()
                        document.querySelector('textarea').value = ''
                    }}>submit</button>
                    </div>
                    </section>
                    <div className="userReview">
                        <textarea onChange={() => { setInput(document.querySelector('textarea').value) }}></textarea>
                    </div>

            

                </section>}

                </section>
                </section>

        </>

    )
}