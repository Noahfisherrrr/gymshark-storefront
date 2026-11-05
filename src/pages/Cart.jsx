export default function Cart() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 lg:px-8">
      <h1 className="text-2xl font-bold uppercase">Your Cart</h1>
      <p className="mt-4 text-sm text-black/50">
        Cart is empty. Checkout flow wires up to Stripe once the client&apos;s verified
        Stripe account and currency/payment-method decisions are in place (Brief.md #9).
      </p>
    </div>
  )
}
