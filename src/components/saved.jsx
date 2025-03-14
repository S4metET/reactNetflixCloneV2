const Bookmarks = ({ savedMovies }) => {
    return (
        <div>
            <h1>Kaydedilenler</h1>
            {savedMovies.length === 0 ? (
                <p>Henüz kaydedilen içerik yok.</p>
            ) : (
                <ul>
                    {savedMovies.map((movie, index) => (
                        <li key={index}>
                            <h3>{movie.title}</h3>
                            <p>{movie.year}</p>
                            <p>{movie.genre}</p>
                            <p>{movie.rating}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Bookmarks;
