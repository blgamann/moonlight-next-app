export default async function BookPage({
  params,
}: {
  params: Promise<{ isbn: string }>;
}) {
  const { isbn } = await params;
  return <div>{isbn}</div>;
}
