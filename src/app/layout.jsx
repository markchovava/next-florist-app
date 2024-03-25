import { CookiesProvider } from 'react-cookie'
import './globals.css'


export const metadata = {
  title: 'River Range Florist and Gift Shop',
  description: 'We Spread Flowers, We Spread Love. We make flowers for all ocassions. Pair a bouquet with a thoughtful gift from our selection for that loved and cherished person in your life.',
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
