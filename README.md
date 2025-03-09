# react-native-use-mmkv-storage

A React hook for managing storage using MMKV.

## Installation

```sh
npm install react-native-use-mmkv-storage
```

## Usage

```js
import useMMKVStorage from 'react-native-use-mmkv-storage';

const [value, setValue] = useMMKVStorage('userToken', '');

setValue('newToken');
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
