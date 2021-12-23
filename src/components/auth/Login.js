import React, { useRef, useState } from "react"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8088/customers?email=${email}`)
            .then(res => res.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        existingUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem("capstone_customer", exists.id)
                    history.push("/")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <main className="container--log">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
            </dialog>

            <div className="appNameTitle">
                <h1>TSUNDOKU</h1>
                <h2>Keep track of all your favorites.</h2>
                </div>
            <section className="container--login">
                <form className="form--login" onSubmit={handleLogin}>
                    <fieldset>
                        <label htmlFor="inputEmail"></label>
                        <input type="email"
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="loginButton">
                            LOG IN
                        </button>
                    </fieldset>
                    <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
                </form>
            </section>
        </main>
    )
}

