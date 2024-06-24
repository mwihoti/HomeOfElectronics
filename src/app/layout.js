import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext"
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Homeofelectronics",
  description: "author mwihoti",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <head>
      
      </head>
      
      <body className="min-h-screen" >
        <AuthProvider>
        {children}
        <Footer className="absolute bottom-0 m-3" />
        </AuthProvider>
     
      
        
        </body>
       
        
    </html>
  );
}
