"use client";

export function BrandHero() {
  return (
    <section className="w-full px-4">
      <div className="max-w-[800px] mx-auto">
        <div
          className="flex items-center gap-3 p-3 rounded-xl"
          style={{
            backgroundColor: "#0d0d0d",
            border: "1px solid var(--color-vanilla)",
          }}
        >
          {/* Video Logo - 103px on desktop per Figma */}
          <div
            className="flex-shrink-0 w-[70px] h-[70px] sm:w-[85px] sm:h-[85px] lg:w-[103px] lg:h-[103px] rounded-full overflow-hidden"
            style={{ backgroundColor: "#1a1a1a" }}
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover scale-110"
            >
              <source
                src="/videos/OS_Brandmark_CRT_charcoal.mp4"
                type="video/mp4"
              />
            </video>
          </div>

          {/* Wordmark - anchored left, clips from right on small screens */}
          <div className="flex-1 flex items-center overflow-x-clip overflow-y-visible">
            <img
              src="/images/logo_stacked-wordmark_vanilla.svg"
              alt="Open Session"
              className="h-[242px] sm:h-[306px] lg:h-[357px] w-auto -my-[81px] sm:-my-[106px] lg:-my-[126px] -ml-[30px] sm:-ml-[38px] lg:-ml-[45px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
