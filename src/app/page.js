import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" max-w-5xl w-full items-center space-x-4  font-mono text-sm lg:flex">
  
       
         
         
            <Image
              src="/logo.jpeg"
              alt="Vercel Logo"
             
              width={50}
              height={54}
              priority
            />
            
        
        <h2 className="text-2xl underline">Home of elctronics</h2>
         
      </div>

   </main>
  );
}
