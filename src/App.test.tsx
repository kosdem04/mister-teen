import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'
import { realPhotos } from './photos'

describe('Mister Teen landing interactions', () => {
  it('opens the mobile navigation', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /открыть меню/i }))
    expect(screen.getByRole('navigation', { name: /мобильная навигация/i })).toBeVisible()
  })

  it('expands an FAQ answer', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /где проходят праздники/i }))
    expect(screen.getByText(/подберём площадку/i)).toBeVisible()
  })

  it('requires contact and consent before accepting the lead', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /получить расчёт праздника/i }))
    expect(screen.getByText(/укажите имя и телефон/i)).toBeVisible()
  })

  it('offers the bonus certificate as a downloadable file', () => {
    render(<App />)
    const links = screen.getAllByRole('link', { name: /скачать сертификат/i })
    expect(links).toHaveLength(2)
    links.forEach(link => {
      expect(link).toHaveAttribute('href', '/assets/mister-teen-certificate.jpg')
      expect(link).toHaveAttribute('download')
    })
  })

  it('uses real event photos across the landing page', () => {
    const { container } = render(<App />)
    expect(screen.getByRole('img', { name: /настоящий праздник/i })).toHaveAttribute('src', realPhotos[4])
    const eventPhotos = [...container.querySelectorAll<HTMLElement>('.event-photo')]
    expect(eventPhotos.length).toBeGreaterThan(10)
    expect(eventPhotos.every(photo => photo.style.backgroundImage.includes('/assets/photos/'))).toBe(true)
  })
})
