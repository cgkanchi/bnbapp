// ============================================================================
// Class data for ECHO Deck — fill this in from your Bunkers & Badasses book
// or character sheets. The app ships with no game content, only this template.
//
// Structure (everything except "name" and "trees" is optional):
//
//   "Class Name": {
//     actionSkill: { name: "...", desc: "..." },   // shown above the trees
//     pointsPerTier: 5,   // points needed in a tree to unlock each next tier
//     trees: [            // up to 3 trees
//       {
//         name: "Tree Name",
//         tiers: [        // up to 5 tiers, each an array of up to 3 skills
//           [ { name: "Skill", max: 5, desc: "What it does per rank" }, ... ],
//           [ ... tier 2 skills ... ],
//         ]
//       },
//     ]
//   }
//
// Add as many classes as you like, then pick one on the Skills tab.
// Point allocations are saved per class in your browser.
// (You can also paste this same structure as JSON on the Skills tab itself —
// handy if you're using the hosted version and can't edit this file.)
// ============================================================================

window.BNB_CLASSES = {
  "Example Class (replace me)": {
    actionSkill: {
      name: "Example Action Skill",
      desc: "Copy your class's action skill text here from the book."
    },
    pointsPerTier: 5,
    trees: [
      {
        name: "First Tree",
        tiers: [
          [
            { name: "Skill One", max: 5, desc: "Effect per rank, from your sheet." },
            { name: "Skill Two", max: 3, desc: "Another tier-1 skill." }
          ],
          [
            { name: "Deeper Skill", max: 5, desc: "Unlocks once you've spent 5 points in this tree." }
          ]
        ]
      },
      {
        name: "Second Tree",
        tiers: [
          [
            { name: "Other Skill", max: 3, desc: "First skill of the second tree." }
          ]
        ]
      }
    ]
  }
};
