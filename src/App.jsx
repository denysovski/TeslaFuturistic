export default function App() {
  const pageSrc = `${import.meta.env.BASE_URL}generated-page.html`

  return (
    <iframe
      src={pageSrc}
      title="Tesla Model S Plaid showcase"
      style={{ border: '0', width: '100%', height: '100vh', display: 'block' }}
    />
  )
}
