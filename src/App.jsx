import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Layout from './layout/Layout'
import HomePage from './components/Home Page/HomePage'
import './styles.css'
import AboutProduct from './components/About Product/AboutProduct'
import About from './components/About/About'
import Product from './components/Product/Product'

const App = () => {
  const router = createBrowserRouter([
    {
      path : '/' ,
      element : <Layout/> ,
      children : [
        {
          index : true ,
          element : <HomePage/>
        },
        {
          path : '/Product',
          element : <Product/>
        },
        {
          path : '/About',
          element : <About/>
        },
        {
          path : 'product/:id' ,
          element : <AboutProduct/>
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App