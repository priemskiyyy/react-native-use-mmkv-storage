import React, { type SetStateAction, useCallback, useMemo } from 'react';
import { type Configuration, useMMKV } from 'react-native-mmkv';
import getMMKVhookByDataType from '../helpers/getMMKVhookByDataType';
import getTypedResolvedValue from '../helpers/getTypedResolvedValue';

/**
 * React hook for managing storage using react-native-mmkv library.
 *
 * @template T - The type of the stored value, which can be string, number, object, undefined, boolean, or null.
 *
 * @param {string} key - The storage key.
 * @param {T} defaultValue - The default value to use if no stored value exists.
 * @param {Configuration} [configuration] - Optional MMKV configuration.
 *
 * @returns {[T, React.Dispatch<SetStateAction<T>>]} A tuple containing the stored value and a setter function.
 *
 * @example
 * const [token, setToken] = useMMKVStorage('token', 'not a cool token');
 *
 * setToken('my cool token');
 */

const useMMKVStorage = <
  T extends string | number | object | undefined | boolean | null,
>(
  key: string,
  defaultValue: T,
  configuration?: Configuration
): [T, React.Dispatch<SetStateAction<T>>] => {
  const storage = useMMKV({
    id: key,
    ...(configuration ?? {}),
  });

  const hook = useMemo(
    () => getMMKVhookByDataType(defaultValue),
    [defaultValue]
  );

  const [_value, _setValue] = hook(key, storage);

  const value = useMemo(
    () => getTypedResolvedValue<T>(_value, defaultValue),
    [_value, defaultValue]
  );

  const setValue = useCallback(
    (action: SetStateAction<T>) => {
      _setValue((previousValue: typeof _value) => {
        return typeof action === 'function'
          ? action(getTypedResolvedValue<T>(previousValue, defaultValue))
          : action;
      });
    },
    [_setValue, defaultValue]
  );

  return [value, setValue];
};

export default useMMKVStorage;
