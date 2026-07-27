import { useEffect, useRef } from 'react'
import { animate, createTimeline, stagger } from 'animejs'
import './App.css'

const BananaTree = ({ className = '' }) => {
  const treeRef = useRef(null)

  useEffect(() => {
    const el = treeRef.current
    if (!el) return

    el.querySelectorAll('.tree-leaf').forEach((leaf, i) => {
      animate(leaf, {
        rotate: [
          { to: -2, duration: 5000 + i * 400, ease: 'inOutSine' },
          { to: 2, duration: 5000 + i * 400, ease: 'inOutSine' },
        ],
        loop: true,
        delay: i * 600,
      })
    })
  }, [])

  return (
    <div ref={treeRef} className={`banana-tree ${className}`}>
      <svg viewBox="0 0 300 480" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5a8a2e" />
            <stop offset="100%" stopColor="#3a6a1e" />
          </linearGradient>
        </defs>

        <g opacity="0.35">
          <path
            d="M140 475 C138 370 146 270 142 180 C138 90 144 50 150 25 C156 50 162 90 158 180 C154 270 162 370 160 475 Z"
            fill="#8B7355"
          />

          {[
            { d: 'M155 60 Q90 35 20 90 Q60 105 150 80', ao: '155px 60px' },
            { d: 'M158 65 Q220 38 290 95 Q250 110 153 85', ao: '158px 65px' },
            { d: 'M152 80 Q75 70 10 140 Q55 145 148 105', ao: '152px 80px' },
            { d: 'M162 85 Q240 75 300 145 Q255 150 156 110', ao: '162px 85px' },
            { d: 'M156 42 Q105 18 45 50 Q85 60 154 58', ao: '156px 42px' },
            { d: 'M158 47 Q210 22 268 55 Q228 65 156 63', ao: '158px 47px' },
          ].map((leaf, i) => (
            <g key={i} className="tree-leaf" style={{ transformOrigin: leaf.ao }}>
              <path d={leaf.d} fill="url(#lg)" />
            </g>
          ))}

          <g transform="translate(150, 115)">
            <path d="M0 0 Q-8 15 -5 40 Q-3 50 0 55 Q3 50 5 40 Q8 15 0 0 Z" fill="#DAA520" opacity="0.6" />
            <path d="M-2 50 Q-10 65 -7 85 Q-4 95 -2 100 Q1 95 3 85 Q6 65 0 50 Z" fill="#DAA520" opacity="0.5" />
            <path d="M3 45 Q10 60 12 80 Q13 90 10 96 Q7 96 5 92 Q2 80 3 65 Z" fill="#DAA520" opacity="0.55" />
          </g>
        </g>
      </svg>
    </div>
  )
}

const products = [
  {
    title: 'Papel de Fibra Natural',
    desc: 'Folhas artesanais feitas com fibras de bananeira, perfeitas para convites e artes.',
    icon: '📜',
  },
  {
    title: 'Cadernos Ecológicos',
    desc: 'Cadernos artesanais com capa de fibra vegetal e papel reciclado.',
    icon: '📓',
  },
  {
    title: 'Embalagens Sustentáveis',
    desc: 'Sacos e envoltórios biodegradáveis para presentes e produtos orgânicos.',
    icon: '🎁',
  },
  {
    title: 'Kits Criativos',
    desc: 'Kits completos para você mesmo produzir seu papel artesanal em casa.',
    icon: '🎨',
  },
]

const Navbar = () => {
  const navRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 60
      if (navRef.current) {
        navRef.current.classList.toggle('scrolled', scrolled)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav ref={navRef} className="navbar">
      <div className="nav-inner">
        <span className="logo">Dibananeira</span>
        <div className="nav-links">
          <a href="#sobre">Sobre</a>
          <a href="#produtos">Produtos</a>
          <a href="#sustentabilidade">Sustentabilidade</a>
          <a href="#contato">Contato</a>
        </div>
      </div>
    </nav>
  )
}

const Hero = () => {
  const heroRef = useRef(null)

  useEffect(() => {
    const tl = createTimeline({ defaults: { ease: 'outExpo' } })

    tl.add('.hero-line', {
      translateY: [80, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: stagger(200),
    })
      .add('.hero-cta', {
        translateY: [40, 0],
        opacity: [0, 1],
        duration: 800,
      }, '-=400')
      .add('.leaf', {
        translateY: (el) => [-(200 + Math.random() * 100), 0],
        translateX: (el) => [-(100 - Math.random() * 200), (Math.random() - 0.5) * 100],
        rotate: (el) => [(Math.random() - 0.5) * 120, (Math.random() - 0.5) * 40],
        opacity: [0, 0.15],
        duration: 1500,
        delay: stagger(100),
      }, '-=600')

    animate('.floating-leaf', {
      translateY: [
        { to: -25, duration: 3000, ease: 'inOutSine' },
        { to: 25, duration: 3000, ease: 'inOutSine' },
      ],
      translateX: [
        { to: 15, duration: 4000, ease: 'inOutSine' },
        { to: -15, duration: 4000, ease: 'inOutSine' },
      ],
      rotate: [
        { to: 6, duration: 5000, ease: 'inOutSine' },
        { to: -6, duration: 5000, ease: 'inOutSine' },
      ],
      loop: true,
      delay: (el, i) => i * 800,
    })
  }, [])

  return (
    <section ref={heroRef} id="hero" className="hero">
      <div className="hero-bg">
        <BananaTree className="hero-tree hero-tree-left" />
        <BananaTree className="hero-tree hero-tree-right" />
        <div className="leaves-container">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className={`leaf floating-leaf leaf-${i}`}
              style={{
                left: `${(i / 12) * 100}%`,
                top: `${20 + Math.sin(i * 1.5) * 15}%`,
                width: `${30 + (i % 5) * 15}px`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-line hero-subtitle">Papel Artesanal & Sustentabilidade</p>
          <h1 className="hero-line hero-title">Dibananeira</h1>
          <p className="hero-line hero-desc">
            Transformamos fibras de bananeira em papel artesanal, unindo tradição,
            criatividade e respeito ao meio ambiente.
          </p>
        </div>
        <a href="#produtos" className="hero-cta">
          Conheça Nossos Produtos
          <span className="cta-arrow">→</span>
        </a>
      </div>
    </section>
  )
}

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight * 0.8
      if (isVisible) {
        animate(el.querySelectorAll('.about-anim'), {
          translateY: [60, 0],
          opacity: [0, 1],
          duration: 1000,
          delay: stagger(200),
          ease: 'outExpo',
        })
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} id="sobre" className="about">
      <div className="about-inner">
        <div className="about-text">
          <h2 className="about-anim">Nossa História</h2>
          <div className="divider about-anim" />
          <p className="about-anim">
            Na <strong>Dibananeira</strong>, acreditamos que a beleza está no que é natural.
            Desde 2018, resgatamos o ofício ancestral da produção de papel artesanal
            utilizando fibras de bananeira — um recurso abundante e renovável.
          </p>
          <p className="about-anim">
            Cada folha é feita à mão, em um processo que respeita os ciclos da natureza
            e valoriza o trabalho manual. Nosso compromisso é oferecer produtos únicos,
            que carregam história e consciência ecológica.
          </p>
        </div>
        <div className="about-image about-anim">
          <div className="img-placeholder">
            <div className="placeholder-icon">🌿</div>
            <span>Fibra de Bananeira</span>
          </div>
        </div>
      </div>
    </section>
  )
}

const Products = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight * 0.75
      if (isVisible) {
        animate(el.querySelectorAll('.product-card'), {
          translateY: [80, 0],
          opacity: [0, 1],
          duration: 900,
          delay: stagger(150),
          ease: 'outExpo',
        })
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCardHover = (e, enter) => {
    animate(e.currentTarget, {
      scale: enter ? 1.03 : 1,
      translateY: enter ? -8 : 0,
      duration: 400,
      ease: 'outExpo',
    })
  }

  return (
    <section ref={sectionRef} id="produtos" className="products">
      <div className="products-inner">
        <h2 className="section-title">Nossos Produtos</h2>
        <div className="divider" />
        <p className="section-subtitle">
          Cada peça é feita à mão com fibras naturais de bananeira
        </p>
        <div className="products-grid">
          {products.map((p, i) => (
            <div
              key={i}
              className="product-card"
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              <div className="card-icon">{p.icon}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Sustainability = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight * 0.75
      if (isVisible) {
        animate(el.querySelectorAll('.sust-anim'), {
          translateX: [-60, 0],
          opacity: [0, 1],
          duration: 1000,
          delay: stagger(200),
          ease: 'outExpo',
        })

        const statEls = el.querySelectorAll('.stat-number')
        if (statEls.length > 0) {
          animate(statEls[0], {
            innerHTML: [0, 100],
            round: 1,
            duration: 3000,
            delay: 500,
            ease: 'outQuad',
          })
          animate(statEls[1], {
            innerHTML: [0, 500],
            round: 1,
            duration: 3000,
            delay: 500,
            ease: 'outQuad',
          })
          animate(statEls[2], {
            innerHTML: [0, 95],
            round: 1,
            duration: 3000,
            delay: 500,
            ease: 'outQuad',
          })
        }

        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section ref={sectionRef} id="sustentabilidade" className="sustainability">
      <div className="sust-bg" />
      <div className="sust-inner">
        <h2 className="sust-anim">Compromisso com o Planeta</h2>
        <div className="divider sust-anim" />
        <div className="sust-content">
          <div className="sust-text sust-anim">
            <p>
              Utilizamos apenas fibras de bananeira descartadas pela agricultura local,
              transformando resíduos em arte. Nosso processo é 100% livre de químicos
              agressivos e toda a água utilizada é reutilizada.
            </p>
            <p>
              Cada folha de papel Dibananeira representa uma árvore que não precisou ser
              cortada — e uma bananeira que teve seus resíduos valorizados.
            </p>
          </div>
          <div className="sust-stats sust-anim">
            <div className="stat">
              <span className="stat-number">0</span>
              <span className="stat-unit">%</span>
              <span className="stat-label">Fibras Naturais</span>
            </div>
            <div className="stat">
              <span className="stat-number">0</span>
              <span className="stat-unit">kg</span>
              <span className="stat-label">Resíduos Transformados/mês</span>
            </div>
            <div className="stat">
              <span className="stat-number">0</span>
              <span className="stat-unit">%</span>
              <span className="stat-label">Água Reutilizada</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Contact = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const handleScroll = () => {
      const rect = el.getBoundingClientRect()
      const isVisible = rect.top < window.innerHeight * 0.8
      if (isVisible) {
        animate(el.querySelectorAll('.contact-anim'), {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
          delay: stagger(150),
          ease: 'outExpo',
        })
        window.removeEventListener('scroll', handleScroll)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleInputFocus = (e) => {
    animate(e.currentTarget, {
      scale: 1.02,
      borderColor: '#8B5E3C',
      duration: 300,
      ease: 'outExpo',
    })
  }

  const handleInputBlur = (e) => {
    animate(e.currentTarget, {
      scale: 1,
      borderColor: '#d4c5b0',
      duration: 300,
      ease: 'outExpo',
    })
  }

  return (
    <section ref={sectionRef} id="contato" className="contact">
      <div className="contact-inner">
        <h2 className="contact-anim">Entre em Contato</h2>
        <div className="divider contact-anim" />
        <p className="contact-anim">
          Quer saber mais ou fazer uma encomenda? Mande uma mensagem!
        </p>
        <form className="contact-form">
          <div className="form-row contact-anim">
            <input
              type="text"
              placeholder="Seu nome"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <input
              type="email"
              placeholder="Seu email"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          <textarea
            className="contact-anim"
            placeholder="Sua mensagem"
            rows={5}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <button
            type="submit"
            className="submit-btn contact-anim"
            onClick={(e) => {
              e.preventDefault()
              animate(e.currentTarget, {
                scale: [1, 1.05, 1],
                duration: 600,
                ease: 'outExpo',
              })
            }}
          >
            Enviar Mensagem
          </button>
        </form>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="footer">
    <div className="footer-inner">
      <div className="footer-brand">
        <span className="footer-logo">Dibananeira</span>
        <p>Papel Artesanal & Sustentabilidade</p>
      </div>
      <div className="footer-links">
        <a href="#sobre">Sobre</a>
        <a href="#produtos">Produtos</a>
        <a href="#sustentabilidade">Sustentabilidade</a>
        <a href="#contato">Contato</a>
      </div>
      <p className="footer-copy">
        &copy; {new Date().getFullYear()} Dibananeira. Feito à mão com 🌿.
      </p>
    </div>
  </footer>
)

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
        <Sustainability />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
