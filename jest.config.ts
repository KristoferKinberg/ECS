export default {
  preset: "ts-jest",
  testEnvironment: "node",  // Använd "jsdom" om du testar React
  testMatch: ["**/__tests__/**/*.test.ts"], // Sökväg för testfiler
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  globals: {
    "ts-jest": {
      isolatedModules: true, // Snabbar upp testning
    },
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};