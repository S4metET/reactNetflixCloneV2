import { useState, useEffect } from "react";
import Recommended from "./recommended";
import Trending from "./trending";
import Loading from "./Loading";
import Search from "./search";

export default function HomePage() {
  const [recommendedData, setRecommendedData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
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
        setError(error.message);
      } finally {
        
          setIsLoading(false);
       
      }
    };

    fetchRecommendedData();
  }, []);

  // Hata mesajı varsa ekrana bas
  if (error) {
    return <p className="text-red-500 p-4">Hata: {error}</p>;
  }

  // Yükleniyor ekranı
  if (isLoading) {
    return <Loading />;
  }

  // Filtreleme işlemi
  const filteredRecommended = recommendedData.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
      <Search setSearchTerm={setSearchTerm} />
      <Trending />
      <div className="p-4">
      </div>
      <Recommended filteredRecommended={filteredRecommended} />
    </main>
  );
}

