import { LatestInvoice } from "@/lib/definitions";

export function getDocsWithoutObjectIds(docs: LatestInvoice[]) {
  console.log(docs)
  const docsModified = docs
    .map((item) => {
      return { ...item, id: item._id.toString() };
    })
    .map(({ _id, ...rest }) => rest);

  return docsModified;
}
