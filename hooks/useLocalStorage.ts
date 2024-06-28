import { useEffect, useState } from 'react';

interface LocalStorageProps<T> {
  key: string;
  defaultValue: T;
}

export default function useLocalStorage<T>({
  key,
  defaultValue,
}: LocalStorageProps<T>) {
  // Inicializar el estado con el valor por defecto. Este estado se actualizará
  // posteriormente si encontramos un valor en localStorage.
  const [value, setValue] = useState<T>(defaultValue);

  // Efecto para cargar el valor inicial desde localStorage.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar si estamos en el lado del cliente
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        setValue(JSON.parse(storedValue) as T);
      }
    }
  }, [key]);

  // Efecto para guardar el valor en localStorage cada vez que cambie.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Verificar si estamos en el lado del cliente
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return [value, setValue] as const;
}
