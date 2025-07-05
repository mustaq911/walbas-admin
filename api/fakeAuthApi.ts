// fakeAuthApi.ts
// import { delay } from "@/utils/delay"; // Utility to simulate network delay

// Mock user database
const mockUsers = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user", password: "user123", role: "user" },
];

// Simulated token generator
const generateMockToken = () => {
  return `mock-jwt-${Math.random().toString(36).substr(2, 9)}`;
};

export const fakeAuthApi = {
  login: async (data: { username: string; password: string }) => {
    // Simulate network delay
    await delay(1000);

    // Find user in mock database
    const user = mockUsers.find(
      (u) => u.username === data.username && u.password === data.password
    );

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Simulate successful login response
    return {
      data: {
        token: generateMockToken(),
        user: {
          username: user.username,
          role: user.role,
        },
      },
      status: 200,
    };
  },

  logout: async () => {
    // Simulate network delay
    await delay(500);

    // Simulate successful logout response
    return {
      data: {
        message: "Logged out successfully",
      },
      status: 200,
    };
  },
};

// delay.ts (utility file)
export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));