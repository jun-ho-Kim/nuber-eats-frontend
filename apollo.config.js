module.exports = {
    client: {
      includes: ["./src/**/*.tsx"],
      service: {
          name: "nuber-eats-backend",
          url: "http://localhost:4000/graphql",
      },
    },
  };