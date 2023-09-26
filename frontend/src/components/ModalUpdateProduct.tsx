import { useState, ChangeEvent, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ModalDataProps } from '../interfaces/modalProductsProps';
import { Product } from '../interfaces/product.interface';


export const ModalUpdateProduct: React.FC<ModalDataProps> = ({show, handleShow, data}) => {

    const [values, setValues] = useState<Product>(data);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };


      const updateProduct = async ()=>{
        try {
            await fetch(`http://localhost:3000/products/${data.id}`, {
                method: 'PUT',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            console.log('Actualizado');
            handleShow();
            
        } catch (error) {
            console.log(error);
        }
      };

      useEffect(()=>{
        setValues(data);
      },[show])

    return (    
        <Modal show={show} onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Editar producto: {data.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>nombre</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese un nombre" value={values.nombre} name='nombre' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="marca">
                        <Form.Label>marca</Form.Label>
                        <Form.Control type="text" placeholder="Ingrese una marca" value={values.marca} name='marca' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="precio">
                        <Form.Label>precio</Form.Label>
                        <Form.Control type="number" placeholder="Ingrese un precio" value={values.precio} name='precio' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>stock</Form.Label>
                        <Form.Control type="number" placeholder="Ingrese la cantidad de unidades en stock" value={values.stock} name='stock' onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleShow}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={()=>updateProduct()}>
                    Crear
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
