import Image from "next/image";
import ProductForm from "@/components/ProductForm";
import ProductList from "@/components/ProductList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" max-w-5xl w-full items-center space-x-4  font-mono text-sm lg:flex">
  
       
         
         
            <Image
              src="/logo.jpeg"
              alt="shop Logo"
             
              width={50}
              height={54}
              priority
            />
            
        
        <h2 className="text-2xl underline">Home of elctronics</h2>

        <br />
        <ProductForm />

        <ProductList />
         
      </div>

   </main>
  );
}
