// src/app/profile/orders/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-muted-foreground">Silakan login untuk melihat pesanan Anda.</p>
      </div>
    );
  }

  const myOrders = await prisma.order.findMany({
    where: { userId: (session.user as any).id },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Riwayat Pesanan</h1>
      {myOrders.length === 0 ? (
        <p className="text-muted-foreground">Anda belum memiliki riwayat pesanan.</p>
      ) : (
        <div className="grid gap-4">
          {myOrders.map((order) => (
            <div key={order.id} className="p-4 border rounded-lg bg-card shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-sm text-muted-foreground">ID Pesanan: {order.id}</p>
                {/* DIPERBAIKI: Menggunakan order.total */}
                <p className="text-lg font-bold mt-1">Rp {order.total.toLocaleString('id-ID')}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {/* DIPERBAIKI: Menggunakan order.status */}
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {order.status}
                </span>
                <span className="text-xs text-muted-foreground">
                  {new Date(order.createdAt).toLocaleDateString('id-ID')}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}