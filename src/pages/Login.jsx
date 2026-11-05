export default function Login() {
  return (
    <div className="mx-auto max-w-md px-4 py-16 lg:px-8">
      <h1 className="text-2xl font-bold uppercase">Sign In</h1>
      <form className="mt-6 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-black/20 px-3 py-2 text-sm"
          disabled
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border border-black/20 px-3 py-2 text-sm"
          disabled
        />
        <button
          type="submit"
          disabled
          className="w-full bg-brand-black py-3 text-sm font-semibold uppercase text-brand-white disabled:opacity-40"
        >
          Sign In (wires up to Supabase Auth)
        </button>
      </form>
    </div>
  )
}
