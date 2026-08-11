import StoreProvider from "../components/StoreProvider.jsx"
import "./globals.css"
import {Nunito_Sans, Just_Me_Again_Down_Here} from "next/font/google"

const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito-sans-next',
  display: 'swap',
});

const justMeAgain = Just_Me_Again_Down_Here({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-just-me-next',
  display: 'swap',
});

export default function RootLayout({children}){
 return(
  <html lang="en">
   <body className="font-nunito-sans">
    <StoreProvider>{children}</StoreProvider>
   </body>
  </html>
 )
}