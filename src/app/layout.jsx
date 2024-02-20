import { CookiesProvider } from 'react-cookie'
import './globals.css'


export const metadata = {
  title: 'River Range Florist',
  description: 'This is a flower app.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='w-[100%] h-auto'>
          {children}
      </body>
    </html>
  )
}
