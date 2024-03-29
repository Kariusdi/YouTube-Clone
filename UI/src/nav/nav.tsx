import { ArrowLeft, Bell, Menu, Mic, Search, Upload, User } from "lucide-react";
import Button from "../components/button";
import { useState } from "react";
import { useSideBarContext } from "../contexts/sidebarContext";

function Nav() {
  const [showFullWidthSearch, setShowFullWidthSearch] = useState(false);

  return (
    <div className="flex gap-10 lg:gap-20 justify-between pt-2 mb-6 mx-4">
      {/* Burger Menu and Logo (Left side) */}
      <NavFirstSection hidden={showFullWidthSearch}></NavFirstSection>
      {/* End */}

      {/* Search Bar (Middle) */}
      <form
        className={`gap-4 flex-grow justify-center ${
          showFullWidthSearch ? "flex" : "hidden md:flex"
        }`}
        action=""
      >
        <Button
          onClick={() => setShowFullWidthSearch(false)}
          type="button"
          variant={"ghost"}
          size={"icon"}
          className={`${showFullWidthSearch ? "visible" : "hidden"}`}
        >
          <ArrowLeft />
        </Button>
        <div className="flex flex-grow max-w-[600px]">
          <input
            type="search"
            placeholder="Search"
            className="rounded-l-full 
                    border border-secondary-border shadow-inner shadow-secondary 
                    py-1 px-4 text-md w-full focus:border-blue-500 outline-none"
          />
          <Button className="rounded-r-full px-4 py-2 border border-secondary-border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </div>

        <Button type="button" size={"icon"} className="flex-shrink-0">
          <Mic />
        </Button>
      </form>
      {/* End */}

      {/* Upload, Notification, User icons (Right Side) */}
      <div
        className={`flex-shrink-0 md:gap-2 ${
          showFullWidthSearch ? "hidden" : "flex"
        }`}
      >
        <Button
          onClick={() => setShowFullWidthSearch(true)}
          variant={"ghost"}
          size={"icon"}
          className="md:hidden"
        >
          <Search />
        </Button>
        <Button variant={"ghost"} size={"icon"} className="md:hidden">
          <Mic />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Upload />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <Bell />
        </Button>
        <Button variant={"ghost"} size={"icon"}>
          <User />
        </Button>
      </div>
      {/* End */}
    </div>
  );
}

export default Nav;




type NavFirstSectionProps = {
  hidden?: boolean
}


export function NavFirstSection({ hidden = false }: NavFirstSectionProps) {
  const { toggle } = useSideBarContext();
  return (
    <div
      className={`gap-4 items-center flex-shrink-0 ${
        hidden ? "hidden" : "flex"
      }`}
    >
      <Button onClick={toggle} variant={"ghost"} size={"icon"}>
        <Menu />
      </Button>
      <a href="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Logo_of_YouTube_%282015-2017%29.svg/1024px-Logo_of_YouTube_%282015-2017%29.svg.png"
          className="w-[3.5rem] h-5 flex-shrink-0"
        />
      </a>
    </div>
  );
}
