import { CardNav } from "@/components/CardNav";
import { OurLinks } from "@/components/OurLinks";
import { FreeResources } from "@/components/FreeResources";
import { RecentBlogs } from "@/components/RecentBlogs";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* CLIPPER - fixed viewport window, clips at 32px from top */}
      <div className="fixed left-0 right-0 top-8 h-[calc(100%-2rem)] z-10 overflow-clip">
        {/* SCROLLER - fills clipper, handles scrolling */}
        <div className="h-full overflow-y-auto overflow-x-hidden px-[clamp(1rem,4vw,3rem)]">
          {/* Sticky header - sticks to top of scroller */}
          <div className="sticky top-0 z-50">
            <CardNav />
          </div>
          <main className="flex flex-col items-center pt-4 pb-6 gap-4 sm:gap-6 px-2">
            <OurLinks />
            <FreeResources />
            <RecentBlogs />
            <TechStack />
          </main>
        </div>
      </div>
    </div>
  );
}
