import {
  DollarSign,
  Package,
  ShoppingBag,
  Users,
} from "lucide-react";

import Sidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";
import StatsCard from "@/components/dashboard/stats-card";
import SalesChart from "@/components/dashboard/sales-chart";


const stats = [
  {
    title: "Revenue",
    value: "Rp 24.500.000",
    icon: DollarSign,
  },
  {
    title: "Orders",
    value: "342",
    icon: ShoppingBag,
  },
  {
    title: "Customers",
    value: "128",
    icon: Users,
  },
  {
    title: "Products",
    value: "48",
    icon: Package,
  },
];

export default function SellerPage() {
  return (
    <main className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <section className="flex-1 p-6 pt-20 lg:p-8">
        <DashboardHeader />

        {/* Quick Actions */}
        <div className="mb-8 flex flex-wrap gap-4">
          <button className="rounded-2xl bg-black px-5 py-3 text-white transition hover:opacity-90">
            + Add Product
          </button>

          <button className="rounded-2xl border bg-white px-5 py-3 transition hover:bg-slate-100">
            Export Report
          </button>

          <button className="rounded-2xl border bg-white px-5 py-3 transition hover:bg-slate-100">
            View Orders
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <StatsCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </div>

        {/* Analytics */}
        <div className="mt-8">
          <SalesChart />
        </div>

        {/* Product Management */}
        <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold">
              Product Management
            </h2>

            <button className="rounded-xl bg-black px-4 py-2 text-white">
              Add Product
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4">Stock</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-4 font-medium">
                    Nike Air Max
                  </td>
                  <td>Rp 1.200.000</td>
                  <td>120</td>
                  <td>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm">
                      Active
                    </span>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-4 font-medium">
                    Smart Watch
                  </td>
                  <td>Rp 1.599.000</td>
                  <td>56</td>
                  <td>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm">
                      Active
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4 font-medium">
                    Gaming Mouse
                  </td>
                  <td>Rp 499.000</td>
                  <td>20</td>
                  <td>
                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm">
                      Low Stock
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="mt-8 rounded-3xl border bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold">
            Recent Orders
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="pb-4">Order</th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Product</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b">
                  <td className="py-4">#ORD-1001</td>
                  <td>John Doe</td>
                  <td>Nike Air Max</td>
                  <td>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm">
                      Delivered
                    </span>
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-4">#ORD-1002</td>
                  <td>Jane Smith</td>
                  <td>Smart Watch</td>
                  <td>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm">
                      Processing
                    </span>
                  </td>
                </tr>

                <tr>
                  <td className="py-4">#ORD-1003</td>
                  <td>Michael Lee</td>
                  <td>Gaming Mouse</td>
                  <td>
                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm">
                      Shipped
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>
  );
}