// Types
export type Transaction = {
  id: string;
  from: string;
  to: string;
  amount: number;
  timestamp: string;
  riskScore: number;
  flags: string[];
  planet: string;
  category: string;
};

// Mock transaction data
export const mockTransactions: Transaction[] = [
  {
    id: "TX001",
    from: "Jabba's Palace Holdings",
    to: "Cloud City Enterprises",
    amount: 1250000,
    timestamp: "2024-12-15T14:30:00Z",
    riskScore: 95,
    flags: ["High Amount", "Suspicious Pattern", "Known Entity"],
    planet: "Tatooine → Bespin",
    category: "Spice Trade"
  },
  {
    id: "TX002", 
    from: "Imperial Mining Corp",
    to: "Outer Rim Logistics",
    amount: 750000,
    timestamp: "2024-12-15T13:45:00Z",
    riskScore: 78,
    flags: ["Cross-Border", "Shell Company"],
    planet: "Kessel → Ryloth",
    category: "Resource Export"
  },
  {
    id: "TX003",
    from: "Coruscant Bank",
    to: "Anonymous Wallet 7X9",
    amount: 2100000,
    timestamp: "2024-12-15T12:20:00Z",
    riskScore: 92,
    flags: ["Anonymous Recipient", "Large Sum", "Time Anomaly"],
    planet: "Coruscant → Unknown",
    category: "Unknown"
  },
  {
    id: "TX004",
    from: "Mandalorian Contractors",
    to: "Kaminoan Research Lab",
    amount: 450000,
    timestamp: "2024-12-15T11:15:00Z",
    riskScore: 34,
    flags: ["Legitimate Contract"],
    planet: "Mandalore → Kamino",
    category: "Defense Contract"
  },
  {
    id: "TX005",
    from: "Mos Eisley Cantina",
    to: "Smugglers Alliance",
    amount: 125000,
    timestamp: "2024-12-15T10:30:00Z",
    riskScore: 87,
    flags: ["Known Criminal Network", "Small Frequent Transfers"],
    planet: "Tatooine → Multiple",
    category: "Illegal Services"
  },
  {
    id: "TX006",
    from: "Death Star Construction",
    to: "Geonosis Industries",
    amount: 5000000,
    timestamp: "2024-12-15T09:15:00Z",
    riskScore: 91,
    flags: ["Military Contract", "Classified Project", "High Amount"],
    planet: "Coruscant → Geonosis",
    category: "Imperial Contract"
  },
  {
    id: "TX007",
    from: "Hoth Rebel Base",
    to: "Mon Calamari Shipyards",
    amount: 875000,
    timestamp: "2024-12-15T08:45:00Z",
    riskScore: 73,
    flags: ["Rebel Activity", "Military Equipment"],
    planet: "Hoth → Mon Cala",
    category: "Rebel Operations"
  },
  {
    id: "TX008",
    from: "Tatooine Moisture Farm",
    to: "Jawa Traders Collective",
    amount: 25000,
    timestamp: "2024-12-15T07:30:00Z",
    riskScore: 12,
    flags: ["Legitimate Trade"],
    planet: "Tatooine → Tatooine",
    category: "Agricultural"
  },
  {
    id: "TX009",
    from: "Bespin Mining Guild",
    to: "Coruscant Credit Union",
    amount: 1800000,
    timestamp: "2024-12-15T06:20:00Z",
    riskScore: 56,
    flags: ["Large Sum", "Corporate Transfer"],
    planet: "Bespin → Coruscant",
    category: "Mining Operations"
  },
  {
    id: "TX010",
    from: "Alderaan Royal Treasury",
    to: "Rebel Alliance Fund",
    amount: 3200000,
    timestamp: "2024-12-15T05:10:00Z",
    riskScore: 88,
    flags: ["Political Transfer", "High Amount", "Rebel Connection"],
    planet: "Alderaan → Unknown",
    category: "Political"
  }
];

// Helper function to get transaction by ID
export const getTransactionById = (id: string): Transaction | undefined => {
  return mockTransactions.find(transaction => transaction.id.toLowerCase() === id.toLowerCase());
};

// Helper function to get all transaction IDs
export const getTransactionIds = (): string[] => {
  return mockTransactions.map(transaction => transaction.id);
};
