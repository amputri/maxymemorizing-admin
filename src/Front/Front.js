import React from 'react';
import Footer from './pages/Footer';
import Main from './pages/Main';
import Nav from './pages/Nav';
import Side from './pages/Side';

const Front = () => {
    return (
        <div>
            <div className="row">
                <div>
                    <Nav />
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <Side />
                </div>
                <div className="col-8">
                    <Main />
                </div>
            </div>
            <div className="row">
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default Front;
