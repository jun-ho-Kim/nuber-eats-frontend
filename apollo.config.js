module.exports = {
    client: {
      includes: ["./src/**/*.{tsx,ts}"],
      service: {
          name: "nuber-eats-backend",
          url: "http://localhost:4000/graphql",
      },
    },
  };