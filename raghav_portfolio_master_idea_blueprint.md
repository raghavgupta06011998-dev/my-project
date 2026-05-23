# Raghav 3D Interactive Portfolio — Master Idea & Blueprint

## Purpose of this document

This document explains the full concept of Raghav's 3D interactive portfolio so Claude Code can understand the world, story, layout, and implementation direction before coding.

This is not a normal portfolio website. It is a playable, explorable 3D journey where the visitor walks through Raghav's design world.

---

# 1. Core Concept

The portfolio is a 3D narrative journey.

The player spawns outside a village, enters through a village entrance, walks through a realistic/stylized village, explores different symbolic areas, enters Raghav's hero house, collects/opens a map, then travels through AI houses, bridge, river, forest, campfire, mountains, and company experience worlds.

The world should feel:
- cinematic
- warm
- slightly realistic but still stylized
- personal
- explorable
- story-driven
- portfolio-quality
- not like a random asset dump

The player should feel like they are walking through Raghav's mind, skills, experiences, tools, and future journey.

---

# 2. High-Level Journey Flow

The full player journey:

1. Player Spawn
2. Village Entrance
3. Design Principles Village Street
4. Central Water Well
5. Hero House / Personal House
6. Interior Designer Room
7. Interactive Map System
8. Car Unlock / Garage Area
9. AI Houses / Tool Houses
10. Bridge and River
11. Skills Forest
12. Campfire / Music Rest Area
13. Second Bridge / Mountain Entry
14. Mountain Experience Worlds
15. Company Experience Gates / Peaks

---

# 3. Top-Down World Structure

Use the existing Three.js coordinate style:

- +X = right
- -X = left
- +Y = up
- -Z = forward / deeper into world
- +Z = entrance / behind player

Suggested layout:

```text
                           COMPANY EXPERIENCE MOUNTAINS
                         /        |          |          \
                  Samsung     Freelance    Projects     Future
                         \        |          |          /
                           MOUNTAIN ENTRY GATE
                                   |
                             BRIDGE / RIVER
                                   |
                         CAMPFIRE + MUSIC AREA
                                   |
                              SKILLS FOREST
             Big trees -> strong skills, medium trees -> growing skills,
             small trees/saplings -> beginner/new skills
                                   |
                             BRIDGE / RIVER
                                   |
                           AI / TOOL HOUSES
                    ChatGPT, Claude, Blender, Three.js, etc.
                                   |
                         HERO HOUSE / PERSONAL HOUSE
                                   |
                              WATER WELL
                                   |
              DESIGN PRINCIPLES STREET: houses left and right
        UI / UX / Product Design / Graphic Design / Visual Design / Research
                                   |
                            VILLAGE ENTRANCE
                                   |
                              PLAYER SPAWN
```

---

# 4. Zone 1 — Player Spawn

The player starts outside the village.

Requirements:
- Player should spawn facing the village entrance.
- Entrance should be clearly visible.
- No clutter around spawn.
- The first view should feel cinematic and inviting.

Purpose:
This is the beginning of the journey.

---

# 5. Zone 2 — Village Entrance

The player enters through a village entrance/gate.

Requirements:
- Gate, arch, fence, or entrance posts using available assets.
- A signboard can say:
  - "My Village"
  - or "Raghav's World"
- Road/path begins here.
- Lighting should be warm and welcoming.

Purpose:
This marks the transition from outside world into Raghav's portfolio world.

---

# 6. Zone 3 — Design Principles Village Street

After entering, the player walks through a village street.

There should be houses on both left and right sides.

Suggested count:
- 3 houses on left
- 3 houses on right
- Can be 4 each later if space and performance allow

These houses represent design principles and areas Raghav has worked on.

Possible house themes:
- UI Design House
- UX Design House
- Product Design House
- Graphic Design House
- Visual Design House
- User Research House
- Interaction Design House
- Design Systems House

Each house should feel like a small learning/design station.

Each house can later have:
- signboard
- small interaction trigger
- short text/story
- mini showcase
- props matching the theme

Important:
Do not build interiors for all these houses now.
First create exterior placement and labels/signs only.

---

# 7. Zone 4 — Central Water Well

After the design principle houses, there should be a central water well.

Requirements:
- Place a water well in the middle or slightly ahead of the design street.
- It should feel like a village center/plaza.
- Animals can move around this area later.
- Road/path should naturally pass around the well.
- It can act as a landmark before the hero house.

Purpose:
The well is a calm village center and visual pause before the hero house.

Possible future interactions:
- Player can approach well and get a short reflection/story prompt.
- Animals gather near well.
- It can be a hub marker.

---

# 8. Zone 5 — Animals in Village

Animals should move naturally around the village.

Possible animals:
- horse
- cow
- dog
- sheep
- birds/chickens if available

Behavior:
- They should wander slowly.
- They should not block the player.
- They should stay near village street, well, or side fields.
- They should feel like ambient life, not main gameplay.

Implementation later:
- Use simple path/wander logic.
- Keep animal count low for performance.
- Do not implement advanced AI at first.

---

# 9. Zone 6 — Hero House / Personal House

After the well, the player reaches Raghav's hero house.

This is the most important house.

Role:
- Represents Raghav's personal identity.
- Represents home, story, personality, and creative base.
- This is where the player gets the map and unlocks the next journey.

Design direction:
- It should be visually important but not cartoonishly huge.
- It can be slightly bigger than other houses.
- It should have better placement, lighting, garden, and entrance.
- It should feel like the main house, not just a random large model.

Recommended:
- Make it 1.2x to 1.5x more important than side houses through composition, lighting, garden, and central placement.
- Do not make it too oversized unless the asset looks good.
- Add front garden, lamps, fence, and path.

Hero house exterior:
- Central placement
- Clear entrance door
- Warm lights
- Garden space
- Maybe a small garage/car area nearby
- Road should lead to it but not cut through it

Interaction:
- When player reaches the door and presses E, gate/door opens.
- Player can enter the interior room.

---

# 10. Zone 7 — Hero House Interior

Inside the hero house, there should be a room.

Room layout:
- Right side: designer setup
- Left side: map table

## Right Side — Designer Setup

Represents Raghav's creative work setup.

Objects:
- laptop/computer
- table/desk
- chair
- design boards
- posters
- maybe UI screens
- maybe Blender/Three.js references
- graphic design setup

Purpose:
Shows that this is Raghav's creative/design workspace.

## Left Side — Map Table

There should be a table with a map.

Interaction:
- Player approaches map table.
- Press E or click to pick/open map.
- Map appears as UI overlay.

Purpose:
This map tells the player where to go next.

---

# 11. Zone 8 — Interactive Map System

After the player picks the map, a map UI appears.

Map behavior:
- It can appear on the right side or bottom-right like GTA minimap.
- It can be circular.
- It should show the player's current location.
- It should show important zones:
  - Hero House
  - Design Street
  - Well
  - AI Houses
  - Bridge
  - Forest
  - Campfire
  - Mountain
  - Company Experience Gates
- Player can open a full map view if needed.

Possible controls:
- Press M to open/close full map.
- Mini-map stays visible after unlocking.
- Click a location to set direction/marker later.

Implementation phases:
1. Simple UI overlay map
2. Static icons for zones
3. Player marker
4. Direction arrow
5. Click-to-route later

Important:
Do not implement full Google Maps system immediately.
Start with simple minimap and full map overlay.

---

# 12. Zone 9 — Car Unlock / Garage

The car should not be at the starting point.

The car should be near the hero house.

Story logic:
- Player first walks through village.
- Player reaches hero house.
- After entering/exploring or picking map, the car becomes available.
- Player can use car to travel further into the world.

Car behavior:
- Player approaches car.
- Press E to enter.
- Camera switches to driving view.
- Player can drive with arrow keys/WASD.
- Press E again to exit.
- Car should feel like a car, not gliding.

Car placement:
- Near hero house garage/side area.
- Not blocking main path.
- Grounded properly.
- Scale should match player.

---

# 13. Zone 10 — AI / Tool Houses

After the hero house, the world continues.

There should be houses representing AI tools and creative/technical tools.

Possible houses:
- ChatGPT House
- Claude House
- Blender House
- Three.js House
- React House
- Figma House
- Photoshop House
- Illustrator House

These houses can be generic houses with signs and themed props.

Purpose:
Shows the tools and AI systems Raghav uses to create, learn, and build.

Design:
- More futuristic or slightly magical than design street houses.
- Could have glowing signs or tool icons later.
- Keep them as exterior stations first.

---

# 14. Zone 11 — Bridge and River

After AI/tool houses, the player reaches a river.

There should be a bridge crossing the river.

Purpose:
The bridge represents transition:
- from tools/learning into deeper skills
- from village into forest
- from comfort zone into growth

Requirements:
- River plane or simple water mesh.
- Bridge asset if available.
- Rocks/plants around river.
- Path should clearly lead across bridge.

Implementation:
- Start with simple blue/water material plane.
- Add bridge model if available.
- Add rocks and plants.
- Later add water animation.

---

# 15. Zone 12 — Skills Forest

After crossing the bridge, the player enters the skills forest.

The forest represents Raghav's skills.

Tree symbolism:
- Big ancient trees = strong/core skills
- Medium/growing trees = developing skills
- Small trees/saplings = beginner/new skills

Possible skill mapping:

## Big Trees — Strong Skills
- Photoshop
- Illustrator
- UI Design
- Visual Design
- Product Thinking
- Storytelling / Presentation

## Medium Trees — Growing Skills
- Three.js
- Blender
- React
- UX Research
- Motion/Interaction Design
- Design Systems

## Small Trees / Saplings — New Skills
- Advanced 3D
- Game mechanics
- WebGL optimization
- AI workflows
- Sound design
- Advanced animation

Forest experience:
- Player walks through skill zones.
- Each tree or cluster can have signboards.
- Big trees should feel powerful and established.
- Medium trees should feel active/growing.
- Saplings should feel new and hopeful.

Important:
Do not place trees in a grid.
Make forest organic.
Keep path readable.

---

# 16. Zone 13 — Campfire / Music Rest Area

Inside or after the forest, there should be a sitting area.

Elements:
- Campfire
- Logs or benches
- Sitting stones
- Warm light
- Optional music interaction

Purpose:
This is a peaceful pause in the journey.

Interaction:
- Player can sit or stand near campfire.
- Music can start.
- This can represent reflection, rest, creativity, and calm.

Implementation:
- Start visually only.
- Later add interaction:
  - Press E to sit
  - Press E to play/pause music
  - ambient sound

---

# 17. Zone 14 — Second River / Bridge / Mountain Start

After campfire, the player crosses another bridge or transition area.

This marks the start of the mountain/career section.

Purpose:
Transition from skills to experience/career growth.

---

# 18. Zone 15 — Mountain Experience Worlds

The mountain represents career journey and professional experience.

There are two possible structures:

## Option A — One Main Mountain With Levels
The player climbs one mountain.
Each level represents:
- early learning
- first projects
- internships
- company work
- advanced projects
- future goals

Pros:
- Clear progression
- Easier to understand
- Strong metaphor of climbing career

## Option B — Multiple Company Mountains
Each mountain represents a company or major experience.

Example:
- Samsung Mountain
- Freelance Mountain
- Personal Projects Mountain
- Future Goals Mountain

Pros:
- More explorable
- Each company/experience gets its own world
- More like a portfolio adventure map

Recommended direction:
Use a hybrid.

Create one mountain region, but inside it there are multiple gates/paths/peaks.

Each gate leads to a company/project experience area.

This gives:
- one strong mountain metaphor
- multiple company/project destinations
- easier expansion later

Mountain structure:
- Main mountain entrance gate
- Path splits into different experience gates
- Each gate has signboard/company name
- Player can enter a company/project experience world

Possible gates:
- Company Experience Gate
- Internship Gate
- Freelance Gate
- Personal Project Gate
- Future Goals Gate

---

# 19. Company / Experience Worlds

When player enters a mountain gate, they can see a company/project experience.

Each experience world can include:
- project title
- role
- problem statement
- process
- design decisions
- final output
- learnings
- visuals/screens
- interaction/demo

This should be built later after world layout is stable.

---

# 20. Games and Mini Activities in Village

The village can include small games/activities.

Possible games:
- car racing track / driving challenge
- object collection
- design quiz
- find hidden icons
- animal interaction
- memory path
- timed exploration challenge
- portfolio treasure hunt

Placement:
- Do not put games in the main entrance path.
- Put them in side zones or open areas.
- Car racing can be near/after hero house, where car unlocks.
- Mini games should support the portfolio story, not distract from it.

First phase:
Do not build games yet.
Reserve space and plan locations.

---

# 21. Implementation Phases

## Phase 1 — Village Foundation
- Spawn
- Entrance
- Main village street
- 3 houses left, 3 houses right
- Central well
- Hero house exterior
- Natural paths
- Basic props
- Basic lighting

## Phase 2 — Hero House Interaction
- Door/gate opens
- Player enters house
- Interior room
- Designer setup
- Map table
- Map pickup interaction

## Phase 3 — Map System
- Mini-map UI
- Full map overlay
- Zone icons
- Player marker
- Direction marker

## Phase 4 — Car Unlock
- Car placed near hero house
- Enter/exit car
- Driving
- Better car camera
- Garage/parking area

## Phase 5 — AI / Tool Houses
- Houses after hero house
- Signs for AI/tools
- Themed props
- Simple interactions

## Phase 6 — River and Bridge
- River
- Bridge
- Transition to forest

## Phase 7 — Skills Forest
- Big/medium/small tree clusters
- Skill signboards
- Organic path
- Forest atmosphere

## Phase 8 — Campfire Area
- Fire
- sitting logs
- music interaction later

## Phase 9 — Mountain Experience Region
- Mountain entrance
- company/project gates
- experience paths

## Phase 10 — Portfolio Project Worlds
- Individual project worlds
- case study interactions
- final polish

---

# 22. First Implementation Task for Claude Code

Current first task:

Create Phase 1 village foundation using existing assets.

Do NOT implement hero house interior, minimap, car unlock, forest, bridge, mountain, or games yet.

Phase 1 should include:
1. Player-facing village entrance
2. Main village street
3. 3 design principle houses on left
4. 3 design principle houses on right
5. Central water well
6. Hero house exterior after the well
7. Natural paths connecting these areas
8. Basic village props
9. Warm lighting if already controlled in village environment
10. Keep performance safe

Important:
- Use existing assets only.
- Inspect asset folders before choosing models.
- Keep code modular.
- Do not break player/car/camera systems.
- Keep constants easy to tweak.

---

# 23. Files Claude Code Should Inspect First

Claude Code should inspect the actual project and identify exact files.

Likely folders:
```text
src/world/village/
src/world/village/roads/
src/world/village/buildings/
src/world/village/props/
src/world/village/nature/
src/world/village/environment/
public/assets/models/
public/assets/textures/
```

Likely files may include:
```text
roadBuilder.js
residentialArea.js
heroHouse.js
terrain.js
signs.js
decorItems.js
streetTrees.js
streetLamps.js
VillageWorld.jsx
```

Claude must not assume file names.
It should search and inspect.

---

# 24. Rules for Claude Code

Before editing:
- Inspect files.
- Inspect assets.
- Tell which files will be edited.
- Give a short plan.

When editing:
- Do one phase only.
- Avoid huge rewrites.
- Do not touch unrelated systems.
- Keep constants at the top.
- Use helper functions for repeated house/prop placement.
- Use existing GLB loaders/patterns already in project.
- Do not download anything.
- Do not use assets with broken paths.
- Do not add too many lights.
- Do not add too many heavy GLBs.

After editing:
- Run build if safe.
- Fix only related errors.
- Summarize files changed, assets used, and tweakable constants.

---

# 25. Acceptance Checklist for Phase 1

Phase 1 is successful if:

- [ ] Player spawns facing entrance
- [ ] Entrance feels like village entry
- [ ] There are houses on both left and right sides
- [ ] Design principle houses are arranged naturally
- [ ] Central well exists after those houses
- [ ] Hero house exists after the well
- [ ] Road/path guides player clearly
- [ ] Village feels like a designed place
- [ ] Houses are not random or floating
- [ ] Props are not overcrowded
- [ ] Scene performance remains good
- [ ] Player movement still works
- [ ] Car system is not broken
- [ ] Camera is not broken
- [ ] Build passes

---

# 26. Prompt to Give Claude Code First

Use this exact prompt:

```text
Read the uploaded Master Idea & Blueprint MD file carefully.

First analyze only. Do not edit yet.

I want Phase 1 only:
- village entrance
- main village street
- 3 design principle houses on left
- 3 design principle houses on right
- central water well after those houses
- hero house exterior after the well
- natural paths connecting everything

Do not implement interior, minimap, car unlock, forest, bridge, mountain, or games yet.

Inspect:
- src/world/village/
- public/assets/models/
- public/assets/textures/

Tell me:
1. which files control village layout
2. which assets are available for houses, well, props, roads, signs, trees
3. which files you recommend editing
4. a short implementation plan

Do not touch player, car, camera, or controls.
```

---

# 27. Prompt After Claude Gives Plan

After Claude gives a good plan, use this:

```text
Now implement Phase 1 only.

Create the village foundation:
- entrance
- main street
- 3 design principle houses left
- 3 design principle houses right
- central well
- hero house exterior after the well
- natural paths
- light props only

Use existing assets only.
Do not implement interior, minimap, car unlock, forest, bridge, mountain, or games.

Do not edit player, car, camera, or controls.

Keep constants easy to tweak.
After editing, run build and summarize files changed, assets used, and tweakable constants.
```

---

# 28. Short Design Summary

The portfolio world starts as a village.

The village teaches the visitor who Raghav is as a designer.

The first street shows design principles through houses.

The well acts as a village center.

The hero house is Raghav's personal creative home.

Inside the house, the visitor later gets a map.

The map unlocks the larger journey:
AI/tool houses, bridge, river, skills forest, campfire, mountain, and company/project experience worlds.

This is a cinematic interactive portfolio journey, not a normal website.
