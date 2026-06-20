export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="p-10">
      <h1>Test Route</h1>
      <p>ID: {id}</p>
    </main>
  );
}