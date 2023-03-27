import { useState } from 'react'
import Modal from './Modal'

const Footer = () => {
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  return (
    <>
      <footer className="footer">
        <div className="attribution">
          <p>
            Coded by{' '}
            <a href="https://github.com/kumancev" target="_blank" data-replace="See my github">
              <span>Alex Kumancev</span>
            </a>
          </p>
        </div>
        <button className="rules" onClick={toggle}>
          Rules
        </button>
      </footer>
      {modal ? <Modal toggle={toggle} /> : null}
    </>
  )
}

export default Footer
