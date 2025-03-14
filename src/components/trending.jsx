import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import "../styles/global.css";
import Bookmark from "./Bookmark";

export default function Trending({ addBookmark }) {
  const [data, setData] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch('https://clonejson.vercel.app/api/movies?limit=10')
        if (!response.ok) {
          throw new Error('Bir hata oluştu');
        }
        const data = await response.json();
        console.log(data);
        setData(data);
      } catch (err) {
        console.log(err);
        setErrMessage(err.message);
      }
    };
    getUsers();
  }, []);

  if (errMessage) {
    return (
      <>
        <p>{errMessage}</p>
      </>
    );
  }
  return (
    <div>
      <div className="mb-4 px-4">
          <h1 className="text-white">Trending</h1>
        </div>
      <div className="px-4 flex gap-4 overflow-x-auto whitespace-nowrap bg-transparent scrollbar-thin scrollbar-thumb-transparent">
      
        {data.length === 0 ? (
          <p>İçerik bulunamadı</p>
        ) : (
          data.map(data => (
            <div key={data.title} className="flex ">
              <div  className="  relative w-[240px] h-[140px] rounded-md overflow-hidden">
              <img
                src={data.image}
                alt="Movie Thumbnail"
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-opacity-50 flex flex-col justify-between p-2 text-white">
                <div className="flex justify-end">
                <Bookmark movie={{id:data.id, date: data.release_date, type:data.type, rating:data.age_rating, title: data.title, image: data.image }} />
                </div>
                <div>
                  <div className="flex items-center gap-2 opacity-75 text-xs">
                    <p>{data.release_date}</p>
                    <FaCircle className="w-[3px] h-[3px]" />
                    <TbMovie />
                    <p>{data.type}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold"> {data.title} </h3>
                    <h1 className="px-2 py-1 opacity-50 bg-[Dark Blue] rounded text-sm">{data.age_rating}</h1>
                  </div>
                </div>
              </div>
                      </div>
            </div>
          ))
      
      
        )}
      </div>
    </div>
  );
}




// const handleBookmarkClick = () => {
//   setSaved(!saved);
//   const movie = {
//       title: "Beyond Earth",
//       year: "2019",
//       genre: "Movie",
//       rating: "PG"
//   };
  
//   if (!saved) {
//       addBookmark(movie);
//   } else {
//       console.log("Beyond Earth kayıttan kaldırıldı!");
//   }
// };