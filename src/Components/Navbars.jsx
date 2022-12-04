import React, { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Navbars = () => {
    const [show, setShow] = useState(false);
    const [img, setImg] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmitCreateProd = (e) => {
        e.preventDefault()
        fetch('http://localhost:3001/product', {
            method:'POST',
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
        .then((res) => handleClose(false))
    }

    return (
        <Navbar bg="dark" variant="dark" className='ps-3 d-flex justify-content-between'>
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src="/logo512.png"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                /> React Bootstrap
            </Navbar.Brand>
            <div>
                <Link to='/register' className='me-3 btn btn-success'>Registrarse</Link>
                <Link to='/login' className='me-3 btn btn-primary'>Iniciar Sesion</Link>
                <Button variant="primary" onClick={handleShow} className='ms-3'>
                    Crear Producto
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Imagen</Form.Label>
                            <Form.Control type="text" name='img' value={img} onChange={(e) => setImg(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="text" name='price' value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Descripcion</Form.Label>
                            <Form.Control type="text" name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>
                        <Button variant="primary" type="submit" onClick={(e) => handleSubmitCreateProd(e)}>
                            Guardar Cambios
                        </Button>
                    </Form>
                </Modal>
            </div>
        </Navbar>
    )
}

export default Navbars