import '../ui_kits/app/components/EquipmentCard.jsx'

const EquipmentCard = window.EquipmentCard
const EquipmentGrid = window.EquipmentGrid

const ITEMS = [
  { id: 1, name: 'Flame Tongue', type: 'Weapon (longsword)', rarity: 'Rare', attunement: true, weight: '3 lb.', value: '—', description: "You can use a bonus action to speak this magic sword's command word, causing flames to erupt from the blade.", properties: ['Versatile (1d10)', '+2d6 fire damage while active', 'Bonus action to ignite/extinguish'] },
  { id: 2, name: 'Bag of Holding', type: 'Wondrous Item', rarity: 'Uncommon', attunement: false, weight: '15 lb.', value: '—', description: 'This bag has an interior space considerably larger than its outside dimensions.', properties: ['500 lb. / 64 cu. ft. capacity', 'Breathing creature survives 10 minutes inside'] },
  { id: 3, name: 'Sword of Life Stealing', type: 'Weapon (any sword)', rarity: 'Very Rare', attunement: true, weight: '3 lb.', value: '—', description: 'When you roll a 20 on the attack roll with this weapon, the target takes an extra 10 necrotic damage.', properties: ['Critical hit: +10 necrotic damage', 'Gain 10 temp HP on critical kill'] },
  { id: 4, name: 'Staff of Power', type: 'Staff', rarity: 'Legendary', attunement: true, weight: '4 lb.', value: '—', description: 'A +2 magic quarterstaff. While holding it, gain a +2 bonus to AC, saving throws, and spell attack rolls.', properties: ['+2 to AC, saves, spell attacks', '20 charges — regains 2d8+4 at dawn'] },
  { id: 5, name: 'Potion of Healing', type: 'Potion', rarity: 'Common', attunement: false, weight: '½ lb.', value: '50 gp', description: 'You regain 2d4+2 hit points when you drink this potion.', properties: ['Restores 2d4+2 HP', 'Drinking or administering takes 1 action'] }
]

export default {
  title: 'Components/EquipmentCard',
  component: EquipmentCard,
  decorators: [(Story) => <div style={{ maxWidth: 320, padding: 24 }}><Story /></div>]
}

export const CommonItem = { args: { item: ITEMS[4] } }
export const UncommonItem = { args: { item: ITEMS[1] } }
export const RareItem = { args: { item: ITEMS[0] } }
export const VeryRareItem = { args: { item: ITEMS[2] } }
export const LegendaryItem = { args: { item: ITEMS[3] } }

export const Grid = {
  decorators: [(Story) => <div style={{ padding: 24 }}><Story /></div>],
  render: () => <EquipmentGrid items={ITEMS} />
}
