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

  it('requires name, phone, and consent before accepting the feedback form', async () => {
    render(<App />)
    await userEvent.click(screen.getByRole('button', { name: /отправить заявку/i }))
    expect(screen.getByText(/укажите имя, телефон и подтвердите согласие/i)).toBeVisible()
  })

  it('shows an inline thank-you state after valid feedback submission', async () => {
    render(<App />)
    await userEvent.type(screen.getByRole('textbox', { name: /ваше имя/i }), 'Анна')
    await userEvent.type(screen.getByRole('textbox', { name: /телефон/i }), '+7 999 123-45-67')
    await userEvent.type(screen.getByRole('textbox', { name: /комментарий/i }), 'Интересует день рождения на 10 человек')
    await userEvent.click(screen.getByRole('checkbox', { name: /обработку персональных данных/i }))
    await userEvent.click(screen.getByRole('button', { name: /отправить заявку/i }))
    expect(screen.getByText(/спасибо, мы свяжемся с вами/i)).toBeVisible()
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
    expect(screen.getByRole('img', { name: /настоящий праздник mister teen/i })).toHaveAttribute('src', realPhotos[4])
    const eventPhotos = [...container.querySelectorAll<HTMLElement>('.event-photo')]
    expect(eventPhotos.length).toBeGreaterThan(10)
    expect(eventPhotos.every(photo => photo.style.backgroundImage.includes('/assets/photos/'))).toBe(true)
  })
})
