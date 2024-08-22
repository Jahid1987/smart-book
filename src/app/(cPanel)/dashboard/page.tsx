// import { Card } from '@/app/ui/dashboard/cards';
// import RevenueChart from '@/app/ui/dashboard/revenue-chart';
// import LatestInvoices from '@/app/ui/dashboard/latest-invoices';

import { Card } from "@/components/dashboard/Card";
import LatestInvoices from "@/components/dashboard/latest-invoices";
import RevenueChart from "@/components/dashboard/revenue-chart";
import { CRUD } from "@/lib/crud-functions";
import { Revenue } from "@/lib/definitions";
import { getTotalCount } from "@/lib/get-total-count";
import { getLatestInvoices } from "@/lib/latest-invoices";

import { lusitana } from "@/ui/fonts";

export default async function Page() {

  const {getDocs} = CRUD('revenues')
  const docs = await getDocs()

  const revenue: Revenue[] = docs.map(doc => ({
    month: doc.month as string,
    revenue: doc.revenue as number,
  }));

  // latest invoices
  const latestInvoices = await getLatestInvoices();
  
  // card information
  const totalPaidInvoices = await getTotalCount('invoices', {status: 'collected'})
  const totalPendingInvoices = await getTotalCount('invoices', {status: 'pending'})
  const numberOfInvoices = await getTotalCount('invoices')
  const numberOfCustomers = await getTotalCount('users')
  
  const cardData = await Promise.all([
    getTotalCount('invoices', {status: 'collected'}),
    getTotalCount('invoices', {status: 'pending'}),
    getTotalCount('invoices'),
    getTotalCount('users'),
  ])
  console.log(cardData)
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" />
        <Card title="Pending" value={totalPendingInvoices} type="pending" />
        <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
        <Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue}  />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}