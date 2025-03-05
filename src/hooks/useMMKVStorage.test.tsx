import { act, renderHook } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';
import useMMKVStorage from './useMMKVStorage';

let mockMMKV: jest.Mocked<MMKV> = new MMKV() as jest.Mocked<MMKV>;

beforeEach(() => {
  mockMMKV = new MMKV() as jest.Mocked<MMKV>;
  mockMMKV.clearAll();
  mockMMKV.trim();
});

describe('useMMKVStorage', () => {
  it('should initialize state from MMKV storage', () => {
    const key = 'test-key';

    const { result, rerender } = renderHook(() =>
      useMMKVStorage(key, { test: 'default' })
    );

    const [state, setState] = result.current;
    expect(state).toEqual({ test: 'default' });

    act(() => {
      setState({ test: 'value' });
      rerender({});
    });

    expect(state).toEqual({ test: 'value' });
    expect(mockMMKV.getString).toHaveBeenCalledWith(key);
  });

  // it('should initialize state with default value if MMKV storage is empty', () => {
  //   const key = 'test-key';
  //   mockMMKV.getString.mockReturnValue(null); // Simulate empty storage
  //
  //   const { result } = renderHook(() =>
  //     useMMKVStorage(key, { test: 'default' })
  //   );
  //
  //   const [state] = result.current;
  //   expect(state).toEqual({ test: 'default' });
  //   expect(mockMMKV.getString).toHaveBeenCalledWith(key);
  // });
  //
  // it('should update state and MMKV storage', () => {
  //   const key = 'test-key';
  //   const initialValue = { test: 'default' };
  //
  //   const { result } = renderHook(() => useMMKVStorage(key, initialValue));
  //
  //   act(() => {
  //     result.current[1]({ test: 'new value' });
  //   });
  //
  //   const [state] = result.current;
  //   expect(state).toEqual({ test: 'new value' });
  //   expect(mockMMKV.set).toHaveBeenCalledWith(
  //     key,
  //     JSON.stringify({ test: 'new value' })
  //   );
  // });
  //
  // it('should update state using function updater and persist to MMKV storage', () => {
  //   const key = 'test-key';
  //   const initialValue = 0;
  //
  //   const { result } = renderHook(() =>
  //     useMMKVStorage<number>(key, initialValue)
  //   );
  //
  //   act(() => {
  //     result.current[1]((prev) => prev + 1);
  //   });
  //
  //   const [state] = result.current;
  //   expect(state).toEqual(1);
  //   expect(mockMMKV.set).toHaveBeenCalledWith(key, JSON.stringify(1));
  // });
  //
  // it('should handle null and undefined values correctly', () => {
  //   const key = 'test-key';
  //
  //   const { result } = renderHook(() =>
  //     useMMKVStorage<null | undefined>(key, undefined)
  //   );
  //
  //   act(() => {
  //     result.current[1](null);
  //   });
  //
  //   const [state] = result.current;
  //   expect(state).toBeNull();
  //   expect(mockMMKV.set).toHaveBeenCalledWith(key, JSON.stringify(null));
  //
  //   act(() => {
  //     result.current[1](undefined);
  //   });
  //
  //   const [state2] = result.current;
  //   expect(state2).toBeUndefined();
  //   expect(mockMMKV.set).toHaveBeenCalledWith(key, JSON.stringify(null)); // MMKV does not support undefined; use null instead
  // });
  //
  // it('should clear all values in MMKV storage', () => {
  //   mockMMKV.clearAll();
  //
  //   expect(mockMMKV.clearAll).toHaveBeenCalledTimes(1);
  // });
});
