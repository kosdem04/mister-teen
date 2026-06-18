import { FormEvent, useState } from 'react'
import {
  Check, CheckCircle2, Gift, Instagram, Menu, Phone, Send,
  X, XCircle,
} from 'lucide-react'
import { advantages, audience, childBenefits, formats, parentBenefits, solution, steps } from './data'
import { realPhotos } from './photos'

function Logo() {
  return <a className="logo" href="#top" aria-label="Mister Teen">
    <img src="/assets/mister-teen-logo.jpg" alt="Mister Teen" />
  </a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const links = [['О нас', 'about'], ['Форматы', 'formats'], ['Как это работает', 'steps'], ['Галерея', 'gallery'], ['Заявка', 'request']]

  return <header className="header">
    <div className="container header-inner">
      <Logo />
      <nav className="desktop-nav">{links.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <div className="header-actions"><a className="phone" href="tel:+79529447419"><Phone size={17} /> +7 (952) 944-74-19</a><a className="btn small" href="#request">Оставить заявку</a></div>
      <button className="menu-btn" aria-label={open ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="mobile-nav" aria-label="Мобильная навигация">{links.map(([label, id]) => <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>)}<a href="tel:+79529447419">+7 (952) 944-74-19</a></nav>}
  </header>
}

function Title({ children, center = true }: { children: React.ReactNode, center?: boolean }) {
  return <h2 className={`section-title ${center ? 'center' : ''}`}>{children}</h2>
}

function Photo({ index, className = '' }: { index: number, className?: string }) {
  return <div className={`event-photo ${className}`} style={{ backgroundImage: `url(${realPhotos[index % realPhotos.length]})` }} />
}

function LeadForm() {
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = data.get('name')?.toString().trim()
    const phone = data.get('phone')?.toString().trim()
    const consent = data.get('consent')

    if (!name || !phone || !consent) {
      setError('Укажите имя, телефон и подтвердите согласие.')
      return
    }

    setError('')
    setSent(true)
  }

  return <section id="request" className="section"><div className="container lead-card">
    <div className="lead-copy">
      <Title center={false}>Оставьте заявку, и мы поможем <span>организовать праздник без суеты</span></Title>
      <p>Напишите, какой праздник планируете, и мы свяжемся с вами, чтобы обсудить формат, дату и детали.</p>
      <Photo index={5} />
    </div>
    {sent ? <div className="success"><CheckCircle2 /><h3>Спасибо, мы свяжемся с вами</h3><p>Заявка принята. Скоро обсудим удобную дату, формат и все детали праздника.</p></div> :
    <form onSubmit={submit} noValidate>
      <input name="name" placeholder="Ваше имя" aria-label="Ваше имя" />
      <input name="phone" placeholder="Телефон" aria-label="Телефон" />
      <textarea name="comment" placeholder="Расскажите, какой праздник планируете" aria-label="Комментарий" rows={5} />
      <label className="consent"><input name="consent" type="checkbox" /> Согласен(а) на обработку персональных данных</label>
      {error && <p className="form-error">{error}</p>}
      <button className="btn wide" type="submit">Отправить заявку</button>
    </form>}
  </div></section>
}

export default function App() {
  return <><Header /><main id="top">
    <section className="hero"><div className="container hero-grid"><div className="hero-photo"><img src={realPhotos[4]} alt="Настоящий праздник Mister Teen" /></div><div className="hero-copy"><p className="eyebrow">Детские праздники под ключ</p><h1><span>MISTER TEEN</span><br />возвращается</h1><p className="hero-sub">И снова создаёт детские праздники под ключ <b>в Новосибирске</b> — ярко, весело и без хлопот.</p><div className="hero-buttons"><a className="btn" href="#request">Оставить заявку</a><a className="btn outline" href="#certificate"><Gift /> Получить 10 000 бонусных рублей</a></div></div></div></section>

    <section id="about" className="section compact"><div className="container advantage-grid">{advantages.map(([Icon, title, text]) => <article className="mini-card" key={title as string}><Icon /><div><h3>{title as string}</h3><p>{text as string}</p></div></article>)}</div></section>

    <section className="section"><div className="container split">
      <article className="card pain"><Title center={false}>Детский праздник не должен <span>превращаться в стресс для родителей</span></Title><div className="media-list"><Photo index={3} /><ul>{['Придумать тему, сценарий и развлечения', 'Организовать площадку, ведущих, шоу и еду', 'Проконтролировать всё без накладок', 'Уложиться в бюджет', 'Не остаться без сил после праздника'].map(x => <li key={x}><XCircle />{x}</li>)}</ul></div></article>
      <article className="card solution"><Title center={false}>Мы берём организацию <span>на себя</span></Title><div className="media-list reverse"><ul>{solution.map(x => <li key={x}><CheckCircle2 />{x}</li>)}</ul><Photo index={1} /></div></article>
    </div></section>

    <section id="formats" className="section"><div className="container"><Title>Выберите формат праздника</Title><div className="format-grid">{formats.map(([name, text], i) => <article className="format-card" key={name}><Photo index={i} /><span>{i + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="section warm"><div className="container benefits-grid"><article><Title center={false}>Почему <span>детям</span> нравится</Title><div className="benefit-card"><Photo index={1} />{childBenefits.map(([Icon, text]) => <p key={text as string}><Icon />{text as string}</p>)}</div></article><article><Title center={false}>Почему <span>родителям</span> спокойно</Title><div className="benefit-card parent">{parentBenefits.map(([Icon, text]) => <p key={text as string}><Icon />{text as string}</p>)}</div></article></div></section>

    <section id="steps" className="section"><div className="container"><Title>От заявки до праздника — 5 понятных шагов</Title><div className="steps">{steps.map(([name, text], i) => <article key={name}><span>{i + 1}</span><h3>{name}</h3><p>{text}</p></article>)}</div></div></section>

    <section id="certificate" className="section"><div className="container certificate"><a className="certificate-preview" href="/assets/mister-teen-certificate.jpg" download="Сертификат-Mister-Teen.jpg" aria-label="Скачать сертификат"><img src="/assets/mister-teen-certificate.jpg" alt="Сертификат Mister Teen на 10 000 бонусных рублей" /></a><div><Title center={false}>Получите 10 000 бонусных рублей на организацию праздника</Title><p>В честь возвращения Mister Teen дарим сертификат. Бонусами можно оплатить до 20% стоимости заказа.</p><ul><li><Check /> Действует на все праздники и программы</li><li><Check /> Сертификат действует до 30.06.2027</li></ul><a className="btn light" href="/assets/mister-teen-certificate.jpg" download="Сертификат-Mister-Teen.jpg">Скачать сертификат</a></div></div></section>

    <section id="gallery" className="section"><div className="container gallery-card"><Title>Посмотрите, какой может быть <span>атмосфера праздника</span></Title><div className="gallery-grid">{formats.map((_, i) => <Photo index={i} key={i} />)}</div></div></section>

    <section className="section compact"><div className="container"><Title>Подойдёт, если вы хотите не просто праздник, <span>а событие</span></Title><div className="audience">{audience.map(([Icon, text]) => <article key={text as string}><Icon /><p>{text as string}</p></article>)}</div></div></section>
    <LeadForm />
  </main><footer><div className="container footer"><Logo /><div className="socials"><a href="https://t.me/misterteen" aria-label="Telegram" target="_blank" rel="noreferrer"><Send /></a><a href="https://www.instagram.com/mrteen?igsh=MmJ0aWp2NTN4d2cy" aria-label="Instagram" target="_blank" rel="noreferrer"><Instagram /></a></div><div><a href="tel:+79529447419"><b>+7 (952) 944-74-19</b></a><p>Новосибирск</p></div></div></footer></>
}
