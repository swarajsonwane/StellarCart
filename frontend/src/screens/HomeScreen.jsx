import { useState, useEffect} from 'react'
import React from 'react'
import {  Row, Col } from "react-bootstrap"
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useGetProductsQuery } from '../slices/productApiSlice'


const HomeScreen = () => {

  const {data:products =[], isloading , error} = useGetProductsQuery()

  // Now below will be replaces by above redux state
  // const [products, setProducts] = useState([])

  // // Any value in [] changes then useEffect will run 
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const {data} = await axios.get('/api/products')
  //     setProducts(data)
  //   }
  //   fetchProducts()
  // }, [])

  
  return (
   <>
       {isloading ? <Loader/> : error ? <Message variant='danger'>{error.error || error?.data?.message}</Message> : 
       (<><h1>Latest Products</h1>
        <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row></>)
        }
        
   </>
  )
}

export default HomeScreen