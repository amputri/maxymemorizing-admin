import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbreact/dist/css/mdb.css'
import Back from './Back/Back'
import Front from './Front/Front'
import React from 'react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from './Back/Login'

function App() {
	return (
		<div>
			<Router>
				<Route path="/" component={Front} exact />
				<Route path="/admin" component={Back} />
				<Route path="/login" component={Login} />
			</Router>
		</div>
	)
}

export default App
