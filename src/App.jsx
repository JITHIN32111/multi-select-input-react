import React, { useEffect, useRef, useState } from "react";
import Pill from "./components/Pill";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set());
  const inputRef = useRef(null);
  const addSuggestion = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSelectedUsersSet(new Set([...selectedUsersSet, user.email]));
    setSearchTerm("");
    setSuggestions([]);
    inputRef.current.focus();
  };

  const handleRemoveUser = (user) => {
    const updatedUsers = selectedUsers.filter(
      (selected) => selected.email !== user.email
    );
    setSelectedUsers(updatedUsers);
    selectedUsersSet.delete(user.email);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUsers.length > 0
    ) {
      const lastUser = selectedUsers[selectedUsers.length - 1];
      handleRemoveUser(lastUser);
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      if (searchTerm.trim() === "") {
        setSuggestions([]);
        return;
      }
      await fetch(`https://dummyjson.com/users/search?q=${searchTerm}`);
      const response = await fetch(
        `https://dummyjson.com/users/search?q=${searchTerm}`
      );
      const data = await response.json();
      setSuggestions(data);
    };
    fetchUsers();
  }, [searchTerm]);
  return (
    <div className="flex flex-col relative mt-5 px-6">
      <div className="w-full flex flex-wrap border-2 items-center p-3 rounded-full">
        {selectedUsers.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onclick={() => handleRemoveUser(user)}
            />
          );
        })}
        <input
          ref={inputRef}
          type="text"
          className="h-8 outline-none"
          value={searchTerm}
          placeholder="Search for a User"
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <ul className="max-h-[300px] overflow-y-scroll  p-0 sm:mt-14 mt-20 top-0  absolute  border-1">
          {suggestions?.users?.map((user, index) => {
            return !selectedUsersSet.has(user.email) ? (
              <li
                onClick={() => addSuggestion(user)}
                className="flex border  flex-row items-center gap-6 cursor-pointer "
                key={user.email}
              >
                <img className="h-[20px]" src={user.image} alt="" />
                <span>
                  {user.firstName}
                  {user.lastName}
                </span>
              </li>
            ) : (
              <></>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
