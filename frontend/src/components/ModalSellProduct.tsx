import { useState, ChangeEvent, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { ModalDataProps } from '../interfaces/modalProductsProps';

export const ModalSellProduct: React.FC<ModalDataProps> = ({show, handleShow, data}) => {

    const [values, setValues] = useState({
        productId: 0,
        tipo: 'Unidad',
        cantidad: 0,
        total: 0,
        fecha: new Date().toLocaleDateString(),
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
      };

      const sellProduct = async ()=>{
        const cantidadXCaja = values.tipo==="Caja"?(values.cantidad*10):0;
        
        if(values.cantidad>data.stock || cantidadXCaja > data.stock){
            return alert('No cuenta con suficiente stock para vender este producto');
        }
        
        try {
            await fetch('http://localhost:3000/sells', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-type': 'application/json'
                }
            });
            console.log('Vendido');
            handleShow();
            
        } catch (error) {
            console.log(error);
        }
      };

      useEffect(() => {
        setValues({...values, productId: data.id})
      }, [show])
      
      useEffect(() => {
        setValues({...values, total: values.tipo==='Unidad'?values.cantidad*data.precio:(values.cantidad*10)*data.precio})
      }, [values.cantidad, values.tipo])

    return (
        <Modal show={show} onHide={handleShow}>
            <Modal.Header closeButton>
                <Modal.Title>Vender un producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="productId">
                        <Form.Label>Producto</Form.Label>
                        <Form.Control type="text" disabled={true} value={data.nombre} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="nombre">
                        <Form.Label>Venta por:</Form.Label>
                        <Form.Select  placeholder="Ingrese un nombre" name='tipo' onChange={({target})=>setValues({...values, [target.name]: target.value})}>
                            <option value={"Unidad"}>Unidad</option>
                            <option value={"Caja"}>Caja</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="stock">
                        <Form.Label>Cantidad</Form.Label>
                        <Form.Control type="number" placeholder="Ingrese la cantidad" name='cantidad' onChange={handleChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="precio">
                        <Form.Label>Monto total:</Form.Label>
                        <Form.Control type="number" disabled={true} value={values.total} name='total' />
                    </Form.Group>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={handleShow}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={()=>sellProduct()}>
                    Vender
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
