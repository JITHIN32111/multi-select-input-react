import React, { useEffect, useState } from "react";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionList, setSuggestionList] = useState([]);

  

  useEffect(()=>{
    const fetchUsers = async() => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
      const response = await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`);
      const data = await response.json();
      setSuggestions(data);
    };
    fetchUsers()
  },[searchTerm])
  return (
    <div className="flex flex-col relative mt-5 px-6">
      <div className="w-full flex flex-wrap border-2 items-center p-3 rounded-full">
        <input
          type="text"
          className="h-8 outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="max-h-[300px] overflow-y-scroll  p-0 mt-14 top-0  absolute  border-1">{suggestions?.users?.map((user,index)=>{
          return <li className="flex border  flex-row items-center gap-6 cursor-pointer " key={user.email}>
            <img className="h-[20px]" src={user.image} alt="" />
            <span>{user.firstName}{user.lastName}</span>
          </li>
        })}</ul>
      </div>
    </div>
  );
}

export default App;
