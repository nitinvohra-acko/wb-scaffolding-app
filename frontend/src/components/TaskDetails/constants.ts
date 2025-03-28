export type DataRow = {
  id: string;
  proposer_name: string;
  priority: keyof typeof priorityOptions;
  assignee: string;
  type: string;
  created_at: string;
  updated_at: string;
  status: string;
  calculated_priority: number;
  business_entity: Record<string, unknown>;
};
const priorityOptions = {
  P0: { label: 'High', color: 'red' },
  P1: { label: 'Medium', color: '#2563EB' },
  P2: { label: 'Low', color: 'green' },
} as const;
