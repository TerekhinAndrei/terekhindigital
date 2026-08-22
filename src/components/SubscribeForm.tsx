"use client"

export default function SubscribeForm() {
  return (
    <form className="sub-form" onSubmit={(e) => e.preventDefault()}>
      <input type="email" placeholder="Your address..." />
      <button type="submit">Subscribe</button>
    </form>
  )
}
