import { useState, ChangeEvent } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

interface ModalProductsProps {
    show: boolean;
    handleShow: () => void;
  }

export const ModalProducts: React.FC<ModalProductsProps> = ({show, handleShow}) => {

    const [values, setValues] = useState({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };


      const createProduct = async ()=>{
        try {
            await fetch('http://localhost:3000/products', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            console.log('Creado');
            handleShow();
            
        } catch (error) {
            console.log(error);
        }
      };


    return (
        <Modal show={show} onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Nuevo producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>nombre</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese un nombre" name='nombre' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="marca">
                        <Form.Label>marca</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese una marca" name='marca' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="precio">
                        <Form.Label>precio</Form.Label>
                        <Form.Control type="number" placeholder="Ingrese un precio" name='precio' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>stock</Form.Label>
                        <Form.Control type="number" placeholder="Ingrese la cantidad de unidades en stock" name='stock' onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleShow}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={()=>createProduct()}>
                    Crear
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
