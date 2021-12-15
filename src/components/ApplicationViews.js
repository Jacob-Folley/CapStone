import React from "react"
import { Route } from "react-router-dom"

import { HomePage } from './homePage'
import { ProfilePage } from './profilePage'
import { AnimeList } from './Lists/animeList'
import { BookList } from './Lists/bookList'
import { MovieList } from './Lists/moviesList'
import { SeriesList } from './Lists/seriesList'
import { Movie } from './Pages/moviePage'
import { Series } from './Pages/seriesPage'
import { Anime } from './Pages/animePage'

const ApplicationViews = () => {
    return (
        <>

            <Route exact path="/">
                <HomePage />
            </Route>


            <Route exact path="/profile">
                <ProfilePage />
            </Route>


            <Route exact path="/anime">
                <AnimeList />
            </Route>


            <Route exact path="/book">
                <BookList />
            </Route>


            <Route exact path="/movie">
                <MovieList />
            </Route>

            <Route exact path="/series">
                <SeriesList />
            </Route>

            <Route exact path="/movie/:movieId">
                <Movie />
            </Route>

            <Route exact path="/series/:seriesId">
                <Series />
            </Route>

            <Route exact path="/anime/:animeId">
                <Anime />
            </Route>

        </>
    )
}

export default ApplicationViews