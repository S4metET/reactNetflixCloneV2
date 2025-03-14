 export default function Loading(){
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black">
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#161D2F] rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-[#5A698F] rounded-full border-b-transparent animate-spin"></div>
        </div>
      </div>
    </div>
  )
 }