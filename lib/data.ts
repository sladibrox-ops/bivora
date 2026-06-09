export type Client = {
  id: string
  name: string
  company: string
  email: string
  status: 'active' | 'lead' | 'inactive'
  revenue: number
  projects: number
}

export type Invoice = {
  id: string
  client: string
  amount: number
  issued: string
  due: string
  status: 'paid' | 'pending' | 'overdue' | 'draft'
}

export type Employee = {
  id: string
  name: string
  role: string
  department: string
  email: string
  status: 'active' | 'on leave' | 'remote'
}

export type Project = {
  id: string
  name: string
  client: string
  progress: number
  status: 'in progress' | 'completed' | 'planning' | 'on hold'
  budget: number
  deadline: string
  team: string[]
}

export type Transaction = {
  id: string
  description: string
  category: string
  amount: number
  date: string
  type: 'income' | 'expense'
}

export const clients: Client[] = [
  { id: 'CL-1042', name: 'Sarah Whitfield', company: 'Northwind Labs', email: 'sarah@northwind.io', status: 'active', revenue: 184000, projects: 4 },
  { id: 'CL-1038', name: 'Daniel Okafor', company: 'Helios Retail', email: 'daniel@helios.co', status: 'active', revenue: 142500, projects: 3 },
  { id: 'CL-1033', name: 'Mei Tanaka', company: 'Orbital Studios', email: 'mei@orbital.design', status: 'lead', revenue: 0, projects: 1 },
  { id: 'CL-1027', name: 'Lucas Bergman', company: 'Vertex Finance', email: 'lucas@vertex.com', status: 'active', revenue: 97800, projects: 2 },
  { id: 'CL-1019', name: 'Aria Castellano', company: 'Bloom Health', email: 'aria@bloom.health', status: 'inactive', revenue: 56200, projects: 1 },
  { id: 'CL-1011', name: 'Omar Haddad', company: 'Quantum Freight', email: 'omar@qfreight.com', status: 'active', revenue: 210400, projects: 5 },
  { id: 'CL-1004', name: 'Priya Nair', company: 'Lumen Media', email: 'priya@lumen.tv', status: 'lead', revenue: 0, projects: 1 },
]

export const invoices: Invoice[] = [
  { id: 'INV-2048', client: 'Northwind Labs', amount: 24500, issued: 'Jun 01', due: 'Jun 15', status: 'paid' },
  { id: 'INV-2047', client: 'Quantum Freight', amount: 41200, issued: 'Jun 02', due: 'Jun 16', status: 'pending' },
  { id: 'INV-2046', client: 'Helios Retail', amount: 18750, issued: 'May 28', due: 'Jun 11', status: 'overdue' },
  { id: 'INV-2045', client: 'Vertex Finance', amount: 32000, issued: 'May 25', due: 'Jun 08', status: 'paid' },
  { id: 'INV-2044', client: 'Bloom Health', amount: 9600, issued: 'May 22', due: 'Jun 05', status: 'pending' },
  { id: 'INV-2043', client: 'Orbital Studios', amount: 14300, issued: 'May 20', due: 'Jun 03', status: 'draft' },
  { id: 'INV-2042', client: 'Lumen Media', amount: 27800, issued: 'May 18', due: 'Jun 01', status: 'overdue' },
]

export const employees: Employee[] = [
  { id: 'EM-301', name: 'Jordan Reyes', role: 'Engineering Lead', department: 'Engineering', email: 'jordan@bivora.com', status: 'active' },
  { id: 'EM-302', name: 'Elena Petrova', role: 'Product Designer', department: 'Design', email: 'elena@bivora.com', status: 'remote' },
  { id: 'EM-303', name: 'Marcus Lee', role: 'Account Manager', department: 'Sales', email: 'marcus@bivora.com', status: 'active' },
  { id: 'EM-304', name: 'Fatima Al-Sayed', role: 'Finance Analyst', department: 'Finance', email: 'fatima@bivora.com', status: 'on leave' },
  { id: 'EM-305', name: 'Tobias Schmidt', role: 'Backend Engineer', department: 'Engineering', email: 'tobias@bivora.com', status: 'remote' },
  { id: 'EM-306', name: 'Naomi Carter', role: 'Marketing Manager', department: 'Marketing', email: 'naomi@bivora.com', status: 'active' },
]

export const projects: Project[] = [
  { id: 'PR-77', name: 'Atlas Platform Redesign', client: 'Northwind Labs', progress: 72, status: 'in progress', budget: 120000, deadline: 'Jul 12', team: ['JR', 'EP', 'TS'] },
  { id: 'PR-76', name: 'Freight Tracking App', client: 'Quantum Freight', progress: 45, status: 'in progress', budget: 88000, deadline: 'Aug 02', team: ['TS', 'ML'] },
  { id: 'PR-75', name: 'Retail Analytics Suite', client: 'Helios Retail', progress: 100, status: 'completed', budget: 64000, deadline: 'May 30', team: ['JR', 'NC'] },
  { id: 'PR-74', name: 'Health Portal MVP', client: 'Bloom Health', progress: 18, status: 'planning', budget: 52000, deadline: 'Sep 15', team: ['EP', 'FA'] },
  { id: 'PR-73', name: 'Payment Gateway Migration', client: 'Vertex Finance', progress: 60, status: 'on hold', budget: 96000, deadline: 'Jul 28', team: ['TS', 'FA', 'JR'] },
]

export const transactions: Transaction[] = [
  { id: 'TX-9001', description: 'Invoice payment — Northwind Labs', category: 'Revenue', amount: 24500, date: 'Jun 14', type: 'income' },
  { id: 'TX-9000', description: 'AWS infrastructure', category: 'Software', amount: 3820, date: 'Jun 13', type: 'expense' },
  { id: 'TX-8999', description: 'Invoice payment — Vertex Finance', category: 'Revenue', amount: 32000, date: 'Jun 08', type: 'income' },
  { id: 'TX-8998', description: 'Payroll — June', category: 'Salaries', amount: 86400, date: 'Jun 05', type: 'expense' },
  { id: 'TX-8997', description: 'Office lease', category: 'Facilities', amount: 7200, date: 'Jun 03', type: 'expense' },
  { id: 'TX-8996', description: 'Invoice payment — Helios Retail', category: 'Revenue', amount: 18750, date: 'Jun 01', type: 'income' },
  { id: 'TX-8995', description: 'Design tooling subscriptions', category: 'Software', amount: 1240, date: 'May 30', type: 'expense' },
]

export const revenueData = [
  { month: 'Jan', revenue: 42000, expenses: 28000 },
  { month: 'Feb', revenue: 51000, expenses: 31000 },
  { month: 'Mar', revenue: 48000, expenses: 29500 },
  { month: 'Apr', revenue: 61000, expenses: 34000 },
  { month: 'May', revenue: 72000, expenses: 38000 },
  { month: 'Jun', revenue: 84000, expenses: 41000 },
]

export const formatCurrency = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n)
