import { CardNav } from "@/components/CardNav";
import { OurLinks } from "@/components/OurLinks";
import { FreeResources } from "@/components/FreeResources";
import { RecentBlogs } from "@/components/RecentBlogs";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <CardNav />
      <main className="flex flex-col items-center justify-center p-8 pt-[92px]">
        <OurLinks />
        <FreeResources />
        <RecentBlogs />
      </main>
    </div>
  );
}
