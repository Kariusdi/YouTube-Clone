import {
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Clock,
  Film,
  Flame,
  Gamepad2,
  History,
  Home,
  Library,
  Lightbulb,
  ListVideo,
  Music2,
  Newspaper,
  PlaySquare,
  Podcast,
  Radio,
  Repeat,
  Shirt,
  ShoppingBag,
  Trophy,
} from "lucide-react";
import { Children, ElementType, ReactNode, useContext, useState } from "react";
import Button, { buttonStyle } from "../components/button";
import { twMerge } from "tailwind-merge";
import { playlists, subscriptions } from "../mockup_data/sidebar";
import { useSideBarContext } from "../contexts/sidebarContext";
import { NavFirstSection } from "../nav/nav";

function SideBar() {
  const { isLargeOpen, isSmallOpen, close } = useSideBarContext();
  return (
    <>
      {/* Small Screen Size Side Bar */}
      <aside
        className={`sticky top-0 flex flex-col pb-4 ml-1 overflow-y-auto scrollbar-hidden ${
          isLargeOpen ? "lg:hidden" : "lg:flex"
        }`}
      >
        <SmallSidebarItem Icon={Home} title="Home" url="/" />
        <SmallSidebarItem Icon={Repeat} title="Shorts" url="/shorts" />
        <SmallSidebarItem
          Icon={Clapperboard}
          title="Subscriptions"
          url="/subscriptions"
        />
      </aside>
      {/* End */}

      {isSmallOpen && (
        <div
          onClick={close}
          className="lg:hidden fixed inset-0 z-[999] bg-black opacity-50"
        />
      )}

      {/* Medium and Large Screen Size Side Bar */}
      <aside
        className={`lg:sticky w-56 lg:flex flex-col absolute top-0 overflow-y-auto scrollbar-hidden pb-4 gap-2 px-2 ${
          isLargeOpen ? "lg:flex" : "lg:hidden"
        } ${isSmallOpen ? "flex z-[999] bg-white max-h-screen" : "hidden"}`}
      >
        <div className="lg:hidden pt-2 pb-4 px-2 sticky top-0 bg-white">
          <NavFirstSection />
        </div>

        <LargeSideBarSection>
          <LargeSidebarItem isActive IconOrImgUrl={Home} title="Home" url="/" />
          <LargeSidebarItem
            IconOrImgUrl={Clapperboard}
            title="Subscriptions"
            url="/subscriptions"
          />
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection visibleItemCount={5}>
          <LargeSidebarItem
            IconOrImgUrl={Library}
            title="Library"
            url="/library"
          />
          <LargeSidebarItem
            IconOrImgUrl={History}
            title="History"
            url="/history"
          />
          <LargeSidebarItem
            IconOrImgUrl={PlaySquare}
            title="Your Videos"
            url="/your-videos"
          />
          <LargeSidebarItem
            IconOrImgUrl={Clock}
            title="Watch Later"
            url="/playlist?list=WL"
          />
          {playlists.map((playlist) => (
            <LargeSidebarItem
              key={playlist.id}
              IconOrImgUrl={ListVideo}
              title={playlist.name}
              url={`/playlist?list=${playlist.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Subscriptions">
          {subscriptions.map((subscription, idx) => (
            <LargeSidebarItem
              key={idx}
              IconOrImgUrl={subscription.imgUrl}
              title={subscription.channelName}
              url={`/@${subscription.id}`}
            />
          ))}
        </LargeSideBarSection>
        <hr />
        <LargeSideBarSection title="Explore">
          <LargeSidebarItem
            IconOrImgUrl={Flame}
            title="Trending"
            url="/trending"
          />
          <LargeSidebarItem
            IconOrImgUrl={ShoppingBag}
            title="Shopping"
            url="/shopping"
          />
          <LargeSidebarItem IconOrImgUrl={Music2} title="Music" url="/music" />
          <LargeSidebarItem
            IconOrImgUrl={Film}
            title="Movies & TV"
            url="/movies-tv"
          />
          <LargeSidebarItem IconOrImgUrl={Radio} title="Live" url="/live" />
          <LargeSidebarItem
            IconOrImgUrl={Gamepad2}
            title="Gaming"
            url="/gaming"
          />
          <LargeSidebarItem IconOrImgUrl={Newspaper} title="News" url="/news" />
          <LargeSidebarItem
            IconOrImgUrl={Trophy}
            title="Sports"
            url="/sports"
          />
          <LargeSidebarItem
            IconOrImgUrl={Lightbulb}
            title="Learning"
            url="/learning"
          />
          <LargeSidebarItem
            IconOrImgUrl={Shirt}
            title="Fashion & Beauty"
            url="/fashion-beauty"
          />
          <LargeSidebarItem
            IconOrImgUrl={Podcast}
            title="Podcasts"
            url="/podcasts"
          />
        </LargeSideBarSection>
      </aside>
      {/* End */}
    </>
  );
}

export default SideBar;

type SmallSidebarItemProps = {
  Icon: ElementType;
  title: string;
  url: string;
};

function SmallSidebarItem({ Icon, title, url }: SmallSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyle({ variant: "ghost" }),
        "flex flex-col items-center py-4 px-1 gap-1 rounded-lg"
      )}
    >
      <Icon className="w-5 h-5" />
      <div className="text-sm text-secondary-text">{title}</div>
    </a>
  );
}

type LargeSideBarSectionProps = {
  children: ReactNode;
  title?: string;
  visibleItemCount?: number;
};

function LargeSideBarSection({
  children,
  title,
  visibleItemCount = Number.POSITIVE_INFINITY,
}: LargeSideBarSectionProps) {
  const [isexpanded, setIsExpanded] = useState(false);
  const childrenArray = Children.toArray(children).flat();
  const showExpandedButton: boolean = childrenArray.length > visibleItemCount;
  const visibleChildren = isexpanded
    ? childrenArray
    : childrenArray.slice(0, visibleItemCount);
  return (
    <div>
      {title && <div className="text-lg ml-4 mt-2 mb-1">{title}</div>}
      {visibleChildren}
      {showExpandedButton && (
        <Button
          className="flex items-center rounded-lg gap-4 p-3 w-full"
          variant={"ghost"}
          onClick={() => setIsExpanded((e) => !e)}
        >
          {isexpanded ? (
            <ChevronUp className="w-6 h-6" />
          ) : (
            <ChevronDown className="w-6 h-6" />
          )}
          <div className="">{isexpanded ? "Show less" : "Show more"}</div>
        </Button>
      )}
    </div>
  );
}

type LargeSidebarItemProps = {
  IconOrImgUrl: ElementType | string;
  title: string;
  url: string;
  isActive?: boolean;
};

function LargeSidebarItem({
  IconOrImgUrl,
  title,
  url,
  isActive = false,
}: LargeSidebarItemProps) {
  return (
    <a
      href={url}
      className={twMerge(
        buttonStyle({ variant: "ghost" }),
        `w-full flex items-center rounded-lg gap-4 p-3 ${
          isActive ? "font-bold bg-neutral-100" : undefined
        }`
      )}
    >
      {typeof IconOrImgUrl === "string" ? (
        <img src={IconOrImgUrl} className="w-6 h-6 rounded-full"></img>
      ) : (
        <IconOrImgUrl className="w-6 h-6"></IconOrImgUrl>
      )}

      <div className={`whitespace-nowrap overflow-hidden text-ellipsis`}>
        {title}
      </div>
    </a>
  );
}
