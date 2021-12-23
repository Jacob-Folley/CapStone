import React from "react"
import { useHistory } from "react-router-dom"

export const NavBar = () => {
    const history = useHistory()
    
    return (
        <article className="listnavbar">

            
            <section className="appLink" onClick={() => { history.push("/") }}>
                <h5 className="appName">
                    App Name
                </h5>
            </section>
    
            <section className="listprofileLink">
                <button className="listprofileButton" onClick={() => { history.push("/profile") }}>
                    J
                </button>
            </section>     
    
        </article>
    )
}
