import { ref, toValue } from 'vue';
import axios from 'axios';
import type { ComposableParam } from '@/types/utility';

export function useParseDeckCode() {
  const parsedHash = ref<string | null>(null);
  const isParsingDeckCode = ref(false);
  const parseDeckCodeError = ref<Error | null>(null);

  const clearParseDeckCodeState = () => {
    parsedHash.value = null;
    isParsingDeckCode.value = false;
    parseDeckCodeError.value = null;
  };

  const parseDeckCode = async (deckCode: ComposableParam<string>) => {
    try {
      clearParseDeckCodeState();

      const { data } = await axios.get(`https://svgdb.me/api/deckcode/${toValue(deckCode)}`);
      const { hash, errors } = data;
      if (errors.length > 0)
        throw new Error('Invalid deck code. Please check the code and try again.');
      parsedHash.value = hash;
    }
    catch (err) {
      parseDeckCodeError.value = err as Error;
    }
    finally {
      isParsingDeckCode.value = false;
    }
  };

  return {
    parsedHash,
    isParsingDeckCode,
    parseDeckCodeError,
    parseDeckCode,
    clearParseDeckCodeState,
  };
}
