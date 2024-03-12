import { useState } from "react";
import "./App.css";
import CategoryPills from "./components/categoryPills";
import { categories } from "./mockup_data/categories";
import Nav from "./nav/nav";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <>
      <div className="max-h-screen flex flex-col">
        <Nav />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <div className="bg-red-200">
            Sidebar
          </div>
          <div className="overflow-x-hidden px-8 pb-4">
            <div className="sticky z-10 top-0 bg-white pb-4">
              <CategoryPills
                categories={categories} 
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
