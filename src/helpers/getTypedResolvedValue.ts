const getTypedResolvedValue = <T>(value: unknown, defaultValue: T) => {
  return (value ?? defaultValue) as T;
};

export default getTypedResolvedValue;
