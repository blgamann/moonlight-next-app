export interface BookSearchResponse {
  lastBuildDate: string;
  total: number;
  start: number;
  display: number;
  items: BookItem[];
}

export interface BookItem {
  title: string;
  link: string;
  image: string;
  author: string;
  discount: string;
  publisher: string;
  pubdate: string; // "YYYYMMDD"
  isbn: string;
  description: string;
}

export async function search(query: string): Promise<BookItem[]> {
  if (!query) return [];
  const res = await fetch(
    `https://book-server-roan.vercel.app/books/${encodeURIComponent(query)}`,
    { next: { revalidate: 86400 } } // 24 hours cache
  );
  if (!res.ok) {
    console.error("Book API Error:", res.status, await res.text());
    throw new Error("Book search failed");
  }
  const json = (await res.json()) as BookSearchResponse;
  return json.items;
}
