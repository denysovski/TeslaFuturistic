import { useEffect, useRef, useState } from 'react'

const navGroups = {
  Models: [
    { name: 'Model S', tag: 'Luxury Sedan', image: 'https://images.unsplash.com/photo-1629892481781-3b6a2f0b9b0f?auto=format&fit=crop&w=1200&q=80', href: '#models' },
    { name: 'Model 3', tag: 'Sport Sedan', image: 'https://images.unsplash.com/photo-1559416523-140ddc3d0d1f?auto=format&fit=crop&w=1200&q=80', href: '#models' },
    { name: 'Model X', tag: 'Luxury SUV', image: 'https://images.unsplash.com/photo-1606152421802-db97b9d1b0c4?auto=format&fit=crop&w=1200&q=80', href: '#models' },
    { name: 'Model Y', tag: 'Midsize SUV', image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1200&q=80', href: '#models' },
  ],
  Energy: [
    { name: 'Solar Panels', tag: 'Home Energy', image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80', href: '#energy' },
    { name: 'Powerwall', tag: 'Storage', image: 'https://images.unsplash.com/photo-1497440001374-f26997328c1b?auto=format&fit=crop&w=1200&q=80', href: '#energy' },
    { name: 'Megapack', tag: 'Grid Scale', image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80', href: '#energy' },
  ],
  Charging: [
    { name: 'Supercharging', tag: 'Fast charging network', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80', href: '#charging' },
    { name: 'Home Charging', tag: 'Daily convenience', image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1200&q=80', href: '#charging' },
    { name: 'Trip Planner', tag: 'Route intelligence', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1200&q=80', href: '#charging' },
  ],
  Discover: [
    { name: 'History', tag: 'Tesla timeline', image: 'https://images.unsplash.com/photo-1566288623395-d6f24f40fc38?auto=format&fit=crop&w=1200&q=80', href: '#history' },
    { name: 'News', tag: 'Latest updates', image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?auto=format&fit=crop&w=1200&q=80', href: '#news' },
    { name: 'FSD', tag: 'Software progress', image: 'https://images.unsplash.com/photo-1593941707882-a5bac6861d75?auto=format&fit=crop&w=1200&q=80', href: '#tech' },
  ],
}

const heroStats = [
  { value: '410 mi', label: 'Max Range' },
  { value: '1.98 s', label: '0–60 mph' },
  { value: '1,020 hp', label: 'Dual Motor' },
  { value: '200k+', label: 'Owners' },
]

const featureCards = [
  {
    title: 'Software-First Design',
    body: 'Every component and system is optimized for over-the-air updates. Continuous improvement means your car gets better with time, not worse.',
    cta: 'Learn About Updates',
  },
  {
    title: 'Integrated Charging Network',
    body: 'One platform connects home charging, Superchargers, trip planning, and energy management. Seamless experience across all touchpoints.',
    cta: 'Explore Charging',
  },
  {
    title: 'Performance Reimagined',
    body: 'Instant electric torque, low center of gravity, and responsive handling deliver a driving experience no gas car can match.',
    cta: 'Experience It',
  },
  {
    title: 'Sustainable Energy',
    body: 'From solar generation to home storage to vehicle charging, Tesla systems work together for energy independence and environmental impact.',
    cta: 'Go Green',
  },
]

const historyItems = [
  {
    year: '2003',
    title: 'Mission Begins',
    body: 'Founded with a mission to accelerate sustainable energy. First focus: proving electric cars could be desirable and high-performance.',
  },
  {
    year: '2012',
    title: 'Model S Arrives',
    body: 'A fully electric luxury sedan with 265 miles of range shattered every preconception about EV capability and became a benchmark for the industry.',
  },
  {
    year: '2020',
    title: 'Software Takes Center Stage',
    body: 'Over-the-air updates, advanced driver assistance, and full self-driving capability make clear: the future of cars is software-driven.',
  },
  {
    year: '2024',
    title: 'Energy Unified',
    body: 'Vehicles, Superchargers, home storage, and solar panels combine into one intelligent energy platform reshaping how people power their lives.',
  },
]

const newsItems = [
  {
    title: 'Full Self-Driving Expands City Streets Capability',
    body: 'Version 12 now navigates complex urban environments with human-like decision-making and vehicle coordination.',
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Supercharger Network Hits 50,000 Stalls Globally',
    body: 'Fastest charging infrastructure on Earth continues expansion into new markets and remote regions every quarter.',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=1400&q=80',
  },
  {
    title: 'Energy Independence Story: How Customers Save Money',
    body: 'Combined vehicle and solar ownership reduces fuel and energy costs by up to 80% over vehicle lifetime.',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=1400&q=80',
  },
]

function TeslaMark() {
  return (
    <svg viewBox="0 0 342 35" className="h-6 w-auto text-(--ink)" fill="currentColor" aria-hidden="true">
      <path d="M0 .1a9.7 9.7 0 0 0 7 7h11l.5.1v27.6h6.8V7.3L26 7h11a9.8 9.8 0 0 0 7-7H0zm238.6 0h-6.8v34.8h6.8v-16h31.2v16h6.8V.1h-38zM54.4.2a16.5 16.5 0 0 0 16.6 16.4h30.5v-6.8H70.7a9.7 9.7 0 1 1 0-19.4H102V.2H54.4zm4.2 34.8h6.8V21h36.3v14H102v-21H58.6v21zM153.4.2v6.8h39.2v28h6.8v-28h39.2V.2h-85.2zM277.3.2a16.5 16.5 0 0 0 16.6 16.4h30.5v-6.8h-30.8a9.7 9.7 0 1 1 0-19.4h31.3V.2h-47.6zM281.5 35h6.8V21h36.3v14h.3v-21h-43.4v21z" />
    </svg>
  )
}

function App() {
  const [activeMenu, setActiveMenu] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeVehicle, setActiveVehicle] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVehicle((prev) => (prev + 1) % 3)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 to-zinc-100">
      {/* HEADER & NAV */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          {/* Logo - Plain TESLA Text */}
          <div className="text-2xl font-bold font-['Sora'] text-zinc-900 tracking-tight">TESLA</div>

          {/* Desktop Nav Menu */}
          <div className="hidden md:flex items-center gap-8">
            {Object.keys(navGroups).map((category) => (
              <div
                key={category}
                className="relative"
                onMouseEnter={() => setActiveMenu(category)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <button className="flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-900 transition-colors py-2">
                  {category}
                  <span className={`text-xs transition-transform duration-200 ${activeMenu === category ? 'rotate-180' : ''}`}>
                    ^
                  </span>
                </button>

                {/* Dropdown Panel */}
                <div
                  className={`absolute left-0 top-full pt-3 overflow-hidden transition-all duration-200 ${
                    activeMenu === category
                      ? 'max-h-96 opacity-100 visible'
                      : 'max-h-0 opacity-0 invisible'
                  }`}
                >
                  <div className="glass-panel bg-white rounded-2xl p-6 w-96 shadow-lg border border-zinc-100">
                    <div className="space-y-4">
                      {navGroups[category].map((item, i) => (
                        <a
                          key={i}
                          href={item.href}
                          className="group block animate-fade-up"
                          style={{ animationDelay: `${i * 50}ms` }}
                        >
                          <div className="rounded-lg overflow-hidden aspect-video mb-2">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                          <h3 className="font-semibold text-zinc-900">{item.name}</h3>
                          <p className="text-xs text-zinc-500">{item.tag}</p>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Nav */}
          <div className="flex items-center gap-4">
            <a href="#account" className="hidden sm:inline text-sm font-medium text-zinc-600 hover:text-zinc-900">
              Account
            </a>
            <button className="hidden sm:inline px-6 py-2 rounded-lg bg-zinc-900 text-white text-sm font-semibold hover:bg-zinc-800 transition-colors">
              Order
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-zinc-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-200 bg-white">
            <div className="px-4 py-6 max-h-96 overflow-y-auto">
              {Object.entries(navGroups).map(([category, items]) => (
                <div key={category} className="mb-6">
                  <h3 className="font-semibold text-zinc-900 mb-3">{category}</h3>
                  <div className="space-y-3 ml-4">
                    {items.map((item, i) => (
                      <a key={i} href={item.href} className="block text-sm text-zinc-600 hover:text-zinc-900">
                        {item.name}
                        <span className="text-xs text-zinc-400 ml-1">({item.tag})</span>
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Video Background (muted loop) */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster="https://images.unsplash.com/photo-1627454813175-c5b9284a6e5f?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center py-24">
          <div className="animate-fade-up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold font-['Sora'] text-white leading-tight mb-6">
              The Future of Energy
            </h1>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: '150ms' }}>
            <p className="text-xl sm:text-2xl text-zinc-200 mb-12 leading-relaxed">
              Vehicles, charging, storage, and solar—all working together. Accelerating the world's transition to sustainable energy.
            </p>
          </div>

          {/* Hero Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
            {heroStats.map((stat, i) => (
              <div
                key={i}
                className="animate-fade-up glass-panel rounded-xl p-4 backdrop-blur-lg"
                style={{ animationDelay: `${300 + i * 100}ms` }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-zinc-300 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="animate-fade-up flex flex-col sm:flex-row gap-4 justify-center" style={{ animationDelay: '600ms' }}>
            <button className="px-8 py-4 bg-white text-zinc-900 font-semibold rounded-lg hover:bg-zinc-100 transition-colors">
              Explore Models
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl sm:text-5xl font-bold font-['Sora'] text-zinc-900 mb-4 animate-slide-in">
            Why Choose Tesla
          </h2>
          <p className="text-xl text-zinc-600 mb-16 max-w-2xl animate-slide-in" style={{ animationDelay: '100ms' }}>
            We don't just make cars. We architect entire ecosystems where vehicles, energy, and software work as one cohesive system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featureCards.map((card, i) => (
              <div key={i} className="glass-panel rounded-2xl p-8 backdrop-blur-lg hover:shadow-xl transition-shadow duration-300 animate-slide-in" style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                <h3 className="text-2xl font-bold font-['Sora'] text-zinc-900 mb-4">
                  {card.title}
                </h3>
                <p className="text-lg text-zinc-600 leading-relaxed mb-6">
                  {card.body}
                </p>
                <a href="#" className="text-sm font-semibold text-zinc-900 hover:text-blue-600 link-hover">
                  {card.cta} →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VEHICLE SHOWCASE */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl sm:text-5xl font-bold font-['Sora'] text-zinc-900 mb-4 animate-slide-in">
            Complete Lineup
          </h2>
          <p className="text-xl text-zinc-600 mb-12 animate-slide-in" style={{ animationDelay: '100ms' }}>
            From the entry-level Model 3 to the performance-focused Plaid, each vehicle combines range, speed, and sophistication.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl animate-slide-in" style={{ animationDelay: '200ms' }}>
              <img
                src={navGroups.Models[activeVehicle]?.image}
                alt={navGroups.Models[activeVehicle]?.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div>
                  <h3 className="text-3xl font-bold text-white">{navGroups.Models[activeVehicle]?.name}</h3>
                  <p className="text-zinc-200">Starting at $43,990</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {navGroups.Models.map((vehicle, i) => (
                <button
                  key={i}
                  onClick={() => setActiveVehicle(i)}
                  className={`w-full p-6 rounded-xl transition-all text-left animate-slide-in ${
                    activeVehicle === i
                      ? 'bg-zinc-900 text-white shadow-lg'
                      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }`}
                  style={{ animationDelay: `${(i + 3) * 100}ms` }}
                >
                  <h4 className="font-bold text-lg">{vehicle.name}</h4>
                  <p className="text-sm opacity-75 mt-1">{vehicle.tag}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HISTORY TIMELINE */}
      <section id="history" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-4xl sm:text-5xl font-bold font-['Sora'] text-zinc-900 mb-4 animate-slide-in">
            Our Journey
          </h2>
          <p className="text-xl text-zinc-600 mb-16 animate-slide-in" style={{ animationDelay: '100ms' }}>
            Two decades of relentless innovation focused on one mission: accelerating sustainable energy adoption globally.
          </p>

          <div className="space-y-8">
            {historyItems.map((item, i) => (
              <div key={i} className="flex gap-8 relative animate-slide-in" style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-zinc-900 text-white font-bold">
                    {item.year.slice(-2)}
                  </div>
                </div>
                <div className="flex-grow pt-1">
                  <h3 className="text-xl font-bold font-['Sora'] text-zinc-900">{item.title}</h3>
                  <p className="text-zinc-600 mt-2 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWS SECTION */}
      <section id="news" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl sm:text-5xl font-bold font-['Sora'] text-zinc-900 mb-4 animate-slide-in">
            Latest News
          </h2>
          <p className="text-xl text-zinc-600 mb-16 animate-slide-in" style={{ animationDelay: '100ms' }}>
            Stay updated on product launches, software improvements, and company milestones.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {newsItems.map((item, i) => (
              <a key={i} href="#" className="group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow animate-slide-in" style={{ animationDelay: `${(i + 2) * 100}ms` }}>
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg text-zinc-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-600 leading-relaxed">{item.body}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-zinc-900 to-black text-white">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-5xl sm:text-6xl font-bold font-['Sora'] mb-6 animate-fade-up">
            Ready to Make the Switch?
          </h2>
          <p className="text-xl text-zinc-300 mb-12 animate-fade-up" style={{ animationDelay: '100ms' }}>
            Join over 200,000 Tesla owners already enjoying the future of transportation and energy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '200ms' }}>
            <button className="px-8 py-4 bg-white text-zinc-900 font-semibold rounded-lg hover:bg-zinc-100 transition-colors">
              Order Now
            </button>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
              Schedule Test Drive
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-zinc-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div>
              <h4 className="font-semibold text-zinc-900 mb-4">Vehicles</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li><a href="#" className="hover:text-zinc-900">Model S</a></li>
                <li><a href="#" className="hover:text-zinc-900">Model 3</a></li>
                <li><a href="#" className="hover:text-zinc-900">Model X</a></li>
                <li><a href="#" className="hover:text-zinc-900">Model Y</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 mb-4">Energy</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li><a href="#" className="hover:text-zinc-900">Solar Panels</a></li>
                <li><a href="#" className="hover:text-zinc-900">Powerwall</a></li>
                <li><a href="#" className="hover:text-zinc-900">Megapack</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 mb-4">Charging</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li><a href="#" className="hover:text-zinc-900">Supercharging</a></li>
                <li><a href="#" className="hover:text-zinc-900">Home Charging</a></li>
                <li><a href="#" className="hover:text-zinc-900">Find Charger</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li><a href="#" className="hover:text-zinc-900">About</a></li>
                <li><a href="#" className="hover:text-zinc-900">Careers</a></li>
                <li><a href="#" className="hover:text-zinc-900">Press</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-zinc-900 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li><a href="#" className="hover:text-zinc-900">Privacy</a></li>
                <li><a href="#" className="hover:text-zinc-900">Terms</a></li>
                <li><a href="#" className="hover:text-zinc-900">Cookies</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-zinc-200 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-zinc-600">© 2024 Tesla, Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0 text-sm text-zinc-600">
              <a href="#" className="hover:text-zinc-900">Twitter</a>
              <a href="#" className="hover:text-zinc-900">YouTube</a>
              <a href="#" className="hover:text-zinc-900">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
