import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PlusIcon, MinusIcon } from '../header/icons'
import { CheckCircleIcon } from './pdpIcons'
import type { DeliveryInfo, Product } from '../../api/contract'

interface ProductAccordionsProps {
  product: Product
}

interface OpenSections {
  description: boolean
  features: boolean
  materials: boolean
  delivery: boolean
}

const DEFAULT_DELIVERY: DeliveryInfo = {
  freeThreshold: 75,
  standardDays: '3-5 business days',
  expressPrice: 15,
  expressDays: '1-2 business days',
  returnDays: 30,
}

export default function ProductAccordions({ product }: ProductAccordionsProps) {
  const [openSections, setOpenSections] = useState<OpenSections>({
    description: true,
    features: true,
    materials: false,
    delivery: false,
  })

  function toggleSection(key: keyof OpenSections) {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const delivery = product.deliveryInfo || DEFAULT_DELIVERY

  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {/* 1. DESCRIPTION ACCORDION */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('description')}
          aria-expanded={openSections.description}
          aria-controls="accordion-desc"
          className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-black"
        >
          <span>Description</span>
          <span className="text-black/70">
            {openSections.description ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
          </span>
        </button>

        {openSections.description && (
          <div id="accordion-desc" className="mt-3 text-xs leading-relaxed text-black/75 animate-fade-in space-y-3">
            <p>{product.description}</p>
            {product.fitNote && (
              <p className="rounded-xs bg-surface-subtle p-3 text-[11px] font-medium text-black">
                {product.fitNote}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 2. FEATURES & FIT ACCORDION */}
      {product.highlights && product.highlights.length > 0 && (
        <div className="py-4">
          <button
            type="button"
            onClick={() => toggleSection('features')}
            aria-expanded={openSections.features}
            aria-controls="accordion-features"
            className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-black"
          >
            <span>Features & Fit</span>
            <span className="text-black/70">
              {openSections.features ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
            </span>
          </button>

          {openSections.features && (
            <div id="accordion-features" className="mt-3 text-xs text-black/75 animate-fade-in">
              <ul className="space-y-2">
                {product.highlights.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircleIcon size={14} className="mt-0.5 shrink-0 text-black" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* 3. MATERIALS & CARE ACCORDION */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('materials')}
          aria-expanded={openSections.materials}
          aria-controls="accordion-materials"
          className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-black"
        >
          <span>Materials & Care</span>
          <span className="text-black/70">
            {openSections.materials ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
          </span>
        </button>

        {openSections.materials && (
          <div id="accordion-materials" className="mt-3 text-xs text-black/75 animate-fade-in space-y-3">
            {product.materials && (
              <div>
                <strong className="font-bold uppercase text-black">Fabric:</strong>
                <p className="mt-0.5">{product.materials}</p>
              </div>
            )}

            {product.care && (
              <div>
                <strong className="font-bold uppercase text-black">Care Instructions:</strong>
                <ul className="mt-1 list-disc pl-4 space-y-1">
                  {product.care.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 4. DELIVERY & RETURNS ACCORDION */}
      <div className="py-4">
        <button
          type="button"
          onClick={() => toggleSection('delivery')}
          aria-expanded={openSections.delivery}
          aria-controls="accordion-delivery"
          className="flex w-full items-center justify-between text-left text-xs font-bold uppercase tracking-wider text-black"
        >
          <span>Delivery & Free Returns</span>
          <span className="text-black/70">
            {openSections.delivery ? <MinusIcon size={16} /> : <PlusIcon size={16} />}
          </span>
        </button>

        {openSections.delivery && (
          <div id="accordion-delivery" className="mt-3 text-xs text-black/75 animate-fade-in space-y-3">
            <div>
              <p className="font-bold uppercase text-black">Standard Delivery</p>
              <p>Free for orders over ${delivery.freeThreshold}. Otherwise $4.00. Takes {delivery.standardDays}.</p>
            </div>

            <div>
              <p className="font-bold uppercase text-black">Express Delivery</p>
              <p>${delivery.expressPrice}.00. Takes {delivery.expressDays} when ordered before 3pm EST.</p>
            </div>

            <div>
              <p className="font-bold uppercase text-black">Returns Policy</p>
              <p>
                We offer free, easy returns within {delivery.returnDays} days of receiving your order.
                Items must be unworn with original tags attached.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 text-[11px] font-bold uppercase text-black">
              <Link to="/help/delivery-information" className="underline underline-offset-2 hover:text-black/70">
                Delivery Details →
              </Link>
              <Link to="/help/returns-policy" className="underline underline-offset-2 hover:text-black/70">
                Returns Policy →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
