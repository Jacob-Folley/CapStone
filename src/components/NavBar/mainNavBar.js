
export const sideBar = () => {
    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }


    const topRated = () => {
        let animeCopy = anime.map(movie => ({ ...movie }))
        animeCopy.sort((a, b) => { return a.imDbRating - b.imDbRating })
        return setSorted(animeCopy)

    }

    const newest = () => {
        let animeCopy = anime.map(movie => ({ ...movie }))
        animeCopy.sort((a, b) => {return b.year - a.year })
        setSorted(animeCopy)
    }


    const searchFunction = () => {
        const foundAnime = anime.find((anime) => {
            return anime.title === search
        })
        if (foundAnime) {
            history.push(`/anime/${foundAnime.id}`)

        }
    }

    return (
    <section className="listSideBar">
        <div className="searchContainer">
            <input className="SearchBar" onChange={() => {
                const cap = capitalize(document.querySelector('input').value)
                setSearch(cap.split(' ').map(capitalize).join(' '));
            }}></input>
            <button onClick={() => { searchFunction() }}>search</button>
        </div>
        <div className="listType">
            <h3>Type</h3>
            <Link to={`/movie`}>Movies</Link>
            <Link to={`/series`}>Series</Link>
            <Link to={`/anime`}>Anime</Link>
            <Link to={`/book`}>Books</Link>
        </div>
        <div className="listCategory">
            <h3>Category</h3>
            <button onClick={() => { topRated() }}>Top Rated</button>
            <button onClick={() => { newest() }}>Date</button>
            <button>Genre</button>
        </div>
    </section>
    )
}