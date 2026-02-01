import { CardNav } from "@/components/CardNav";
import { OurLinks } from "@/components/OurLinks";
import { FreeResources } from "@/components/FreeResources";
import { RecentBlogs } from "@/components/RecentBlogs";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <CardNav />

      {/* Fixed scroll container - clips content at middle of nav */}
      <div
        className="fixed left-0 right-0 z-10 overflow-y-auto overflow-x-hidden"
        style={{ top: '46px', bottom: 0 }}
      >
        <main className="flex flex-col items-center px-4 pt-[46px] pb-6 gap-4 sm:gap-6">
          <OurLinks />
          <FreeResources />
          <RecentBlogs />
          <TechStack />
        </main>
      </div>
    </div>
  );
}
