import ReactDOM from 'react-dom'
import close from '../images/icon-close.svg'
import rules from '../images/image-rules.svg'

const portalDiv = document.getElementById('modal')!

const Modal = ({ toggle }: any) => {

  return ReactDOM.createPortal(
    <div className="modal-container">
      <div className="modal-box">
        <div className="modal__header">
          <h1>Rules</h1>
          <button onClick={toggle}>
            <img src={close} alt="Close" />
          </button>
        </div>
        <img src={rules} alt="Rules" />
      </div>
    </div>,
    portalDiv
  )
}

export default Modal
