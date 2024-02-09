
export const metadata = {
  title: 'Flower | App Info',
  description: 'This is a flower app.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
