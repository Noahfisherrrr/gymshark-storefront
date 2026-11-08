import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../../api'
import ProductCard from '../product/ProductCard'
import RichText from './RichText'

function Paragraph({ text }) {
  return (
    <p className="mt-5 text-[18px] leading-[1.6] text-muted first:mt-0">
      <RichText text={text} />
    </p>
  )
}

function Heading({ text }) {
  return <h2 className="mt-10 font-display text-xl font-medium uppercase text-ink">{text}</h2>
}

function ListBlock({ items, ordered }) {
  const Tag = ordered ? 'ol' : 'ul'
  return (
    <Tag className={`mt-5 space-y-2 pl-5 text-[16px] leading-[1.6] text-muted ${ordered ? 'list-decimal' : 'list-disc'}`}>
      {items.map((item) => (
        <li key={item}>
          <RichText text={item} />
        </li>
      ))}
    </Tag>
  )
}

function AccordionBlock({ items }) {
  return (
    <div className="mt-6 divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.title} className="group py-4">
          <summary className="flex items-center justify-between gap-4 text-[16px] font-semibold text-ink">
            {item.title}
            <span className="text-xl leading-none text-muted transition-transform duration-200 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 pr-8 text-sm leading-[1.6] text-muted">
            <RichText text={item.text} />
          </p>
        </details>
      ))}
    </div>
  )
}

function TakeawayBlock({ text }) {
  return (
    <blockquote className="mt-8 border-l-2 border-ink pl-5 text-[15px] leading-[1.6] text-muted">
      <strong className="text-ink">Key Takeaway: </strong>
      <RichText text={text} />
    </blockquote>
  )
}

function TipBlock({ label, text }) {
  return (
    <p className="mt-6 text-[18px] italic leading-[1.6] text-muted">
      <strong className="not-italic">{label} </strong>
      <RichText text={text} />
    </p>
  )
}

function ButtonsBlock({ links }) {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className="inline-flex items-center bg-ink px-6 py-3.5 text-sm font-semibold text-white transition-opacity duration-200 hover:opacity-85"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

function ProductsBlock({ title, ids }) {
  const [products, setProducts] = useState([])

  useEffect(() => {
    let active = true
    Promise.all(ids.map((id) => api.products.getById(id))).then((results) => {
      if (active) setProducts(results.filter(Boolean))
    })
    return () => {
      active = false
    }
  }, [ids])

  if (products.length === 0) return null

  return (
    <section className="mt-10">
      {title && <h3 className="font-display text-lg font-medium uppercase text-ink">{title}</h3>}
      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {products.map((product) => (
          <li key={product.id}>
            <ProductCard product={product} infoClassName="pt-2" />
          </li>
        ))}
      </ul>
    </section>
  )
}

export default function ArticleBody({ blocks }) {
  return (
    <div>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'p':
            return <Paragraph key={i} text={block.text} />
          case 'h2':
            return <Heading key={i} text={block.text} />
          case 'list':
            return <ListBlock key={i} items={block.items} ordered={block.ordered} />
          case 'accordion':
            return <AccordionBlock key={i} items={block.items} />
          case 'takeaway':
            return <TakeawayBlock key={i} text={block.text} />
          case 'tip':
            return <TipBlock key={i} label={block.label} text={block.text} />
          case 'buttons':
            return <ButtonsBlock key={i} links={block.links} />
          case 'products':
            return <ProductsBlock key={i} title={block.title} ids={block.ids} />
          default:
            return null
        }
      })}
    </div>
  )
}
