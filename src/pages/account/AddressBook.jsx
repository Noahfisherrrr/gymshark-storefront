import { useEffect, useState } from 'react'
import { api } from '../../api'
import { useAuth } from '../../context/AuthContext'
import BackToAccountLink from '../../components/account/BackToAccountLink'

const EMPTY_FORM = {
  label: '',
  firstName: '',
  lastName: '',
  line1: '',
  line2: '',
  city: '',
  postcode: '',
  country: '',
  phone: '',
}

export default function AddressBook() {
  const { user } = useAuth()
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    api.account.listAddresses(user.id).then((list) => {
      setAddresses(list)
      setLoading(false)
    })
  }, [user])

  function startAdd() {
    setForm({ ...EMPTY_FORM })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    try {
      const next = await api.account.addAddress(user.id, form)
      setAddresses(next)
      setForm(null)
    } finally {
      setSubmitting(false)
    }
  }

  async function handleRemove(addressId) {
    const next = await api.account.removeAddress(user.id, addressId)
    setAddresses(next)
  }

  async function handleMakeDefault(addressId) {
    const next = await api.account.updateAddress(user.id, addressId, { isDefault: true })
    setAddresses(next)
  }

  if (loading) return null

  return (
    <div>
      <BackToAccountLink />
      <h2 className="text-lg font-bold uppercase">Address Book</h2>

      {addresses.length === 0 && !form && <p className="mt-2 text-sm text-black/50">No saved addresses yet.</p>}

      {addresses.length > 0 && (
        <ul className="mt-4 space-y-4">
          {addresses.map((address) => (
            <li key={address.id} className="border border-line p-4 text-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">
                    {address.label || 'Address'}
                    {address.isDefault && <span className="ml-2 text-xs uppercase text-black/50">Default</span>}
                  </p>
                  <p className="mt-1 text-black/70">
                    {address.firstName} {address.lastName}
                  </p>
                  <p className="text-black/70">{address.line1}</p>
                  {address.line2 && <p className="text-black/70">{address.line2}</p>}
                  <p className="text-black/70">
                    {address.city}, {address.postcode}
                  </p>
                  <p className="text-black/70">{address.country}</p>
                  {address.phone && <p className="text-black/50">{address.phone}</p>}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-2 text-xs uppercase">
                  {!address.isDefault && (
                    <button type="button" onClick={() => handleMakeDefault(address.id)} className="underline">
                      Make Default
                    </button>
                  )}
                  <button type="button" onClick={() => handleRemove(address.id)} className="underline">
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {form ? (
        <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
          <input
            type="text"
            placeholder="Label (e.g. Home, Work)"
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="w-full border border-black/20 px-3 py-2 text-sm"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="First name"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
              required
              className="w-1/2 border border-black/20 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Last name"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
              required
              className="w-1/2 border border-black/20 px-3 py-2 text-sm"
            />
          </div>
          <input
            type="text"
            placeholder="Address line 1"
            value={form.line1}
            onChange={(e) => setForm({ ...form, line1: e.target.value })}
            required
            className="w-full border border-black/20 px-3 py-2 text-sm"
          />
          <input
            type="text"
            placeholder="Address line 2 (optional)"
            value={form.line2}
            onChange={(e) => setForm({ ...form, line2: e.target.value })}
            className="w-full border border-black/20 px-3 py-2 text-sm"
          />
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
              className="w-1/2 border border-black/20 px-3 py-2 text-sm"
            />
            <input
              type="text"
              placeholder="Postcode"
              value={form.postcode}
              onChange={(e) => setForm({ ...form, postcode: e.target.value })}
              required
              className="w-1/2 border border-black/20 px-3 py-2 text-sm"
            />
          </div>
          <input
            type="text"
            placeholder="Country"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            required
            className="w-full border border-black/20 px-3 py-2 text-sm"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full border border-black/20 px-3 py-2 text-sm"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-brand-black px-6 py-3 text-sm font-semibold uppercase text-brand-white disabled:opacity-40"
            >
              {submitting ? 'Saving…' : 'Save Address'}
            </button>
            <button type="button" onClick={() => setForm(null)} className="text-sm uppercase underline">
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button type="button" onClick={startAdd} className="mt-6 text-sm font-semibold uppercase underline">
          + Add Address
        </button>
      )}
    </div>
  )
}
