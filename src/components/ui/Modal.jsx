import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { useBodyScrollLock } from '../../lib/scrollLock'
import './overlay.css'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

// Small stand-in for react-modal, which gymshark.com builds its search
// overlay and mini bag on. Same contract: stays mounted for
// `closeTimeoutMs` after closing so the "--closing" CSS animation can play,
// closes on Esc and overlay click, locks page scroll, keeps Tab inside, and
// hands focus back to whatever opened it.
export default function Modal({
  isOpen,
  onRequestClose,
  closeTimeoutMs = 0,
  label,
  overlayClassName = 'gs-overlay--fade',
  className = '',
  closingClassName = '',
  initialFocusRef,
  children,
}) {
  const [mounted, setMounted] = useState(isOpen)
  if (isOpen && !mounted) setMounted(true)
  const closing = mounted && !isOpen
  const dialogRef = useRef(null)

  useEffect(() => {
    if (!closing) return
    const id = setTimeout(() => setMounted(false), closeTimeoutMs)
    return () => clearTimeout(id)
  }, [closing, closeTimeoutMs])

  useBodyScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return
    const opener = document.activeElement
    ;(initialFocusRef?.current ?? dialogRef.current)?.focus({ preventScroll: true })
    return () => opener?.focus?.({ preventScroll: true })
  }, [isOpen, initialFocusRef])

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      onRequestClose()
      return
    }
    if (e.key !== 'Tab') return
    const nodes = [...dialogRef.current.querySelectorAll(FOCUSABLE)].filter(
      (node) => node.offsetParent !== null,
    )
    if (nodes.length === 0) return
    const first = nodes[0]
    const last = nodes[nodes.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }

  if (!mounted) return null

  return createPortal(
    <div
      className={`gs-overlay ${overlayClassName} ${closing ? 'gs-overlay--closing' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onRequestClose()
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        className={`gs-dialog ${className} ${closing ? closingClassName : ''}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  )
}
