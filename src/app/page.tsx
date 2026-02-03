import { CardNav } from "@/components/CardNav";
import { OurLinks } from "@/components/OurLinks";
import { FreeResources } from "@/components/FreeResources";
import { RecentBlogs } from "@/components/RecentBlogs";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Single scroll container with nav inside - shared scroll context for alignment */}
      <div className="fixed inset-0 z-10 overflow-y-auto overflow-x-hidden px-[clamp(1rem,4vw,3rem)]">
        {/* Sticky header wrapper - transparent to show animated background */}
        <div className="sticky top-0 z-50 pt-4">
          <CardNav />
        </div>
        {/* Clip wrapper - crops top 16px so content doesn't show in header gap */}
        <div className="-mt-4 pt-4 [clip-path:inset(1rem_0_0_0)]">
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
