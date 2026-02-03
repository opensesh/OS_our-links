import { CardNav } from "@/components/CardNav";
import { OurLinks } from "@/components/OurLinks";
import { FreeResources } from "@/components/FreeResources";
import { RecentBlogs } from "@/components/RecentBlogs";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* NAVCARD - fixed layer outside clipper */}
      <div className="fixed left-0 right-0 top-4 z-50 px-[clamp(1rem,4vw,3rem)]">
        <CardNav />
      </div>

      {/* CLIPPER FRAME - provides horizontal padding */}
      <div
        className="fixed left-0 right-0 z-10 px-[clamp(1rem,4vw,3rem)]"
        style={{ top: "var(--clip-top)", height: "calc(100% - var(--clip-top))" }}
      >
        {/* CLIPPER - width-constrained with rounded top corners */}
        <div className="h-full max-w-[var(--content-max-width)] mx-auto overflow-clip rounded-t-2xl">
          {/* SCROLLER - handles scrolling */}
          <div className="h-full overflow-y-auto overflow-x-hidden">
            <main className="flex flex-col items-center pt-4 pb-6 gap-4 sm:gap-6 px-4">
              <OurLinks />
              <FreeResources />
              <RecentBlogs />
              <TechStack />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
