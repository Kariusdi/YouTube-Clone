import { useState } from "react";
import "./App.css";
import CategoryPills from "./components/categoryPills";
import { categories } from "./mockup_data/categories";
import Nav from "./nav/nav";
import { videos } from "./mockup_data/videos";
import VideoGridItems from "./components/videoGridItems";
import SideBar from "./sidebar/sidebar";
import SidebarContextProvider from "./contexts/sidebarContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  return (
    <>
      <SidebarContextProvider>
        <div className="max-h-screen flex flex-col">
          <Nav />
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <SideBar />
            <div className="overflow-x-hidden px-8 pb-4">
              <div className="sticky z-10 top-0 bg-white pb-4">
                <CategoryPills
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelect={setSelectedCategory}
                />
              </div>
              <div className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(300px,1fr))]">
                {videos?.map((video) => (
                  <VideoGridItems key={video.id} {...video} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </SidebarContextProvider>
    </>
  );
}

export default App;
