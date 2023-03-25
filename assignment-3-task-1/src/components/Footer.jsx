import React, { useState } from 'react'
import Modal from './Modal'
const Footer = () => {
  const [modal, setModal] = useState(false)

  const toggle = () => {
    setModal(!modal)
  }

  return (
    <>
      <footer className="footer">
        <div class="attribution">
          Coded by{' '}
          <a href="" target="_blank">
            Alex Kumancev
          </a>
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
