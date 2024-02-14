import { ref, toValue } from 'vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';
import type { ComposableParam } from '@/types/utility';
import { baseUrl } from '@/config/api';
import { useUserStore } from '@/stores/user';

export function usePublishDeckCode(deckHash: ComposableParam<string>) {
  const userStore = useUserStore();
  const { language } = storeToRefs(userStore);
  const deckCode = ref<string | null>(null);
  const isPublishingDeckCode = ref(false);
  const publishDeckCodeError = ref<Error | null>(null);

  const publishDeckCode = async () => {
    try {
      isPublishingDeckCode.value = true;
      const response = await axios.get(`${baseUrl}/deckcode/publish`, {
        params: {
          deckHash: toValue(deckHash),
          lang: language.value,
        },
      });
      deckCode.value = response.data.deckCode;
    }
    catch (err) {
      publishDeckCodeError.value = err as Error;
    }
    finally {
      isPublishingDeckCode.value = false;
    }
  };

  return {
    deckCode,
    isPublishingDeckCode,
    publishDeckCodeError,
    publishDeckCode,
  };
}
