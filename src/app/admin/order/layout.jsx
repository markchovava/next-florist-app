import OrderContextProvider from "@/context/admin/OrderContext"

export const metadata = {
    title: 'River Range Florist | Order',
    description: 'This is a flower app.',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
          <OrderContextProvider>
            {children}
          </OrderContextProvider>
        </body>
      </html>
    )
  }