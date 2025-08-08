import logo from './assets/logo.svg'

export default function Header() {
  return (
    <header className="border-b border-border bg-bg-secondary">
      <a
        href="/"
        className="container mx-auto px-4 py-4 flex items-center font-bold text-xl text-accent"
      >
        <img src={logo} className="h-8 w-8 mr-2" />
        <div className="flex items-baseline">
          <span className="text-2xl ml-2">N</span>
          <span>OVO</span>
          <span className="text-2xl ml-2">C</span>
          <span>O</span>
          <span className="text-2xl">P</span>
          <span>ILOT</span>
        </div>
      </a>
    </header>
  )
}
