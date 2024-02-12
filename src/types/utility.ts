import type { Ref } from 'vue';

export type ComposableParam<T> = T | (() => T) | Ref<T>;
