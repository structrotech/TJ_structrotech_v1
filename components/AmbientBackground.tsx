"use client";

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Purple blob top-left */}
      <div
        className="absolute -top-32 -left-32 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full opacity-30"
        style={{
          background: "rgba(109, 40, 217, 0.3)",
          filter: "blur(150px)",
        }}
      />
      {/* Orange blob top-right */}
      <div
        className="absolute -top-24 -right-24 w-[250px] h-[250px] md:w-[500px] md:h-[500px] rounded-full opacity-25"
        style={{
          background: "rgba(180, 70, 0, 0.25)",
          filter: "blur(120px)",
        }}
      />
    </div>
  );
}
