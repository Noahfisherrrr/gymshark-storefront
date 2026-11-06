import { useEffect, useState } from 'react'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import { formatPrice } from '../../lib/format'
import BackToAccountLink from '../../components/account/BackToAccountLink'

export default function ReferFriend() {
  const { user } = useAuth()
  const [referral, setReferral] = useState(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    api.account.getReferralInfo(user.id).then(setReferral)
  }, [user])

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referral.link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable — the link is still shown to copy manually.
    }
  }

  if (!referral) return null

  return (
    <div>
      <BackToAccountLink />
      <h2 className="text-lg font-bold uppercase">Refer a Friend</h2>
      <p className="mt-2 max-w-md text-sm text-black/60">
        Share your link — when a friend makes their first order, you both get {formatPrice(referral.rewardAmount)}{' '}
        in store credit.
      </p>

      <div className="mt-4 flex max-w-md items-center gap-2">
        <input
          type="text"
          readOnly
          value={referral.link}
          className="w-full border border-black/20 px-3 py-2 text-sm"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="shrink-0 bg-brand-black px-4 py-2 text-sm font-semibold uppercase text-brand-white"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <div className="mt-8 flex max-w-md gap-8">
        <div>
          <p className="text-2xl font-bold">{referral.referralsCount}</p>
          <p className="text-xs uppercase text-black/50">Friends Referred</p>
        </div>
        <div>
          <p className="text-2xl font-bold">{formatPrice(referral.creditsEarned)}</p>
          <p className="text-xs uppercase text-black/50">Credit Earned</p>
        </div>
      </div>
    </div>
  )
}
