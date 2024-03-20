import CategoryProductContextProvider from "@/context/CategoryProductContext"


export const metadata = {
    title: 'River Ranges Florist',
    description: 'This is a flower app.',
  }
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
            <CategoryProductContextProvider>
                {children}
            </CategoryProductContextProvider>
        </body>
      </html>
    )
  }