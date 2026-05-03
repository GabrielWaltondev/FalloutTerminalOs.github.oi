// ============================================================
// SKIN: PIP-BOY — Personal device journal
// ============================================================
// All content is original. Inspired by Fallout aesthetic, not copied.

const PIPBOY_SKIN = {
  id: "pipboy",
  name: "Pip-Boy 3000",
  description: "RobCo Pip-Boy 3000 Mark IV (Personal Device)",
  cssClass: "skin-pipboy",
  bootBanner: "PIP-BOY 3000 // PERSONAL DATA ASSISTANT",
  bootSubtitle: "RobCo Industries // Mark IV Series",
  promptPath: "/",
  defaultUser: "WEARER",
  authToken: "PIP-3000-PERSONAL",

  filesystem: {
    type: "dir",
    name: "/",
    children: {

      "notes": {
        type: "dir",
        name: "notes",
        children: {

          "day_001.txt": {
            type: "file",
            name: "day_001.txt",
            content:
`DAY 1

Out of the vault.
Surface burns less than I expected. Pip-Boy says
12 rads/hr, well within tolerance.

The air smells wrong. Not bad. Just wrong. Like dust
and metal and something I don't have a word for. The
sky is the color of old paper.

I started walking northeast. The Pip-Boy map shows
something marked SHADY GROUND about 14 km out. I'll
aim for there.

Inventory:
- 3 days food (vault rations)
- 2 days water
- Pistol, 9mm, 24 rounds
- Pip-Boy
- The clothes I left in
- One photograph

Mom told me to keep moving the first week.
She said most of the danger comes from people who
realize you have things they don't.

I am keeping moving.`
          },

          "day_004.txt": {
            type: "file",
            name: "day_004.txt",
            content:
`DAY 4

Made Shady Ground last night. It's not a town. It's
a single broken farmhouse with three people living in
it and one well that still works. They didn't shoot
me, which is the most welcoming reception I'd dared
to imagine.

The eldest is named Cass. She told me there are
settlements further north. She also told me that the
person I should be looking for, if I want to stay
alive, is a woman named OSCAR up in the ruins of
what used to be a small city. Oscar trades, but more
importantly, she knows things. She has maps that the
Pip-Boy doesn't.

Cass let me sleep in the barn. She charged me one
ration for it. I think this is fair.

Tomorrow I head north.

Mom would have liked Cass.`
          },

          "day_011.txt": {
            type: "file",
            name: "day_011.txt",
            content:
`DAY 11

I found Oscar.

She is old in a way that is hard to describe. Like
the wasteland is old. Like she has been here long
enough that "before the war" is just a word to her.
She traded me a real map for two of my last three
rounds.

The map shows where things are. Not just the cities.
But where things ARE. Wells that work. People who
will trade fairly. Routes that aren't claimed by
raiders or worse. Vaults that opened. Vaults that
didn't.

It is the most valuable object I have ever held.

I asked Oscar what I owed her beyond the rounds. She
said: "Pass it on someday. To someone who needs it."

I think this is also fair.`
          },

          "day_028.txt": {
            type: "file",
            name: "day_028.txt",
            content:
`DAY 28

Wrote to a settlement called RIVER BEND. Real ink,
real paper. A trader will carry the letter north.

I told them about my vault. About Mom. About the
photograph.

I told them I am not lost.

I am going to find a place where the sky is clean
and stay there for a while. I am tired of walking.
The Pip-Boy says I have walked 218 kilometers in 28
days. I do not know if that is impressive. The
wasteland does not grade on a curve.

If you are reading this, friend, I am still alive
in the gap between when I write this and when the
Pip-Boy archives it. That gap is where everyone
lives, I think. The tiny window between the doing
and the done.

I am going to make myself a cup of tea now, if I
can find clean water.`
          },

          "private.txt": {
            type: "file",
            name: "private.txt",
            locked: true,
            difficulty: "easy",
            content:
`I think about her every day.

I never told her where I was going.
I told her there was no room in the vault.
That was a lie. There was room.

I left her at the surface because I was scared and
because Vault-Tec said our family was selected and
I thought selected meant something. It just meant
some functionary in Boston rolled a die and our
number came up.

I did not have to leave her.
I chose to leave her, because I was scared.

If anyone reads this — that is the secret. That is
the thing I cannot tell anyone alive. I am alive in
the wasteland because I was a coward in the vault.

I do not know if she made it.
I will probably never know.

I am going to keep walking, because what else is
there to do.`
          },
        }
      },

      "maps": {
        type: "dir",
        name: "maps",
        children: {
          "oscar_route.txt": {
            type: "file",
            name: "oscar_route.txt",
            content:
`OSCAR'S MAP // ROUTES & WATER

(transcribed from physical map)

CLEAN WATER:
- Shady Ground well       (14km NE of vault entrance)
- River bend confluence   (47km N)
- The cracked aqueduct    (58km N, hidden, ask Cass)
- North spring            (89km N, contested)

REPUTABLE TRADERS:
- Cass at Shady Ground    (rations, light barter)
- Oscar at the ruins      (information, real maps)
- Boon at River Bend      (ammunition, fair prices)

DANGER ZONES:
- South of the vault      (raider gangs, do not engage)
- The old highway         (bandits use it for ambush)
- Anywhere east of dusk   (no shelter, exposed)

NOTES IN MARGIN:
"Trust no group of more than 4 you have not met before."
"If they ask where you came from, say 'south.' Always."
"Walk early, sleep early."`
          },
        }
      },

      "readme.txt": {
        type: "file",
        name: "readme.txt",
        content:
`PIP-BOY 3000 MARK IV
RobCo Industries Personal Data Assistant

Welcome to your Pip-Boy. This device is designed to
serve as your personal data record, navigation aid,
and communications hub.

Available commands:
  help          - List commands
  ls / dir      - Show files
  cd            - Change directory
  read / cat    - Read a note
  hack          - Try to access locked entries
  pwd           - Current location
  clear         - Clear display
  whoami        - Wearer identity
  date          - Current date
  about         - Device information

Stay safe out there.

— RobCo Industries
"You don't make it to tomorrow without a Pip-Boy."`
      },
    }
  }
};

// Register skin
if (!window.SKINS) window.SKINS = {};
window.SKINS.pipboy = PIPBOY_SKIN;
