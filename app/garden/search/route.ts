import { NextResponse } from "next/server";
import { search } from "@/lib/book";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const results = await search(q);

  return NextResponse.json(
    { results },
    {
      headers: {
        "cache-control": "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    }
  );
}
