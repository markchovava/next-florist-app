import CartContextProvider from "@/context/CartContext"


export const metadata = {
    title: 'River Range Florist',
    description: 'This is a flower app.',
  }
  

export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
            <CartContextProvider>
                {children}
            </CartContextProvider>
        </body>
      </html>
    )
  }