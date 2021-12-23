import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { postShow, getMyShows, deleteShow, getShow, postInput } from "../Fetch/imdb"
import { getInput } from "../Fetch/anime"
import { ListNavBar } from "../NavBar/listNavBar"

export const Series = () => {
    const user = parseInt(localStorage.getItem("capstone_customer"))
    const { seriesId } = useParams()

    // Use States
    //-------------------------------------------------------------------------------------------------------------------

    const [series, setSeries] = useState({})
    const [trailer, setTrailer] = useState({})
    const [seriess, setSeriess] = useState([])
    const [userInput, setInput] = useState('')
    const [userRating, setRating] = useState('')
    const [checkInput, setCheck] = useState({})
    const [seriesFound, addSeries] = useState({})


    // Use Effects
    //-------------------------------------------------------------------------------------------------------------------

    useEffect(
        () => {
            getShow(seriesId)
                .then((data) => {
                    setSeries(data)
                })
        },
        []
    )

    useEffect(
        () => {
            return fetch(`https://imdb-api.com/en/API/Trailer/k_qjajechb/${seriesId}`)
                .then(res => res.json())
                .then((data) => {
                    setTrailer(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getMyShows()
                .then((data) => {
                    setSeriess(data)
                })
        },
        []
    )

    useEffect(
        () => {
            getInput()
                .then((data) => {
                    const foundObj = data.find((obj) => {
                        return obj.userId === user && obj.imdbId === seriesId
                    })
                    setCheck(foundObj)
                })
        },
        []
    )

    useEffect(
        () => {
            let findSeries = seriess.find((series) => {
                return series.id === seriesId
            })
            addSeries(findSeries)
            
        },
        [seriess]
    )

    
    
    // Functions/Objects
    //-------------------------------------------------------------------------------------------------------------------
    
    let inputObject = {
        userId: user,
        imdbId: seriesId,
        rating: userRating,
        review: userInput
    }
    
    
    const postSeriesList = () => {
        postShow(series)
        .then(() => {
            getMyShows()
            .then((data) => {
                setSeriess(data)
            })
        })
    }

    const deleteSeries = () => {
        deleteShow(seriesId)
        .then(() => {
            getMyShows()
            .then((data) => {
                setSeriess(data)
            })
        })
    }

    const checkingInput = () => {
        postInput(inputObject)
        .then(() => {getInput()
                .then((data) => {
                    const foundObj = data.find((obj) => {
                        return obj.userId === user && obj.imdbId === seriesId
                    })
                    setCheck(foundObj)
                })
            })
    }


    //-------------------------------------------------------------------------------------------------------------------

    return (
        <>
            <ListNavBar />
            <article className="overallContainer">
            <section className="infoContainer">

                <div className="picture">
                    <img src={series.image} alt="seriesPicture"></img>
                </div>

                <div className="info">

                </div>

            </section>

            <section className="MainContainer">

                <div className="title">
                    <h1>{series.title}</h1>
                    {seriesFound ? <button type="submit" className="addDelete" onClick={() => { deleteSeries() }}>Remove</button> : <button type="submit" className="addDelete" onClick={() => { postSeriesList() }}>Add</button>}
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
                    imdb rating: {series.imDbRating}
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
                </article>

        </>

    )
}