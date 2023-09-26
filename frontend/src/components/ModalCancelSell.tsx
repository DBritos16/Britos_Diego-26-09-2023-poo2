import { Modal, Button } from 'react-bootstrap';
import { ModalSellProps } from '../interfaces/modalProductsProps';


export const ModalCancelSell: React.FC<ModalSellProps> = ({show, handleShow, data}) => {
  
    const cancelSell = async ()=>{
        try {
            await fetch(`http://localhost:3000/sells/${data.id}`, {
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
                <h1>Estas seguro que quieres cancelar la venta {data.id}?</h1>  
            </div>
        </Modal.Body>
        <Modal.Footer className='delete-footer'>
          <Button variant="danger" onClick={handleShow}>
            Volver atras
          </Button>
          <Button variant="warning" onClick={()=> cancelSell()}>
            Cancelar venta
          </Button>
        </Modal.Footer>
      </Modal>
  )
}
