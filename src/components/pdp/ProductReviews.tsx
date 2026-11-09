import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { api } from '../../api'
import { StarIcon, ThumbsUpIcon, CheckCircleIcon } from './pdpIcons'
import { CloseIcon } from '../header/icons'
import Modal from '../ui/Modal'
import type { Product, RatingBreakdown, Review, FitFeedback } from '../../api/contract'

interface ProductReviewsProps {
  product: Product
}

interface ReviewFormData {
  rating: number
  title: string
  content: string
  author: string
  email: string
  sizePurchased: string
  usualSize: string
  activity: string
  height: string
  weight: string
}

const DEFAULT_FORM_DATA: ReviewFormData = {
  rating: 5,
  title: '',
  content: '',
  author: '',
  email: '',
  sizePurchased: 'S',
  usualSize: 'S',
  activity: 'Pilates & Yoga',
  height: "5'7\"",
  weight: '135 lbs',
}

const DEFAULT_BREAKDOWN: RatingBreakdown = { '5': 118, '4': 16, '3': 5, '2': 2, '1': 1 }

const DEFAULT_FIT_FEEDBACK: FitFeedback = {
  runsSmall: 6,
  trueToSize: 88,
  runsLarge: 6,
  softnessRating: 98,
  supportRating: 'Medium Support',
}

export default function ProductReviews({ product }: ProductReviewsProps) {
  // The contract's `Product` shape never carries a `reviews` field (reviews
  // live behind the api.reviews.* endpoints below) — this always starts empty.
  const [reviews, setReviews] = useState<Review[]>([])
  const [activeStarFilter, setActiveStarFilter] = useState<number | null>(null)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest' | 'helpful'>('recent')
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({})
  const [modalOpen, setModalOpen] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // New review form state
  const [formData, setFormData] = useState<ReviewFormData>(DEFAULT_FORM_DATA)

  const rating = product.rating || 4.8
  const reviewCount = reviews.length > 0 ? reviews.length : (product.reviewCount || 142)
  const breakdown = product.ratingBreakdown || DEFAULT_BREAKDOWN
  const fitFeedback = product.fitFeedback || DEFAULT_FIT_FEEDBACK

  // Sync reviews from backend API when available
  useEffect(() => {
    if (!product?.id) return
    let cancelled = false
    if (api?.reviews?.list) {
      // A genuinely empty result (a product with no reviews yet) is still
      // authoritative and should replace the placeholder `product.reviews`
      // seed — only a failed/cancelled fetch should leave that in place.
      api.reviews.list(product.id).then((serverReviews) => {
        if (!cancelled && Array.isArray(serverReviews)) {
          setReviews(serverReviews)
        }
      }).catch(() => {})
    }
    return () => { cancelled = true }
  }, [product?.id])

  // Handle helpful voting
  function handleVoteHelpful(reviewId: string) {
    if (helpfulVotes[reviewId]) return
    setHelpfulVotes((prev) => ({ ...prev, [reviewId]: true }))
    setReviews((prev) =>
      prev.map((r) =>
        r.id === reviewId ? { ...r, helpfulCount: (r.helpfulCount || 0) + 1 } : r
      )
    )
    if (api?.reviews?.voteHelpful) {
      api.reviews.voteHelpful(reviewId).catch(() => {})
    }
  }

  // Filter & Sort
  let displayedReviews = [...reviews]
  if (activeStarFilter !== null) {
    displayedReviews = displayedReviews.filter((r) => r.rating === activeStarFilter)
  }
  if (verifiedOnly) {
    displayedReviews = displayedReviews.filter((r) => r.verified)
  }

  if (sortBy === 'recent') {
    displayedReviews.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime())
  } else if (sortBy === 'highest') {
    displayedReviews.sort((a, b) => b.rating - a.rating)
  } else if (sortBy === 'lowest') {
    displayedReviews.sort((a, b) => a.rating - b.rating)
  } else if (sortBy === 'helpful') {
    displayedReviews.sort((a, b) => (b.helpfulCount || 0) - (a.helpfulCount || 0))
  }

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!formData.title || !formData.content || !formData.author) return
    if (!api?.reviews?.add || !product?.id) return

    // Wait for the server's own row (real id, server-assigned date) instead
    // of fabricating one client-side — a synthetic id here would make the
    // very next "Helpful" click on this review 404 against the real table,
    // since voteHelpful looks the review up by id.
    try {
      const saved = await api.reviews.add(product.id, formData)
      setReviews([saved, ...reviews])
      setSubmitSuccess(true)
      setTimeout(() => {
        setSubmitSuccess(false)
        setModalOpen(false)
        setFormData(DEFAULT_FORM_DATA)
      }, 1500)
    } catch {
      // Leave the modal open with the user's input intact so they can retry.
    }
  }

  return (
    <section id="reviews" className="scroll-mt-10 py-12 border-t border-black/10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-ink sm:text-3xl">
              Reviews & Ratings
            </h2>
            <p className="mt-1 text-xs text-black/60 font-medium">
              Real feedback from community members
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="h-11 rounded-xs bg-black px-6 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black/85"
          >
            Write a Review
          </button>
        </div>

        {/* ---------------- RATING SUMMARY & FIT GRAPHS ---------------- */}
        <div className="grid gap-8 rounded-xs border border-black/10 bg-surface-subtle p-6 lg:grid-cols-3">
          {/* Column 1: Overall Score */}
          <div className="flex flex-col justify-center border-b border-black/10 pb-6 lg:border-b-0 lg:border-r lg:pr-8">
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black tracking-tight text-black">
                {rating.toFixed(1)}
              </span>
              <span className="text-sm font-semibold text-black/50">/ 5.0</span>
            </div>
            <div className="mt-2 flex items-center gap-1 text-black">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  size={18}
                  filled={star <= Math.round(rating)}
                  className="fill-black"
                />
              ))}
            </div>
            <p className="mt-2 text-xs font-medium text-black/70">
              Based on {reviewCount} customer reviews
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-800">
              <CheckCircleIcon size={16} />
              <span>96% of customers recommend this product</span>
            </div>
          </div>

          {/* Column 2: Rating Breakdown Bars */}
          <div className="flex flex-col justify-center space-y-2 border-b border-black/10 pb-6 lg:border-b-0 lg:border-r lg:px-6">
            <span className="text-xs font-bold uppercase tracking-wider text-black mb-1">
              Rating Distribution
            </span>
            {[5, 4, 3, 2, 1].map((star) => {
              const count = breakdown[String(star) as keyof RatingBreakdown] || 0
              const percent = Math.round((count / (reviewCount || 1)) * 100)
              const isSelected = activeStarFilter === star

              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => setActiveStarFilter(isSelected ? null : star)}
                  className={`group flex items-center gap-2 text-left text-xs transition ${
                    isSelected ? 'font-bold text-black' : 'text-black/70 hover:text-black'
                  }`}
                >
                  <span className="w-12 shrink-0">{star} Stars</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/10">
                    <div
                      className={`h-full transition-all duration-300 ${
                        isSelected ? 'bg-black' : 'bg-black/70 group-hover:bg-black'
                      }`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 shrink-0 text-right text-[11px] text-black/60">
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Column 3: Fit & Feel feedback */}
          <div className="flex flex-col justify-center space-y-4 lg:pl-6">
            <span className="text-xs font-bold uppercase tracking-wider text-black">
              Fit & Feel Feedback
            </span>

            {/* Sizing slider */}
            <div>
              <div className="flex justify-between text-xs text-black/80 font-medium">
                <span>Runs Small ({fitFeedback.runsSmall}%)</span>
                <span className="font-bold text-black">True to Size ({fitFeedback.trueToSize}%)</span>
                <span>Runs Large ({fitFeedback.runsLarge}%)</span>
              </div>
              <div className="mt-1 relative h-2 rounded-full bg-black/10">
                <div
                  className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full border-2 border-white bg-black shadow-xs"
                  style={{ left: `${fitFeedback.trueToSize}%` }}
                />
              </div>
            </div>

            {/* Softness stat */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-black/70">Softness rating:</span>
              <span className="font-bold text-black">{fitFeedback.softnessRating}% Butter-Soft</span>
            </div>

            {/* Support level */}
            <div className="flex items-center justify-between text-xs">
              <span className="text-black/70">Support level:</span>
              <span className="font-bold text-black">{fitFeedback.supportRating}</span>
            </div>
          </div>
        </div>

        {/* ---------------- FILTER & SORT CONTROLS ---------------- */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 pb-4">
          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase text-black/60 mr-1">Filter:</span>
            <button
              type="button"
              onClick={() => {
                setActiveStarFilter(null)
                setVerifiedOnly(false)
              }}
              className={`rounded-xs px-3 py-1.5 text-xs font-bold uppercase transition ${
                activeStarFilter === null && !verifiedOnly
                  ? 'bg-black text-white'
                  : 'border border-black/20 bg-white text-black/80 hover:border-black'
              }`}
            >
              All ({reviews.length})
            </button>

            {[5, 4, 3].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setActiveStarFilter(activeStarFilter === star ? null : star)}
                className={`rounded-xs px-3 py-1.5 text-xs font-bold uppercase transition ${
                  activeStarFilter === star
                    ? 'bg-black text-white'
                    : 'border border-black/20 bg-white text-black/80 hover:border-black'
                }`}
              >
                {star} ★
              </button>
            ))}

            <button
              type="button"
              onClick={() => setVerifiedOnly(!verifiedOnly)}
              className={`rounded-xs px-3 py-1.5 text-xs font-bold uppercase transition ${
                verifiedOnly
                  ? 'bg-black text-white'
                  : 'border border-black/20 bg-white text-black/80 hover:border-black'
              }`}
            >
              Verified Buyers
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <label htmlFor="sort-reviews" className="font-bold uppercase text-black/60">
              Sort:
            </label>
            <select
              id="sort-reviews"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'recent' | 'highest' | 'lowest' | 'helpful')}
              className="rounded-xs border border-black/20 bg-white px-3 py-1.5 font-semibold text-black focus:border-black focus:outline-hidden"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* ---------------- REVIEWS LIST ---------------- */}
        <div className="mt-6 divide-y divide-black/10">
          {displayedReviews.length === 0 ? (
            <p className="py-12 text-center text-xs text-black/60 font-medium">
              No reviews match the selected filter criteria.
            </p>
          ) : (
            displayedReviews.map((rev) => (
              <article key={rev.id} className="py-6 first:pt-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    {/* Stars & Title */}
                    <div className="flex items-center gap-2">
                      <div className="flex text-black">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <StarIcon
                            key={s}
                            size={14}
                            filled={s <= rev.rating}
                            className="fill-black"
                          />
                        ))}
                      </div>
                      <h3 className="font-extrabold uppercase text-xs tracking-tight text-ink">
                        {rev.title}
                      </h3>
                    </div>

                    {/* Author & Verification */}
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-black/60">
                      <span className="font-bold text-black">{rev.author}</span>
                      {rev.verified && (
                        <span className="flex items-center gap-1 font-semibold text-emerald-800">
                          <CheckCircleIcon size={12} />
                          <span>Verified Buyer</span>
                        </span>
                      )}
                      <span>•</span>
                      <span>{rev.date}</span>
                    </div>

                    {/* Reviewer Body Specs */}
                    {(rev.height || rev.usualSize || rev.activity) && (
                      <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 rounded-xs bg-surface-subtle px-2.5 py-1.5 text-[11px] text-black/70">
                        {rev.sizePurchased && (
                          <span>
                            Size purchased: <strong>{rev.sizePurchased}</strong>
                          </span>
                        )}
                        {rev.usualSize && (
                          <span>
                            Usual size: <strong>{rev.usualSize}</strong>
                          </span>
                        )}
                        {rev.height && <span>Height: {rev.height}</span>}
                        {rev.activity && <span>Workout: {rev.activity}</span>}
                      </div>
                    )}

                    {/* Content */}
                    <p className="mt-3 text-xs leading-relaxed text-black/85">
                      {rev.content}
                    </p>
                  </div>

                  {/* Helpful vote button */}
                  <div className="shrink-0 pt-2 sm:pt-0">
                    <button
                      type="button"
                      disabled={helpfulVotes[rev.id]}
                      onClick={() => handleVoteHelpful(rev.id)}
                      className={`flex items-center gap-1.5 rounded-xs border px-3 py-1.5 text-xs font-semibold transition ${
                        helpfulVotes[rev.id]
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-800 cursor-default'
                          : 'border-black/20 hover:border-black text-black/80'
                      }`}
                    >
                      <ThumbsUpIcon size={13} filled={helpfulVotes[rev.id]} />
                      <span>
                        Helpful ({rev.helpfulCount || 0})
                      </span>
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </div>

      {/* ---------------- WRITE A REVIEW MODAL ---------------- */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        label="Write a Review"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      >
        <div className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-xs bg-white text-ink shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
            <h2 className="text-base font-extrabold uppercase tracking-tight">Write a Review</h2>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Close review modal"
              className="flex h-8 w-8 items-center justify-center rounded-full text-black/60 transition hover:bg-black/5 hover:text-black"
            >
              <CloseIcon size={18} />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-4 text-xs">
            {submitSuccess && (
              <div className="rounded-xs bg-emerald-100 p-3 text-emerald-800 font-bold text-center">
                Review submitted successfully! Thank you for your feedback.
              </div>
            )}

            {/* Star selector */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-black mb-1">
                Overall Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: star })}
                    aria-label={`${star} star`}
                    className="p-1 text-black transition hover:scale-110"
                  >
                    <StarIcon
                      size={24}
                      filled={star <= formData.rating}
                      className="fill-black"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-black mb-1">
                Review Headline *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Best fit and ultra soft!"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full rounded-xs border border-black/20 p-2.5 focus:border-black focus:outline-hidden"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block font-bold uppercase tracking-wider text-black mb-1">
                Review Body *
              </label>
              <textarea
                required
                rows={4}
                placeholder="Share details about the fit, comfort, support, and how it holds up during workouts..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full rounded-xs border border-black/20 p-2.5 focus:border-black focus:outline-hidden"
              />
            </div>

            {/* Author info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah M."
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full rounded-xs border border-black/20 p-2.5 focus:border-black focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xs border border-black/20 p-2.5 focus:border-black focus:outline-hidden"
                />
              </div>
            </div>

            {/* Fit stats */}
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1">
                  Size Bought
                </label>
                <select
                  value={formData.sizePurchased}
                  onChange={(e) => setFormData({ ...formData, sizePurchased: e.target.value })}
                  className="w-full rounded-xs border border-black/20 p-2.5 focus:border-black focus:outline-hidden"
                >
                  {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1">
                  Usual Size
                </label>
                <select
                  value={formData.usualSize}
                  onChange={(e) => setFormData({ ...formData, usualSize: e.target.value })}
                  className="w-full rounded-xs border border-black/20 p-2.5 focus:border-black focus:outline-hidden"
                >
                  {['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-bold uppercase tracking-wider text-black mb-1">
                  Workout Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. Pilates"
                  value={formData.activity}
                  onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
                  className="w-full rounded-xs border border-black/20 p-2.5 focus:border-black focus:outline-hidden"
                />
              </div>
            </div>

            <div className="pt-2 text-right">
              <button
                type="submit"
                className="rounded-xs bg-black px-6 py-3 font-bold uppercase tracking-wider text-white hover:bg-black/85"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </section>
  )
}
