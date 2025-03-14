import { FaCircle } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";

const Recommended = ({ filteredRecommended = null }) => {
  const [data, setData] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  useEffect(() => {
    if (!filteredRecommended) {
      const fetchData = async () => {
        try {
          const response = await fetch("https://clonejson.vercel.app/api/movies?limit=10");
          if (!response.ok) {
            throw new Error("Bir hata oluştu");
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          setErrMessage(err.message);
        }
      };
      fetchData();
    } else {
      setData(filteredRecommended);
    }
  }, [filteredRecommended]);

  if (errMessage) {
    return <p className="text-red-500">{errMessage}</p>;
  }
  return (
    <div>
      <h1 className="text-white p-4">Recommended for you</h1>
      <div className="grid px-4 gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {data.length === 0 ? (
          <p>No content found</p>
        ) : (
          data.map((item) => (
            <div className="flex flex-col text-white" key={item.id}>
              <div className="relative p-0.5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 text-white text-xl w-[25px] h-[25px] p-1 rounded-full cursor-pointer">
                  <Bookmark movie={{
                    id: item.id,
                    date: item.release_date,
                    type: item.type,
                    rating: item.age_rating,
                    title: item.title,
                    image: item.image,
                  }} />
                </div>
              </div>
              <div className="flex p-0.5 items-center gap-2 opacity-75 text-xs">
                <p className="text-white">{item.release_date}</p>
                <FaCircle className="w-[3px] h-[3px]" />
                <TbMovie />
                <p>{item.type}</p>
              </div>
              <h1 className="text-sm font-semibold">{item.title}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Recommended;
