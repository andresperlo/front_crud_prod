import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbars from '../Components/Navbars'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const OneProduct = () => {
    const [product, setProduct] = useState(null)
    const [show, setShow] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [img, setImg] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')

    const params = useParams()
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const fetchOneProduct = () => {
        fetch(`http://localhost:3001/product/${params.id}`)
            .then((res) => res.json())
            .then((res) => {
                setProduct(res)
                setImg(res.img)
                setName(res.name)
                setPrice(res.price)
                setDescription(res.description)
            })
    }

    const handleSubmitModifyProd = (e) => {
        e.preventDefault()
        fetch(`http://localhost:3001/product/${params.id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                img,
                name,
                price,
                description
            })
        })
            .then((res) => res.json())
            .then((res) => {
                console.log('res', res)
                handleClose()
            })
    }

    const handleDeleteOneProduct = (id) => {
        fetch(`http://localhost:3001/product/${id}`, {
            method:'DELETE',
            headers:{
                "Content-type": "application/json"
            }
        })
        .then((res) => res.json())
        .then(() => navigate('/'))
    }

    useEffect(() => {
        fetchOneProduct()
    }, [])

    return (
        <>
            <Navbars />
            <Card style={{ width: '18rem' }} key={product?._id} className='mx-3'>
                <Card.Img variant="top" src={product?.img} />
                <Card.Body>
                    <Card.Title>{product?.name}</Card.Title>
                    <Card.Text>
                        ${product?.price}
                    </Card.Text>
                    <Card.Text>
                        {product?.description}
                    </Card.Text>
                    <Link to={token ? `/cart` : '/login'} className='btn btn-outline-primary'>Comprar</Link>
                    <Button variant="primary" onClick={handleShow} className='ms-3'>
                        Editar Producto
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Imagen</Form.Label>
                                <Form.Control type="text" value={img} onChange={(e) => setImg(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Descripcion</Form.Label>
                                <Form.Control type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={(e) => handleSubmitModifyProd(e)}>
                                Guardar Cambios
                            </Button>
                        </Form>
                    </Modal>


                    <Button variant="danger" onClick={handleShowDelete} className='mt-3'>
                        Eliminar
                    </Button>

                    <Modal show={showDelete} onHide={handleCloseDelete}>
                        <Modal.Header closeButton>
                            <Modal.Title>¿Estas Seguro de que quiere eliminar este producto?</Modal.Title>
                        </Modal.Header>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseDelete}>
                                NO
                            </Button>
                            <Button variant="primary" onClick={() => handleDeleteOneProduct(product._id)}>
                               SI, estoy seguro
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card.Body>
            </Card>
        </>
    )
}

export default OneProduct