import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, addItem }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  function handleSearchInput(event) {
    setSearchInput(event.target.value);
  }

  function onItemFormSubmit(newItem) {
    addItem(newItem)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All" && searchInput === "") return true;

    if (selectedCategory !== "All" && searchInput === "") return item.category === selectedCategory;

    if(selectedCategory === "All" && searchInput !== "") return item.name.toLowerCase().includes(searchInput.toLowerCase());

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={onItemFormSubmit}/>
      <Filter onCategoryChange={handleCategoryChange} onSearchChange={handleSearchInput} />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
