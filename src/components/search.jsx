import { IoSearchOutline } from "react-icons/io5";

const Search = ({ setSearchTerm }) => {
  const onChange = (e) => {
    setSearchTerm(e.target.value); // Kullanıcı inputu her değiştirdiğinde arama terimini günceller
  };

  return (
    <div className="flex p-4 bg-[#000000] gap-4 items-center">
      <div>
        <IoSearchOutline className="text-white" />
      </div>
      <div className="text-white">
        <input
          className="text-white w-[214px]"
          type="text"
          placeholder="Search for movies or TV series"
          onChange={onChange} // Her tuş değişikliğinde tetiklenir
        />
      </div>
    </div>
  );
};

export default Search;