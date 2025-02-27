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
  P0: { label: "High", color: "red" },
  P1: { label: "Medium", color: "#2563EB" },
  P2: { label: "Low", color: "green" },
} as const;
export const userDataList: DataRow[] = [
  {
    id: "123",
    proposer_name: "Amit Sharma",
    priority: "P0",
    assignee: "user_1",
    type: "proposal",
    created_at: "2023-12-01",
    updated_at: "2023-12-10",
    status: "open",
    calculated_priority: 150,
    business_entity: {},
  },
  {
    id: "124",
    proposer_name: "Priya Singh",
    priority: "P1",
    assignee: "user_2",
    type: "proposal",
    created_at: "2023-11-01",
    updated_at: "2023-11-10",
    status: "closed",
    calculated_priority: 100,
    business_entity: {},
  },
  {
    id: "125",
    proposer_name: "Rahul Verma",
    priority: "P2",
    assignee: "user_3",
    type: "proposal",
    created_at: "2023-10-01",
    updated_at: "2023-10-10",
    status: "in_progress",
    calculated_priority: 200,
    business_entity: {},
  },
  {
    id: "126",
    proposer_name: "Sanjay Kumar",
    priority: "P1",
    assignee: "user_1",
    type: "proposal",
    created_at: "2023-09-01",
    updated_at: "2023-09-10",
    status: "open",
    calculated_priority: 120,
    business_entity: {},
  },
  {
    id: "127",
    proposer_name: "Anita Desai",
    priority: "P0",
    assignee: "user_2",
    type: "proposal",
    created_at: "2023-08-01",
    updated_at: "2023-08-10",
    status: "closed",
    calculated_priority: 180,
    business_entity: {},
  },
  {
    id: "128",
    proposer_name: "Vikram Singh",
    priority: "P2",
    assignee: "user_3",
    type: "proposal",
    created_at: "2023-07-01",
    updated_at: "2023-07-10",
    status: "in_progress",
    calculated_priority: 90,
    business_entity: {},
  },
  {
    id: "129",
    proposer_name: "Rohit Sharma",
    priority: "P1",
    assignee: "user_1",
    type: "proposal",
    created_at: "2023-06-01",
    updated_at: "2023-06-10",
    status: "open",
    calculated_priority: 160,
    business_entity: {},
  },
  {
    id: "130",
    proposer_name: "Neha Gupta",
    priority: "P0",
    assignee: "user_2",
    type: "proposal",
    created_at: "2023-05-01",
    updated_at: "2023-05-10",
    status: "closed",
    calculated_priority: 140,
    business_entity: {},
  },
  // Add more data objects as needed
];
