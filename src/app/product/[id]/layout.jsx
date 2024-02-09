import ProductContextProvider from "@/context/ProductContext"

export const metadata = {
    title: 'River Ranges Florist',
    description: 'This is a flower app.',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
            <ProductContextProvider>
                {children}
            </ProductContextProvider>
        </body>
      </html>
    )
  }