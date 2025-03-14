import { useState, useEffect } from "react";
import { FaCircle } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import Bookmark from "./Bookmark";
import Loading from "./Loading";
import Search from "./search";
const Series = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        const response = await fetch("https://clonejson.vercel.app/api/movies?limit=10");
        if (!response.ok) {
          throw new Error("Bir hata oluştu");
        }
        const result = await response.json();
        setData(result.filter((series) => series.type === "series"));
      } catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeries();
  }, []);

  const filteredData = data.filter((series) =>
    series.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Search setSearchTerm={setSearchTerm} />
      <h1 className="text-white p-4">TV Series</h1>
      <div className="grid px-4 gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {filteredData.length === 0 ? (
          <p className="text-white mb-5">İçerik bulunamadı</p>
        ) : (
          filteredData.map((series) => (
            <div className="flex flex-col text-white" key={series.id}>
              <div className="relative p-0.5">
                <img
                  src={series.image}
                  alt={series.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 text-white text-xl w-[25px] h-[25px] p-1 pr-8 rounded-full cursor-pointer">
                  <Bookmark movie={{ id: series.id, title: series.title, image: series.image }} />
                </div>
              </div>
              <div className="flex p-0.5 items-center gap-2 opacity-75 text-xs">
                <p className="text-white">{series.release_date}</p>
                <FaCircle className="w-[3px] h-[3px]" />
                <TbMovie />
                <p>{series.type}</p>
              </div>
              <h1 className="text-sm font-semibold">{series.title}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Series;
