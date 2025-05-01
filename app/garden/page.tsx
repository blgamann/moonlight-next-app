import GardenClient from "./client";

export const revalidate = 86400; // 24 hours cache

type SearchParams = Promise<{ q?: string }>;

export default async function GardenPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const initialQuery = resolvedSearchParams.q || "";

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
