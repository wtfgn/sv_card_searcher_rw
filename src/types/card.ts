export interface CardProperty {
  id: number
  name: string
  [key: string]: string | number
}

export interface CardFilterProperty {
  cardName?: string
  clans?: CardProperty[]
  charTypes?: CardProperty[]
  tribeNames?: CardProperty[]
  cardSets?: CardProperty[]
  costs?: CardProperty[]
  atks?: CardProperty[]
  lifes?: CardProperty[]
  rarities?: CardProperty[]
  format?: CardProperty
  restrictedCounts?: CardProperty[]
  resurgentProperty?: CardProperty
}

export interface Card {
  card_id: number
  card_set_id: number
  card_name: null | string
  char_type: number
  clan: number
  tribe_name: string
  skill: string
  skill_disc: string
  org_skill_disc: string
  evo_skill_disc: string
  org_evo_skill_disc: string
  cost: number
  atk: number
  life: number
  evo_atk: number
  evo_life: number
  rarity: number
  get_red_ether: number
  use_red_ether: number
  description: string
  evo_description: string
  cv: string
  base_card_id: number
  format_type: number
  restricted_count: number
  restricted_count_co_main: number
  restricted_count_co_sub: number
  resurgent_card: number
}

export type CardInDeck = Card & { count: number };
