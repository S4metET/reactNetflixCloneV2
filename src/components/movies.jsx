import { FaCircle } from "react-icons/fa";
import { TbMovie } from "react-icons/tb";
import { useState, useEffect } from "react";
import Bookmark from "./Bookmark";
import Loading from "./Loading";
import Search from "./search";

const Movies = ({ data: propData }) => {
  const [data, setData] = useState(propData || []);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [errMessage, setErrMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(!propData);
  useEffect(() => {
    if (!propData) {
      const fetchMovies = async () => {
        try {
          const response = await fetch("https://clonejson.vercel.app/api/movies?limit=10");
          if (!response.ok) {
            throw new Error("Bir hata oluştu");
          }
          const result = await response.json();
          setData(result.filter((movie) => movie.type === "movie"));
        } catch (err) {
          setErrMessage(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMovies();
    }
  }, [propData]);

  const filteredData = data.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (errMessage) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>{errMessage}</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Search setSearchTerm={setSearchTerm} />
      <h1 className="text-white p-4">Movies</h1>
      <div className="grid px-4 gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
        {filteredData.length === 0 ? (
          <p>No content found</p>
        ) : (
          filteredData.map((movie) => (
            <div className="flex flex-col text-white" key={movie.id}>
              <div className="relative p-0.5">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2 text-white text-xl w-[25px] h-[25px] p-1 pr-8 rounded-full cursor-pointer">
                  <Bookmark movie={movie} />
                </div>
              </div>
              <div className="flex p-0.5 items-center gap-2 opacity-75 text-xs">
                <p className="text-white">{movie.release_date}</p>
                <FaCircle className="w-[3px] h-[3px]" />
                <TbMovie />
                <p>{movie.type}</p>
              </div>
              <h1 className="text-sm font-semibold">{movie.title}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Movies;
