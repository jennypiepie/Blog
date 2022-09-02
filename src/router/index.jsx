/* 
    App > List + Edit + Means
    Login
    Register
    History模式  --  BrowserRouter
    Hash模式     --  HashRouter
*/

import App from '../App'
import Dynamic from '../pages/Dynamic'
import Article from '../pages/Article'
import ToDo from '../pages/ToDo'
import Demo from '../pages/Demo'
import Edit from '../pages/Edit'
import Means from '../pages/Means'
import Login from '../pages/Login'
import Register from '../pages/Register'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import AuthRoute from '../components/AuthRoute'

const BaseRouter = () => (
    <Router>
        <Routes>
            <Route path='/' element={<AuthRoute><App /></AuthRoute>}>
                <Route path='/dynamic' element={<Dynamic />}></Route>
                <Route path='/article' element={<Article />}></Route>
                <Route path='/todo' element={<ToDo />}></Route>
                <Route path='/demo' element={<Demo />}></Route>
                <Route path='/edit' element={<Edit />}></Route>
                <Route path='/edit/:id' element={<Edit />}></Route>
                <Route path='/means' element={<Means />}></Route>
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
        </Routes>
    </Router>
)

export default BaseRouter