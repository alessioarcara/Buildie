module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@screens": "./screens",
            "@components": "./components",
            "@store": "./store",
            "@hooks": "./hooks",
            "@constants": "./constants",
            "@config": "./config",
            "@assets": "./assets",
            "@models": "./models",
          },
        },
      ],
    ],
  };
};
