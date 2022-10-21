module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: [
          '.ios.ts',
          '.android.ts',
          '.ts',
          '.ios.tsx',
          '.android.tsx',
          '.tsx',
          '.jsx',
          '.js',
          '.json',
        ],
        alias: {
          '@Screen': './src/Components/Screen',
          '@Wrapper': './src/Components/Wrapper',
          '@Utils': './src/Utills',
          '@src': "./src",
          '@redux': "./src/redux"
        },
      },
    ],
  ],
};
