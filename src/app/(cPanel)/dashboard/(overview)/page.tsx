// import { Card } from '@/app/ui/dashboard/cards';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

import { Card } from "@/components/dashboard/Card";
import LatestInvoices from "@/components/dashboard/latest-invoices";
import RevenueChart from "@/components/dashboard/revenue-chart";
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/components/skeletons";

import { getTotalCount } from "@/lib/get-total-count";

import { lusitana } from "@/ui/fonts";
import { Suspense } from "react";

export default async function Page() {

  // card information
  const totalPaidInvoices = await getTotalCount('invoices', {status: 'collected'})
  const totalPendingInvoices = await getTotalCount('invoices', {status: 'pending'})
  const numberOfInvoices = await getTotalCount('invoices')
  const numberOfCustomers = await getTotalCount('users')
  
  // const cardData = await Promise.all([
  //   getTotalCount('invoices', {status: 'collected'}),
  //   getTotalCount('invoices', {status: 'pending'}),
  //   getTotalCount('invoices'),
  //   getTotalCount('users'),
  // ])
  // console.log(cardData)

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card key='collected' title="Collected" value={totalPaidInvoices} type="collected" />
        <Card key='pending' title="Pending" value={totalPendingInvoices} type="pending" />
        <Card key='total-invoices' title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card key='total-user'
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}><RevenueChart /></Suspense>
        <Suspense fallback={<LatestInvoicesSkeleton />}><LatestInvoices /></Suspense>
      </div>
    </main>
  );
}