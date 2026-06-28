import { NextResponse } from "next/server";
import { Snap } from "midtrans-client";
import { prisma } from "@/lib/prisma";

let snap = new Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export async function POST(req: Request) {
  const { userId, total, customerDetails } = await req.json(); // Data detail dari frontend

  try {
    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "PENDING",
        // Field wajib berdasarkan error prisma Anda:
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        phone: customerDetails.phone,
        address: customerDetails.address,
        paymentMethod: "MIDTRANS",
      },
    });

    const parameter = {
      transaction_details: {
        order_id: order.id,
        gross_amount: total,
      },
      customer_details: customerDetails,
      credit_card: { secure: true },
    };

    const transaction = await snap.createTransaction(parameter);
    return NextResponse.json({ token: transaction.token });
  } catch (error) {
    return NextResponse.json({ message: "Gagal" }, { status: 500 });
  }
}