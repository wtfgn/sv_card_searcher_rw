import type { Card, CardProperty } from './card';

export interface DeckInStorage {
  name: string
  deckHash: string
  format?: CardProperty
  clan: CardProperty | null
}
