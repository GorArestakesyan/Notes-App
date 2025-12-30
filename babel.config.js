module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    '@babel/plugin-transform-export-namespace-from',
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@ui-kit': './src/ui-kit',
          '@ui-modules': './src/ui-modules',
          '@screens': './src/screens',
          '@hooks': './src/hooks',
          '@services': './src/services',
          '@contexts': './src/contexts',
          '@config': './src/config',
          '@types': './src/types',
          '@constants': './src/constants',
          '@navigation': './src/navigation',
          '@utils': './src/utils',
          '@schemas': './src/schemas',
        },
      },
    ],
  ],
};
