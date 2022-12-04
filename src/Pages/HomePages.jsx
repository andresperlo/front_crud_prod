import React, { useEffect, useState } from 'react'
import Navbars from '../Components/Navbars'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom'

const HomePages = () => {
    const [products, setProducts] = useState([])


    const fetchGetAllProduct = () => {
        fetch('http://localhost:3001/product')
            .then((res) => res.json())
            .then((res) => {
                setProducts(res)
            })
    }

    useEffect(() => {
        fetchGetAllProduct()
    }, [])
    

    return (
        <>
            <Navbars />
            <h3 className='text-center my-3'>Productos</h3>
            <div className='d-flex mt-5 justify-content-center'>
                {
                    products.map((product) =>
                        <Card style={{ width: '18rem' }} key={product._id} className='mx-3'>
                            <Card.Img variant="top" src={product.img} />
                            <Card.Body>
                                <Card.Title>{product.name}</Card.Title>
                                <Card.Text>
                                    ${product.price}
                                </Card.Text>
                                <Card.Text>
                                    {product.description}
                                </Card.Text>
                                <Link to={`/product/${product._id}`} className='btn btn-outline-primary'>Ver Mas...</Link>
                            </Card.Body>
                        </Card>
                    )
                }

            </div>

        </>
    )
}

export default HomePages