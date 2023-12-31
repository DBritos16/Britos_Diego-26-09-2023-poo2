import { Modal, Button } from 'react-bootstrap';
import { ModalDataProps } from '../interfaces/modalProductsProps';


export const ModalDeleteProduct: React.FC<ModalDataProps> = ({show, handleShow, data}) => {
  
    const deleteProduct = async ()=>{
        try {
            await fetch(`http://localhost:3000/products/${data.id}`, {
                method: 'DELETE'
            })

            handleShow();
        } catch (error) {
            console.log(error);
        }
    };


    return (
    <Modal show={show} onHide={handleShow} centered={true}>
        
        <Modal.Body>
            <div className='delete-msg'>
                <h1>Estas seguro que quieres eliminar {data.nombre}?</h1>  
            </div>
        </Modal.Body>
        <Modal.Footer className='delete-footer'>
          <Button variant="danger" onClick={handleShow}>
            Cancelar
          </Button>
          <Button variant="warning" onClick={()=> deleteProduct()}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
