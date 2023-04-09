const fs = require("fs")
require('dotenv').config()

const weights = [10, 20, 30]
const rarities = ["common", "rare", "legendary"]

for (let i = 1; i <= 20; i++) {
  const weight = weights[Math.floor(Math.random() * weights.length)]
  const rarity = rarities[Math.floor(Math.random() * rarities.length)]

  const obj = {
    name: `Shape NFT #${i}`,
    description: `Im cool Shape NFT #${i}!`,
    image: `ipfs://${process.env.PINYATA_CID}/${i}.png`,
    attributes: [
      {
        trait_type: "weight",
        value: weight,
      },
      {
        trait_type: "rarity",
        value: rarity,
      },
    ],
  }

  fs.writeFile(`${i}.json`, JSON.stringify(obj, null, 2), (err) => {
    if (err) throw err
    console.log(`Metadata for NFT #${i} written to ${i}.json`)
  })
}
