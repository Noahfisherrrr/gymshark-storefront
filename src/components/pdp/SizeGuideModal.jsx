import { useState } from 'react'
import Modal from '../ui/Modal'
import { CloseIcon } from '../header/icons'
import { RulerIcon } from './pdpIcons'

const BRA_SIZES_CM = [
  { size: 'XXS', bust: '76 - 81', underbust: '61 - 66', cup: '28A - 30B', us: '00', uk: '4', eu: '32' },
  { size: 'XS', bust: '81 - 86', underbust: '66 - 71', cup: '30B - 32B', us: '0 - 2', uk: '6', eu: '34' },
  { size: 'S', bust: '86 - 91', underbust: '71 - 76', cup: '32C - 34B', us: '4 - 6', uk: '8 - 10', eu: '36 - 38' },
  { size: 'M', bust: '91 - 96', underbust: '76 - 81', cup: '34C - 36B', us: '8 - 10', uk: '12 - 14', eu: '40 - 42' },
  { size: 'L', bust: '96 - 103', underbust: '81 - 88', cup: '36C - 38C', us: '12 - 14', uk: '16', eu: '44' },
  { size: 'XL', bust: '103 - 110', underbust: '88 - 95', cup: '38D - 40C', us: '16', uk: '18', eu: '46' },
  { size: 'XXL', bust: '110 - 118', underbust: '95 - 103', cup: '40D - 42D', us: '18', uk: '20', eu: '48' },
]

const BRA_SIZES_INCHES = [
  { size: 'XXS', bust: '30 - 32', underbust: '24 - 26', cup: '28A - 30B', us: '00', uk: '4', eu: '32' },
  { size: 'XS', bust: '32 - 34', underbust: '26 - 28', cup: '30B - 32B', us: '0 - 2', uk: '6', eu: '34' },
  { size: 'S', bust: '34 - 36', underbust: '28 - 30', cup: '32C - 34B', us: '4 - 6', uk: '8 - 10', eu: '36 - 38' },
  { size: 'M', bust: '36 - 38', underbust: '30 - 32', cup: '34C - 36B', us: '8 - 10', uk: '12 - 14', eu: '40 - 42' },
  { size: 'L', bust: '38 - 40.5', underbust: '32 - 34.5', cup: '36C - 38C', us: '12 - 14', uk: '16', eu: '44' },
  { size: 'XL', bust: '40.5 - 43.5', underbust: '34.5 - 37.5', cup: '38D - 40C', us: '16', uk: '18', eu: '46' },
  { size: 'XXL', bust: '43.5 - 46.5', underbust: '37.5 - 40.5', cup: '40D - 42D', us: '18', uk: '20', eu: '48' },
]

export default function SizeGuideModal({ isOpen, onClose }) {
  const [unit, setUnit] = useState('cm') // 'cm' | 'in'
  const rows = unit === 'cm' ? BRA_SIZES_CM : BRA_SIZES_INCHES

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      label="Size Guide"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-xs bg-white text-ink shadow-2xl animate-fade-in">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <RulerIcon size={20} />
            <h2 className="text-lg font-extrabold uppercase tracking-tight">Size Guide</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close size guide"
            className="flex h-9 w-9 items-center justify-center rounded-full text-black/60 transition hover:bg-black/5 hover:text-black"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Unit Toggle Buttons */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/60">
              Sports Bras & Crop Tops
            </p>
            <div className="inline-flex rounded-xs border border-black/20 p-0.5">
              <button
                type="button"
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 text-xs font-bold uppercase transition ${
                  unit === 'cm'
                    ? 'bg-black text-white'
                    : 'text-black/70 hover:text-black'
                }`}
              >
                CM
              </button>
              <button
                type="button"
                onClick={() => setUnit('in')}
                className={`px-3 py-1 text-xs font-bold uppercase transition ${
                  unit === 'in'
                    ? 'bg-black text-white'
                    : 'text-black/70 hover:text-black'
                }`}
              >
                INCHES
              </button>
            </div>
          </div>

          {/* Measurements Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-black bg-surface-subtle text-[11px] font-bold uppercase tracking-wider text-black">
                  <th className="py-2.5 px-3">Size</th>
                  <th className="py-2.5 px-3">Bust ({unit})</th>
                  <th className="py-2.5 px-3">Underbust ({unit})</th>
                  <th className="py-2.5 px-3">Suggested Cup</th>
                  <th className="py-2.5 px-3">US</th>
                  <th className="py-2.5 px-3">UK</th>
                  <th className="py-2.5 px-3">EU</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {rows.map((row) => (
                  <tr key={row.size} className="hover:bg-black/[0.02]">
                    <td className="py-2.5 px-3 font-bold text-black">{row.size}</td>
                    <td className="py-2.5 px-3 text-black/80">{row.bust}</td>
                    <td className="py-2.5 px-3 text-black/80">{row.underbust}</td>
                    <td className="py-2.5 px-3 font-medium text-black/90">{row.cup}</td>
                    <td className="py-2.5 px-3 text-black/60">{row.us}</td>
                    <td className="py-2.5 px-3 text-black/60">{row.uk}</td>
                    <td className="py-2.5 px-3 text-black/60">{row.eu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* How to measure tips */}
          <div className="mt-8 rounded-xs border border-black/10 bg-surface-subtle p-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-black">How to Measure</h3>
            <ul className="mt-2 space-y-2 text-xs text-black/70">
              <li>
                <strong>1. Bust:</strong> Measure around the fullest part of your bust, keeping the tape level across your shoulder blades.
              </li>
              <li>
                <strong>2. Underbust:</strong> Measure directly under your bust where the bra band sits. Keep the tape firm but comfortable.
              </li>
              <li>
                <strong>Between sizes?</strong> If you prefer higher compression for high-impact workouts, size down. For everyday comfort or yoga/pilates, choose your standard size or size up.
              </li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-black/10 bg-surface-subtle px-6 py-3 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xs bg-black px-5 py-2 text-xs font-bold uppercase text-white hover:bg-black/80"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

