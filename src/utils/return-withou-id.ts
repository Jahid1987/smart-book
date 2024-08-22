export function getDocsWithoutObjectIds(docs: any) {
  const docsModified = docs
    .map((item: {}) => {
      return { ...item, id: item._id.toString() };
    })
    .map(({ _id, ...rest }) => rest);

  return docsModified;
}
