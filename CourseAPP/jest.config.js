module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    // Permite transformar estos módulos de node_modules
    "node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|@expo|expo(nent)?|@unimodules|unimodules|@react-native-community|@testing-library)/"
  ],
};
