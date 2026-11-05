import { useEffect, useRef } from 'react'
import { SEARCH_OVERLAY } from '../../config/navigation'
import SearchClassic from './SearchClassic'
import SearchGlowUp from './SearchGlowUp'

// gymshark.com A/B tests two search overlays (50/50 per visitor). Which one
// we ship is a config choice — see SEARCH_OVERLAY in config/navigation.js.
export default function SearchModal({ open, onClose, term, onTermChange }) {
  const resetTimer = useRef(null)
  useEffect(() => () => clearTimeout(resetTimer.current), [])

  if (SEARCH_OVERLAY === 'glow-up') {
    return <SearchGlowUp open={open} onClose={onClose} term={term} onTermChange={onTermChange} />
  }

  // Classic: an explicit close (✕, back, Esc, backdrop) also clears the
  // term; picking a suggestion clears it a second after navigating.
  return (
    <SearchClassic
      open={open}
      onClose={() => {
        onClose()
        onTermChange('')
      }}
      term={term}
      onTermChange={onTermChange}
      onPickTerm={() => {
        clearTimeout(resetTimer.current)
        resetTimer.current = setTimeout(() => onTermChange(''), 1000)
      }}
    />
  )
}
