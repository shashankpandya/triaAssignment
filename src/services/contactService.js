// Contact API Service with mock implementation
// Ready for real API integration

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
const API_DELAY = 500; // Simulate network delay

// Mock data store
let mockContacts = [
  {
    id: "1",
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY 10001",
    title: "Product Manager",
    company: "Northwind Labs",
    website: "https://northwindlabs.example",
    notes: "Focuses on partnerships and beta customer feedback.",
    avatar: "https://i.pravatar.cc/160?img=1",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "2",
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    title: "Software Engineer",
    company: "StellarAI",
    website: "https://stellarai.example",
    notes: "Primary contact for API conversations.",
    avatar: "https://i.pravatar.cc/160?img=2",
    createdAt: new Date("2024-02-20").toISOString(),
    updatedAt: new Date("2024-02-20").toISOString(),
  },
  {
    id: "3",
    name: "Carol Williams",
    email: "carol.williams@example.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine Rd, Chicago, IL 60601",
    title: "Designer",
    company: "Lumen Studio",
    website: "https://lumenstudio.example",
    notes: "Collaborated on the brand refresh project.",
    avatar: "https://i.pravatar.cc/160?img=3",
    createdAt: new Date("2024-03-10").toISOString(),
    updatedAt: new Date("2024-03-10").toISOString(),
  },
];

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Error class for API errors
export class APIError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = "APIError";
    this.status = status;
    this.details = details;
  }
}

// GET /contacts - Fetch all contacts with optional filters
export async function getContacts(filters = {}) {
  await delay(API_DELAY);

  try {
    let filtered = [...mockContacts];

    // Apply filters
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter((contact) =>
        Object.values(contact).some((value) =>
          String(value).toLowerCase().includes(searchLower)
        )
      );
    }

    if (filters.company) {
      filtered = filtered.filter((contact) =>
        contact.company?.toLowerCase().includes(filters.company.toLowerCase())
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      filtered.sort((a, b) => {
        const aVal = a[filters.sortBy] || "";
        const bVal = b[filters.sortBy] || "";
        const comparison = aVal.localeCompare(bVal);
        return filters.sortOrder === "desc" ? -comparison : comparison;
      });
    }

    return {
      data: filtered,
      total: filtered.length,
      page: filters.page || 1,
      pageSize: filters.pageSize || filtered.length,
    };
  } catch (error) {
    throw new APIError("Failed to fetch contacts", 500, error.message);
  }
}

// GET /contacts/:id - Fetch single contact
export async function getContact(id) {
  await delay(API_DELAY);

  const contact = mockContacts.find((c) => c.id === id);
  if (!contact) {
    throw new APIError("Contact not found", 404);
  }

  return { data: contact };
}

// POST /contacts - Create new contact
export async function createContact(contactData) {
  await delay(API_DELAY);

  // Validate required fields
  if (!contactData.name || !contactData.email) {
    throw new APIError("Name and email are required", 400);
  }

  const newContact = {
    id: String(Date.now()),
    ...contactData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  mockContacts.push(newContact);

  return { data: newContact };
}

// PUT /contacts/:id - Update contact
export async function updateContact(id, updates) {
  await delay(API_DELAY);

  const index = mockContacts.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new APIError("Contact not found", 404);
  }

  mockContacts[index] = {
    ...mockContacts[index],
    ...updates,
    id, // Ensure ID doesn't change
    updatedAt: new Date().toISOString(),
  };

  return { data: mockContacts[index] };
}

// DELETE /contacts/:id - Delete contact
export async function deleteContact(id) {
  await delay(API_DELAY);

  const index = mockContacts.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new APIError("Contact not found", 404);
  }

  mockContacts.splice(index, 1);

  return { success: true };
}

// DELETE /contacts/bulk - Delete multiple contacts
export async function deleteContacts(ids) {
  await delay(API_DELAY);

  const deleted = [];
  const notFound = [];

  ids.forEach((id) => {
    const index = mockContacts.findIndex((c) => c.id === id);
    if (index !== -1) {
      deleted.push(mockContacts[index]);
      mockContacts.splice(index, 1);
    } else {
      notFound.push(id);
    }
  });

  return {
    success: true,
    deleted: deleted.length,
    notFound,
  };
}

// POST /contacts/import - Import contacts from CSV
export async function importContacts(contacts) {
  await delay(API_DELAY);

  const imported = [];
  const errors = [];

  contacts.forEach((contact, index) => {
    try {
      if (!contact.name || !contact.email) {
        throw new Error("Name and email are required");
      }

      const newContact = {
        id: String(Date.now() + index),
        ...contact,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      mockContacts.push(newContact);
      imported.push(newContact);
    } catch (error) {
      errors.push({ row: index + 1, error: error.message });
    }
  });

  return {
    imported: imported.length,
    errors,
    data: imported,
  };
}

// Export contacts to CSV format
export async function exportContacts(ids = null) {
  await delay(API_DELAY);

  const contactsToExport = ids
    ? mockContacts.filter((c) => ids.includes(c.id))
    : mockContacts;

  return { data: contactsToExport };
}

// Health check
export async function healthCheck() {
  await delay(100);
  return { status: "ok", timestamp: new Date().toISOString() };
}
