import React from 'react'
import Main from './layouts/Main'
import Nav from './layouts/Nav'
import { Redirect } from 'react-router-dom'

const Back = () => {
    if (sessionStorage.getItem('token') === null) {
        return <Redirect to='/login' />
    }

    return (
        <div>
            <div className="row">
                <div className="col-12">
                    <Nav />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Main />
                </div>
            </div>
        </div>
    )
}

export default Back
