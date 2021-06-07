module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["next/babel"],
    plugins: [
      // ["inline-dotenv", { path: ".env" }],
      "superjson-next",
      [
        "module-resolver",
        {
          extensions: [
            ".ios.ts",
            ".android.ts",
            ".ts",
            ".ios.tsx",
            ".android.tsx",
            ".tsx",
            ".jsx",
            ".js",
            ".json",
          ],
          root: ["."],
          alias: {
            "@components": "./@components",
            "@hooks": "./@hooks",
            lib: "./lib",
            components: "./components",
            sockets: "./sockets",
          },
        },
      ],
    ],
  };
};
