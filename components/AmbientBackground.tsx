"use client";

export function AmbientBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Light theme blobs */}
      <div
        className="absolute -left-32 -top-32 h-[320px] w-[320px] rounded-full opacity-50 md:h-[560px] md:w-[560px] dark:hidden"
        style={{
          background: "rgba(139, 92, 246, 0.18)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute -right-24 -top-20 h-[280px] w-[280px] rounded-full opacity-45 md:h-[480px] md:w-[480px] dark:hidden"
        style={{
          background: "rgba(249, 115, 22, 0.14)",
          filter: "blur(100px)",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[240px] w-[400px] rounded-full opacity-35 md:h-[360px] md:w-[520px] dark:hidden"
        style={{
          background: "rgba(139, 92, 246, 0.1)",
          filter: "blur(110px)",
        }}
      />

      {/* Dark theme blobs */}
      <div
        className="absolute -left-32 -top-32 hidden h-[320px] w-[320px] rounded-full opacity-40 md:h-[600px] md:w-[600px] dark:block"
        style={{
          background: "rgba(109, 40, 217, 0.35)",
          filter: "blur(150px)",
        }}
      />
      <div
        className="absolute -right-24 -top-24 hidden h-[280px] w-[280px] rounded-full opacity-35 md:h-[500px] md:w-[500px] dark:block"
        style={{
          background: "rgba(180, 70, 0, 0.28)",
          filter: "blur(120px)",
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 hidden h-[280px] w-[420px] rounded-full opacity-30 md:h-[400px] md:w-[560px] dark:block"
        style={{
          background: "rgba(139, 92, 246, 0.2)",
          filter: "blur(130px)",
        }}
      />

      {/* Fixed grain + dot texture overlay */}
      <div className="site-texture-overlay absolute inset-0" />
    </div>
  );
}
