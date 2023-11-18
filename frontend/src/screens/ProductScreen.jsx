import { useParams, useNavigate} from "react-router-dom"
import { useState } from "react"
import {Link} from 'react-router-dom'
import {Form, Row, Col, Image, ListGroup, Card, Button} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from "../components/Loader"
import Message from "../components/Message"
import {useGetProductDetailsQuery} from '../slices/productApiSlice'
import { addToCart } from "../slices/cartSlice"
import { useDispatch } from "react-redux"



const ProductScreen = () => {

    const { id: productId } = useParams();

    const [qty , setQty] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

   

    
    const {data:product =[], isloading , error} = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({...product, qty}))
        navigate('/cart')
    }

    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const {data} = await axios.get(`/api/products/${productId}`)
    //         setProducts(data)
    //     }
    //     fetchProducts()
    // }, [productId])

  return (
    <>
     <Link className='btn btn-light my-3' to='/'>
            Go Back
     </Link>
        {isloading ? <Loader/> : error ? <Message variant='danger'>{error.error || error?.data?.message}</Message> : (
            <>
             <Row>
            <Col md={5}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>

            <Col md={4}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>{product.name}</h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ₹{product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Description: {product.description}
                    </ListGroup.Item>
                </ListGroup>    

            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>Price:</Col>
                                <Col>₹{product.price}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Status:</Col>
                                <strong>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</strong>
                            </Row>
                        </ListGroup.Item>
                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>Qty</Col>
                                    <Col>
                                       <Form.Control
                                        as='select'
                                        value={qty}
                                        onChange={(e) => setQty(Number(e.target.value))}
                                       >
                                        {
                                            [...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>
                                            ))
                                        }
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}  
                        <ListGroup.Item>
                            <Button className='btn-block' type='button' disabled={product.countInStock === 0}
                            onClick={addToCartHandler}
                            >
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
                                    

            </Col>
        </Row>
            </>
        )}
    </>
  )
}

export default ProductScreen