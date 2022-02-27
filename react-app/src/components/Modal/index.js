import React from 'react'
import ReactDom from 'react-dom'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  // padding: '50px',
  zIndex: 1000,
  border: '1px solid rgba(0,0,0,0.1)',
  borderRadius: '1%',
  width: '960px',
  height: '805px'
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  zIndex: 1000,
}

const BUTTON_STYLES = {
  position: 'absolute',
  top: 10,
  right: 10,
  display: 'flex',
  border: '0px solid transparent',
  borderRadius: '3%',
  width: '150px',
  minWidth: '150px',
  height: '37px',
  backgroundColor: '#065fd4',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Roboto, sans-serif',
  color: 'white',
  fontWeight: 500
}


export default function Modal({ open, children, onClose }) {
  if (!open) return null
  // document.body.style.cursor = "pointer";

  // let closeButton = document.getElementById('close-button-modal')

  const hoverEffect = () => {
    document.body.style.cursor = 'pointer';
  }

  const clearHover = (e) => {
    if (e.target.id !== 'close-button-modal') document.body.style.cursor ='default'
  }

  const setPointerDefault = () => document.body.style.cursor = 'default'

  const onClickFunction = () => {
    onClose()
    setPointerDefault()
  }

  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div onMouseOver={(e) => clearHover(e)} style={MODAL_STYLES}>
        <button onMouseOver={hoverEffect} id='close-button-modal'  style={BUTTON_STYLES} onClick={onClickFunction}>CLOSE</button>
        {children}
      </div>
    </>,
    document.getElementById('portal')
  )
}
