export default async function BookPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;
  return <div className="mt-14">{isbn}</div>;
}
