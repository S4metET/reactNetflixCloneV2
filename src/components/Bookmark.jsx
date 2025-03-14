import { useState, useEffect } from "react";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

export default function Bookmark({ movie }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const storedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];
    setSavedMovies(storedMovies);

    // Filmin kaydedilip kaydedilmediğini kontrol et
    const alreadySaved = storedMovies.some((m) => m.id === movie.id);
    setIsSaved(alreadySaved);
  }, [movie.id]);

  const handleSave = () => {
    let storedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

    const movieData = {
      id: movie.id || movie.title, 
      title: movie.title,
      date: movie.date, 
      type: movie.type, 
      rating: movie.rating, 
      image: movie.image 
    };

    let updatedMovies;
    if (isSaved) {
      // Eğer zaten ekliyse, listeden çıkar
      updatedMovies = storedMovies.filter((m) => m.id !== movieData.id);
    } else {
      // Eğer ekli değilse, listeye ekle
      updatedMovies = [...storedMovies, movieData];
    }

    setSavedMovies(updatedMovies);
    setIsSaved(!isSaved);
    localStorage.setItem("savedMovies", JSON.stringify(updatedMovies));
  };

  return (
    <button onClick={handleSave}>
      {isSaved ? (
        <FaBookmark className="text-white w-[32px] h-[32px] p-1 rounded-full cursor-pointer bg-gradient-to-b from-[rgba(0,0,0,0.0001)] to-[rgba(0,0,0,0.75)]" />
      ) : (
        <CiBookmark className="top-2 right-2 text-white text-xl w-[32px] h-[32px] p-1 bg-gradient-to-b from-[rgba(0,0,0,0.0001)] to-[rgba(0,0,0,0.75)] rounded-full cursor-pointer" />
      )}
    </button>
  );
}
