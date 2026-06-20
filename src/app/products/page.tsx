import { prisma } from "@/lib/prisma";

export default async function ProductDetail({
  params,
}: any) {
  const resolved =
    typeof params?.then === "function"
      ? await params
      : params;

  const id = String(resolved.id);

  const dbId = String(
    (await prisma.product.findMany())[0].id
  );

  return (
    <pre>
      {JSON.stringify(
        {
          routeId: id,
          dbId,

          routeCodes: [...id].map((c) =>
            c.charCodeAt(0)
          ),

          dbCodes: [...dbId].map((c) =>
            c.charCodeAt(0)
          ),

          equal: id === dbId,
        },
        null,
        2
      )}
    </pre>
  );
}