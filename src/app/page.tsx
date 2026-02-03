import { CardNav } from "@/components/CardNav";
import { OurLinks } from "@/components/OurLinks";
import { FreeResources } from "@/components/FreeResources";
import { RecentBlogs } from "@/components/RecentBlogs";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* NavCard - fixed outside clipper, stays at 16px from screen */}
      <div className="fixed left-0 right-0 top-4 z-50 px-[clamp(1rem,4vw,3rem)]">
        <CardNav />
      </div>

      {/* CLIPPER - starts below NavCard's rounded corners (32px) */}
      <div className="fixed left-0 right-0 top-8 h-[calc(100%-2rem)] z-10 overflow-clip">
        {/* SCROLLER - fills clipper, handles scrolling */}
        <div className="h-full overflow-y-auto overflow-x-hidden px-[clamp(1rem,4vw,3rem)]">
          <main className="flex flex-col items-center pt-[60px] pb-6 gap-4 sm:gap-6 px-4">
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
