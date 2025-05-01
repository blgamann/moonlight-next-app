import GardenClient from "./client";

export const revalidate = 86400; // 24 hours cache

export default function GardenPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const initialQuery = searchParams.q || "";

  return (
    <div
      className="
        flex flex-col
        h-[calc(100vh-3.5rem)]
        max-w-[700px] mx-auto px-8
      "
    >
      <GardenClient initialQuery={initialQuery} />
    </div>
  );
}
