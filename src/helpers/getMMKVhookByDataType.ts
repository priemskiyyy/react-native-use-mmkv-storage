import {
  useMMKVBoolean,
  useMMKVNumber,
  useMMKVObject,
} from 'react-native-mmkv';

type MMKVHook<T> = T extends boolean
  ? typeof useMMKVBoolean
  : T extends number
    ? typeof useMMKVNumber
    : typeof useMMKVObject;

const getMMKVhookByDataType = <
  T extends string | number | object | undefined | boolean | null,
>(
  defaultValue: T
): MMKVHook<T> => {
  if (typeof defaultValue === 'boolean') {
    return useMMKVBoolean as MMKVHook<T>;
  }

  if (typeof defaultValue === 'number') {
    return useMMKVNumber as MMKVHook<T>;
  }

  return useMMKVObject as MMKVHook<T>;
};

export default getMMKVhookByDataType;
