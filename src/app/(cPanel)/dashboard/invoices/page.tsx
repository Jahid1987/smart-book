// import Pagination from '@/app/ui/invoices/pagination';

import { Suspense } from 'react';
import { lusitana } from '@/ui/fonts';
import { CreateInvoice } from '@/components/invoices/buttons';
import Search from '@/components/search';
import { InvoicesTableSkeleton } from '@/components/skeletons';
 import InvoicesTable from '@/components/invoices/InvoiceTable';
export default async function Page({searchParams}: {searchParams?:{
  query?: string,
  page?: string
}}) {

  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <InvoicesTable query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </div>
  );
}