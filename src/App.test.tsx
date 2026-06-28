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

  it('shows direct contact options instead of a feedback form', () => {
    render(<App />)
    expect(screen.getByText(/напишите нам удобным способом/i)).toBeVisible()
    expect(screen.getByRole('link', { name: /написать в telegram/i })).toHaveAttribute('href', 'https://t.me/misterteen')
    expect(screen.getByRole('link', { name: /написать в instagram/i })).toHaveAttribute('href', 'https://www.instagram.com/mrteen?igsh=MmJ0aWp2NTN4d2cy')
    expect(screen.getAllByRole('link', { name: /\+7 \(952\) 944-74-19/i })[1]).toHaveAttribute('href', 'tel:+79529447419')
    expect(screen.queryByRole('textbox', { name: /ваше имя/i })).not.toBeInTheDocument()
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
