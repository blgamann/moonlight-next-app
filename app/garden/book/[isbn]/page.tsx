export default async function BookPage({
  params,
}: {
  params: { isbn: string };
}) {
  return <div>{params.isbn}</div>;
}
