import { useState } from "react";

export function useLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = async <T>(callback: () => Promise<T>) => {
    try {
      setIsLoading(true);
      return await callback();
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    execute,
  };
}
