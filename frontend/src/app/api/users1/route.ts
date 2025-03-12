import { type NextRequest, NextResponse } from 'next/server';
import type { UsersRequest, UsersResponse, User } from '@/types/users';

// Mock data for demonstration
const mockUsers: User[] = [
  {
    username: 'johndoe',
    email: 'john.doe@example.com',
    password: 'password123',
    first_name: 'John',
    last_name: 'Doe',
    group: 'Admin',
    active: true,
  },
  {
    username: 'janedoe',
    email: 'jane.doe@example.com',
    password: 'password123',
    first_name: 'Jane',
    last_name: 'Doe',
    group: 'User',
    active: true,
  },
  {
    username: 'bobsmith',
    email: 'bob.smith@example.com',
    password: 'password123',
    first_name: 'Bob',
    last_name: 'Smith',
    group: 'User',
    active: false,
  },
  {
    username: 'alicejones',
    email: 'alice.jones@example.com',
    password: 'password123',
    first_name: 'Alice',
    last_name: 'Jones',
    group: 'Manager',
    active: true,
  },
  {
    username: 'mikebrown',
    email: 'mike.brown@example.com',
    password: 'password123',
    first_name: 'Mike',
    last_name: 'Brown',
    group: 'User',
    active: true,
  },
  {
    username: 'sarahwilson',
    email: 'sarah.wilson@example.com',
    password: 'password123',
    first_name: 'Sarah',
    last_name: 'Wilson',
    group: 'User',
    active: false,
  },
  {
    username: 'davidlee',
    email: 'david.lee@example.com',
    password: 'password123',
    first_name: 'David',
    last_name: 'Lee',
    group: 'Admin',
    active: true,
  },
  {
    username: 'emilyclark',
    email: 'emily.clark@example.com',
    password: 'password123',
    first_name: 'Emily',
    last_name: 'Clark',
    group: 'Manager',
    active: true,
  },
  {
    username: 'michaelwhite',
    email: 'michael.white@example.com',
    password: 'password123',
    first_name: 'Michael',
    last_name: 'White',
    group: 'User',
    active: false,
  },
  {
    username: 'oliviagreen',
    email: 'olivia.green@example.com',
    password: 'password123',
    first_name: 'Olivia',
    last_name: 'Green',
    group: 'User',
    active: true,
  },
  {
    username: 'williamtaylor',
    email: 'william.taylor@example.com',
    password: 'password123',
    first_name: 'William',
    last_name: 'Taylor',
    group: 'Admin',
    active: true,
  },
  {
    username: 'sophiabrown',
    email: 'sophia.brown@example.com',
    password: 'password123',
    first_name: 'Sophia',
    last_name: 'Brown',
    group: 'User',
    active: true,
  },
];

export async function POST(request: NextRequest) {
  const body: UsersRequest = await request.json();

  // Extract request parameters
  const { filters, searchableFields, sort, searchStr, pageNo, pageSize } = body;

  // Apply filters
  let filteredUsers = [...mockUsers];

  // Apply search
  if (searchStr) {
    const searchLower = searchStr.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.username.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.first_name.toLowerCase().includes(searchLower) ||
        user.last_name.toLowerCase().includes(searchLower) ||
        user.group.toLowerCase().includes(searchLower),
    );
  }

  // Apply specific filters if any are selected
  if (filters && filters.length > 0) {
    filters.forEach((filter) => {
      const selectedOptions = filter.options
        .filter((option) => option.is_selected)
        .map((option) => option.value);

      if (selectedOptions.length > 0) {
        filteredUsers = filteredUsers.filter((user) => {
          const userValue = user[filter.fieldName as keyof User];
          if (typeof userValue === 'boolean') {
            // Handle boolean fields (like 'active')
            return selectedOptions.includes(userValue.toString());
          }
          return selectedOptions.includes(userValue as string);
        });
      }
    });
  }

  // Apply sorting
  if (sort && sort.field) {
    filteredUsers.sort((a, b) => {
      const aValue = a[sort.field as keyof User];
      const bValue = b[sort.field as keyof User];

      if (typeof aValue === 'boolean') {
        return sort.direction === 'asc'
          ? aValue === bValue
            ? 0
            : aValue
            ? 1
            : -1
          : aValue === bValue
          ? 0
          : aValue
          ? -1
          : 1;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });
  }

  // Calculate pagination
  const totalCount = filteredUsers.length;
  const startIndex = (pageNo - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + pageSize);

  // Generate filter options based on current data
  const generatedFilters = [
    {
      fieldDisplayName: 'Group',
      fieldName: 'group',
      fieldType: 'string',
      options: Array.from(new Set(mockUsers.map((user) => user.group))).map(
        (group) => ({
          value: group,
          count: mockUsers.filter((user) => user.group === group).length,
          is_selected:
            filters
              ?.find((f) => f.fieldName === 'group')
              ?.options.find((o) => o.value === group)?.is_selected || false,
        }),
      ),
    },
    {
      fieldDisplayName: 'Status',
      fieldName: 'active',
      fieldType: 'string',
      options: [
        {
          value: 'true',
          count: mockUsers.filter((user) => user.active).length,
          is_selected:
            filters
              ?.find((f) => f.fieldName === 'active')
              ?.options.find((o) => o.value === 'true')?.is_selected || false,
        },
        {
          value: 'false',
          count: mockUsers.filter((user) => !user.active).length,
          is_selected:
            filters
              ?.find((f) => f.fieldName === 'active')
              ?.options.find((o) => o.value === 'false')?.is_selected || false,
        },
      ],
    },
  ];

  // Generate searchable fields
  const generatedSearchableFields = [
    {
      fieldDisplayName: 'Username',
      fieldName: 'username',
      fieldType: 'text',
      value: null,
    },
    {
      fieldDisplayName: 'Email',
      fieldName: 'email',
      fieldType: 'text',
      value: null,
    },
    {
      fieldDisplayName: 'First Name',
      fieldName: 'first_name',
      fieldType: 'text',
      value: null,
    },
    {
      fieldDisplayName: 'Last Name',
      fieldName: 'last_name',
      fieldType: 'text',
      value: null,
    },
  ];

  // Construct response
  const response: UsersResponse = {
    searchableFields: searchableFields || generatedSearchableFields,
    filters: generatedFilters,
    sort,
    searchStr,
    result: paginatedUsers,
    totalCount: totalCount,
    pageNo,
    pageSize,
  };
  return NextResponse.json(response);
}
