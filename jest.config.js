module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
  },
  testURL: "http://localhost",
  setupFilesAfterEnv: ["./setupAfterEnv.ts"],
};
