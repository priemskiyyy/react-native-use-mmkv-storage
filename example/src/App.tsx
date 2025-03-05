import { useMMKVStorage } from 'react-native-use-mmkv-storage';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [mmkvString, setMmkvString] = useMMKVStorage<string>(
    'example.string',
    ''
  );
  const [mmkvBoolean, setMmkvBoolean] = useMMKVStorage<boolean>(
    'example.boolean',
    false
  );

  const [mmkvNumber, setMmkvNumber] = useMMKVStorage<number>(
    'example.number',
    0
  );

  const [mmkvObject, setMmkvObject] = useMMKVStorage('example.object', {
    nested: {
      property: {
        value: 0,
      },
    },
  });

  const [mmkvArray, setMmkvArray] = useMMKVStorage('example.array', [
    1,
    {},
    false,
    true,
    null,
    NaN,
  ]);

  const [mmkvNull, setMmkvNull] = useMMKVStorage<null | string>(
    'example.null',
    null
  );

  const [mmkvNotANumber, setMmkvNotANumber] = useMMKVStorage<number | string>(
    'example.nan',
    NaN
  );
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          setMmkvString(new Date().toISOString());
        }}
        style={styles.box}
      >
        <Text>MMKV String: {mmkvString}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMmkvBoolean((previous) => !previous);
        }}
        style={styles.box}
      >
        <Text>MMKV Boolean: {mmkvBoolean ? 'true' : 'false'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMmkvNumber((previous) => previous + 1);
        }}
        style={styles.box}
      >
        <Text>MMKV Number: {mmkvNumber}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMmkvObject((previous) => ({
            ...previous,
            nested: {
              ...previous.nested,
              property: {
                ...previous.nested.property,
                value: previous.nested.property.value + 1,
              },
            },
          }));
        }}
        style={styles.box}
      >
        <Text>MMKV Object: {mmkvObject.nested.property.value}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMmkvArray((previous) => [...previous, new Date().toISOString()]);
        }}
        style={styles.box}
      >
        <Text>MMKV Array: {mmkvArray.length}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMmkvNull((previous) => (previous === null ? 'not null' : null));
        }}
        style={styles.box}
      >
        <Text>MMKV Null: {mmkvNull === null ? 'NULL' : 'NOT NULL'}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          setMmkvNotANumber((previous) => (Number.isNaN(previous) ? 1 : NaN));
        }}
        style={styles.box}
      >
        <Text>
          MMKV NaN: {Number.isNaN(mmkvNotANumber) ? 'NAN' : 'NOT NAN'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    paddingHorizontal: 20,
  },
  box: {
    borderWidth: 1,
    width: '100%',
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
});
