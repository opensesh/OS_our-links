import { CardNav } from "@/components/CardNav";
import { OurLinks } from "@/components/OurLinks";
import { FreeResources } from "@/components/FreeResources";
import { RecentBlogs } from "@/components/RecentBlogs";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <CardNav />
      <main className="flex flex-col items-center px-4 pt-[92px] pb-6 gap-4 sm:gap-6">
        <OurLinks />
        <FreeResources />
        <RecentBlogs />
        <TechStack />
      </main>
    </div>
  );
}
