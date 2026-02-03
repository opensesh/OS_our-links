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
        {/* Sticky header wrapper - masks content scrolling behind nav */}
        <div className="sticky top-0 z-50 bg-[var(--color-charcoal)] pt-4">
          <CardNav />
        </div>
        <main className="flex flex-col items-center pt-4 pb-6 gap-4 sm:gap-6">
          <OurLinks />
          <FreeResources />
          <RecentBlogs />
          <TechStack />
        </main>
      </div>
    </div>
  );
}
