module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
          alias: {
            "@components": "./src/components",
            "@screens": "./src/screens",
            "@assets": "./src/assets",
            "@storage": "./src/storage",
            "@utils": "./src/utils",
            "@theme": "./src/theme",
            "@hooks": "./src/hooks",
            "@routes": "./src/routes",
            "@constants": "./src/constants",
            "@services": "./src/services",
            "@types": "./src/types",
          },
        },
      ],
    ],
  };
};
