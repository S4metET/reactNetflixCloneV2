import { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import Search from "../search";
import App from "../../App";
import HomePage from "../home";
import Movies from "../movies";
import Series from "../series";
import Loading from "../Loading";

export default function MainLayout() {
  const [currentPage, setCurrentPage] = useState(window.location.pathname);
  const [isLoading, setIsLoading] = useState(true);
  const [moviesData, setMoviesData] = useState([]);
  const [seriesData, setSeriesData] = useState([]);
  const [recommendedData, setRecommendedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPage(path);
  };

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await fetch("https://clonejson.vercel.app/api/movies?limit=10");
        if (!response.ok) {
          throw new Error("Error fetching movie data");
        }
        const data = await response.json();
        setMoviesData(data.filter((item) => item.type === "movie"));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSeriesData = async () => {
      try {
        const response = await fetch("https://clonejson.vercel.app/api/movies?limit=10");
        if (!response.ok) {
          throw new Error("Error fetching series data");
        }
        const data = await response.json();
        setSeriesData(data.filter((item) => item.type === "series"));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchRecommendedData = async () => {
      try {
        const response = await fetch("https://clonejson.vercel.app/api/movies?limit=10");
        if (!response.ok) {
          throw new Error("Error fetching recommended data");
        }
        const data = await response.json();
        setRecommendedData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMoviesData();
    fetchSeriesData();
    fetchRecommendedData();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredRecommended = recommendedData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMovies = moviesData.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSeries = seriesData.filter((series) =>
    series.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-[#000000]">
      <Sidebar navigate={navigate} />
      <div>
        <div>
          <App>
            {currentPage === "/" && (
              <HomePage filteredRecommended={filteredRecommended} />
            )}
            {currentPage === "/filmler" && <Movies data={filteredMovies} />}
            {currentPage === "/diziler" && <Series data={filteredSeries} />}
          </App>
        </div>
      </div>
    </div>
  );
}
