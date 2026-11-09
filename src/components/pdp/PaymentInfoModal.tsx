import Modal from '../ui/Modal'
import { CloseIcon } from '../header/icons'
import { formatPrice } from '../../lib/format'

interface PaymentInfoModalProps {
  isOpen: boolean
  onClose: () => void
  price?: number
}

export default function PaymentInfoModal({ isOpen, onClose, price = 0 }: PaymentInfoModalProps) {
  const installment = (price / 4).toFixed(2)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      label="Payment options"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-xs bg-white text-ink shadow-2xl animate-fade-in">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
          <h2 className="text-base font-extrabold uppercase tracking-tight">Pay In 4 With Klarna</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close payment information"
            className="flex h-8 w-8 items-center justify-center rounded-full text-black/60 transition hover:bg-black/5 hover:text-black"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <div className="p-6 text-xs text-black/80 space-y-4">
          <p className="text-sm font-semibold text-black">
            4 interest-free payments of {formatPrice(Number(installment))}
          </p>

          <div className="space-y-3 rounded-xs border border-black/10 bg-surface-subtle p-4">
            <div className="flex justify-between font-medium">
              <span>1st payment</span>
              <span>Due today</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>2nd payment</span>
              <span>2 weeks later</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>3rd payment</span>
              <span>4 weeks later</span>
            </div>
            <div className="flex justify-between font-medium">
              <span>4th payment</span>
              <span>6 weeks later</span>
            </div>
          </div>

          <ul className="list-disc pl-4 space-y-1 text-black/70">
            <li>No interest. No added fees when you pay on time.</li>
            <li>Instant approval decision during checkout.</li>
            <li>Subject to financial circumstances. 18+ only.</li>
          </ul>
        </div>

        <div className="border-t border-black/10 bg-surface-subtle px-6 py-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xs bg-black px-4 py-2 text-xs font-bold uppercase text-white hover:bg-black/80"
          >
            Got It
          </button>
        </div>
      </div>
    </Modal>
  )
}
