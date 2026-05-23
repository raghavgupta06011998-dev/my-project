# Raghav 3D Interactive Portfolio — Claude Code Context

## 1. Project Vision

I am building a **3D interactive portfolio**, not a normal website.

The portfolio is a **narrative journey** where the visitor/player explores my creative world through movement, environments, and interactive storytelling.

The goal is to make the portfolio feel like a cinematic 3D world that represents my personality, design skills, career journey, and projects.

---

## 2. Full Portfolio Concept

The full portfolio journey is structured like this:

### 1. Space Intro
- The experience begins in space.
- There is a cinematic black hole / portal / entry gate.
- The visitor enters the portfolio world through this portal/gate.

### 2. Village Hub
- This is the main current area being developed.
- It works as the main hub world.
- It should feel warm, stylized, charming, cinematic, and portfolio-quality.
- The visitor/player can walk around and explore.

### 3. Personal House
- Represents my personal story, personality, background, and creative identity.
- This can later become an interactive story zone.

### 4. Forest
- Represents my design skills.
- Ancient trees = strong/core skills.
- Growing trees = developing skills.
- Saplings = new skills I am learning.

### 5. Mountain
- Represents my career progression.
- As the visitor climbs higher, they discover more advanced parts of my journey.

### 6. Project Worlds
- Each major project can become a small interactive world or area.
- Instead of normal portfolio cards, the visitor explores project environments.

---

## 3. Current Active Area: Village Hub

The village currently includes:
- Player character
- Terrain
- Stone road
- Entrance fence
- Watch towers
- Village sign board
- Car with enter/drive functionality
- Multiple houses on the left and right side
- One large center house
- Road split around the center house

---

## 4. Current Design Problem

The current road near the center house is too straight/sharp.

The road currently feels like it directly cuts near the house.

I want the road layout to feel more natural and architecturally planned.

---

## 5. Desired Road Layout

The desired road should work like a smooth **Y-shaped village road**.

Important explanation:
- The main road comes from the entrance.
- Think of the main road as the bottom stem of a capital **Y**.
- Near the large center house, the road should split smoothly into two curved paths.
- One road should curve around the left side of the center house.
- One road should curve around the right side of the center house.
- Both roads should continue forward in the same general direction.
- The road should not cut directly into the house.
- The road should not touch the house.
- The center house should have breathing space around it.

The center house should have:
- Grass/garden space in front
- Grass/garden space on the left side
- Grass/garden space on the right side

The road should feel like a real village/estate driveway layout:
- Rounded
- Curvy
- Smooth
- Natural
- Architecturally planned
- Not like random rectangular planes

---

## 6. Design Direction

The village should feel:
- Warm
- Cinematic
- Stylized
- Charming
- Natural
- Portfolio-quality
- Like a designed 3D world, not a test scene

Road and environment design should avoid:
- Harsh intersections
- Roads cutting into buildings
- Random rectangular shapes
- Too much empty flatness
- Overly mechanical layout

Road and environment design should include:
- Smooth curves
- Breathing space around houses
- Grass/garden patches
- Clear walking/driving paths
- Natural village planning
- Good composition from the player camera

---

## 7. Active Project Path

```text
/Users/raghavgupta/Portfolio/raghav-portfolio
```

Important note:
Downloads is only an asset staging area. Do not treat Downloads as the active source code folder.

---

## 8. Important Folders

```text
src/
src/world/
src/world/village/
src/world/village/roads/
public/
public/assets/
public/assets/models/
public/assets/textures/
public/assets/architecture/
```

---

## 9. Known Important File

The current road code is likely in:

```text
src/world/village/roads/roadBuilder.js
```

This file currently creates:
- Main road
- Left split road
- Right split road

This file is likely the main file to improve for the curved Y-shaped road.

---

## 10. Current roadBuilder.js Concept

The current road builder creates road pieces using Three.js plane geometry.

It uses:
- `THREE.PlaneGeometry`
- Road texture
- Road material
- Main road mesh
- Left split road mesh
- Right split road mesh

The issue is that the split roads are currently too straight and sharp.

The next improvement should probably replace or improve the straight split planes with curved road geometry or a more natural road shape.

---

## 11. Existing Features That Must Not Break

Do not break:
- Player movement
- Player camera
- Car enter/drive functionality
- Existing house placements
- Center house
- Village sign board
- Terrain
- Existing asset paths
- Existing models/textures
- Existing village environment

If a change may affect any of these, explain first.

---

## 12. Development Rules

1. Do not rewrite the whole project.
2. Do not randomly change unrelated files.
3. First inspect the relevant files.
4. Explain which files need editing.
5. Then make focused changes only.
6. Use readable constants for position, scale, rotation, road width, road elevation, curve amount, and garden clearance.
7. Do not delete existing functionality unless approved.
8. Keep the project modular and easy to tweak.
9. If adding assets, use existing `public/assets` paths.
10. If unsure about a file path, search the project first.
11. Prefer small safe edits over huge rewrites.
12. After changes, summarize what changed.

---

## 13. What Claude Code Should Do First

First task should be **analysis only**.

Please do this first:
1. Analyze the active Three.js project.
2. Find all village-related files.
3. Find the road builder file.
4. Find house placement files.
5. Find terrain files.
6. Find player controller files.
7. Find car controller files.
8. Understand how the village is currently assembled.
9. Do not edit anything yet.
10. Give a safe implementation plan for improving the road.

---

## 14. First Prompt To Use In Claude Code

```text
I am building a 3D interactive portfolio in Three.js.

Please read this context file first.

Important active project path:
/Users/raghavgupta/Portfolio/raghav-portfolio

Current active area:
Village Hub.

Current problem:
The road near the center house is too straight and cuts too directly near the house.

Desired result:
- Main road comes from the entrance.
- Near the center house, road splits like a smooth Y.
- Left road curves around the left side of the center house.
- Right road curves around the right side of the center house.
- Center house should have garden/grass space in front, left, and right.
- Road should not touch or cut into the house.
- Road should feel natural, rounded, and architecturally planned.

Important file likely involved:
src/world/village/roads/roadBuilder.js

Rules:
1. Do not edit yet.
2. First inspect the project structure.
3. Find the village road file, house placement file, terrain file, player controller, and car controller.
4. Tell me which files are relevant.
5. Then give me a safe implementation plan.
6. Do not rewrite unrelated files.
7. Do not break player movement or car functionality.
8. Use readable constants for positions, road width, elevation, curves, and spacing.
9. Keep changes focused and easy to tweak.

First analyze only and tell me your plan.
```

---

## 15. Second Prompt After Analysis

```text
Now implement only the curved Y-shaped road improvement.

Make the road around the center house smooth, rounded, and natural.

Keep garden/grass space in front, left, and right of the center house.

Do not change player movement, car controls, house models, or unrelated files.

After editing, summarize:
1. files changed
2. constants I can tweak
3. how to adjust road width
4. how to adjust road curve
5. how to adjust garden clearance
```

---

## 16. Correction Prompt If Claude Misunderstands

```text
You are misunderstanding the road shape.

I do not want two horizontal side roads.

I want a Y-shaped split:
- the main road is the bottom stem of Y
- the center house sits near the split
- one road curves around the left side of the house
- one road curves around the right side of the house
- both roads continue forward in the same general direction
- the house should have grass/garden space around it

Please revise the road layout with this understanding.
```

---

## 17. Notes About My Working Style

I prefer direct code changes when the file is available.

If the file is patched/open in Cursor, make the changes directly instead of only explaining.

If the exact file is not available, ask me to open or patch the correct file.

I want practical, working changes, not only theory.

---

## 18. Current Priority

# Improve the Village Hub road layout around the center house

Make it feel like a real, designed village/estate road:
- Smooth Y split
- Curved roads
- Garden space
- No harsh cutting into the house
- Easy-to-adjust constants
