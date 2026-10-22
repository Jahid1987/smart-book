export type ContentNode = {
  id: number;
  parent_id: number | null;
  sort_order: number;
  serial: string | number;
  title: string;
  importance?: string | null;
};

export type Chapter = {
  id: number;
  serial: number | string;
  title: string;
  sort_order: number;
  content_nodes: ContentNode[];
};
