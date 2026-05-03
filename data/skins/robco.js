// ============================================================
// SKIN: ROBCO STANDARD — Default Vault 73 terminal
// ============================================================
// All content is original. Inspired by Fallout aesthetic, not copied.

const ROBCO_SKIN = {
  id: "robco",
  name: "RobCo Standard",
  description: "RobCo Industries Termlink (Vault 73)",
  cssClass: "skin-robco",
  bootBanner: "ROBCO INDUSTRIES (TM) TERMLINK PROTOCOL",
  bootSubtitle: "RobCo Industries Unified Operating System",
  promptPath: "/",
  defaultUser: "COURIER_6",
  authToken: "0xR0BC0-7-F4LL0UT",

  filesystem: {
  type: "dir",
  name: "/",
  children: {

    "personnel": {
      type: "dir",
      name: "personnel",
      children: {
        "duty_roster.txt": {
          type: "file",
          name: "duty_roster.txt",
          content:
`VAULT 73 // DUTY ROSTER
LAST UPDATED: 03.14.2287

ALPHA SHIFT (0600-1400):
- Admin K. Reyes      - Reactor monitoring
- Eng. T. Halloway    - Water treatment
- Med. S. Park        - Infirmary
- Sec. R. Vance       - Atrium patrol

BETA SHIFT (1400-2200):
- Admin J. Kowalski   - Reactor monitoring
- Eng. M. Cho         - Water treatment
- Med. P. Okafor      - Infirmary
- Sec. L. Briggs      - Atrium patrol

GAMMA SHIFT (2200-0600):
- Admin D. Stone      - Reactor monitoring
- Eng. A. Vasquez     - Water treatment (REDUCED OPS)
- Med. ON-CALL        - Infirmary
- Sec. C. Yamamoto    - Atrium patrol

NOTES:
Personnel shortage on Gamma shift continues. See Overseer
re: rotation schedule. Two requests pending. -KR`
        },

        "incident_log.txt": {
          type: "file",
          name: "incident_log.txt",
          content:
`VAULT 73 // SECURITY INCIDENT LOG

[2287.02.18 // 0347] Atrium motion sensor triggered.
Investigation found loose ventilation panel. No threat.
- Sec. Yamamoto

[2287.02.22 // 1112] Resident dispute, Hab Block C.
Verbal only. Mediation by Admin Reyes. Resolved.

[2287.03.01 // 0220] Power fluctuation, Sub-Level 2.
Eng. Halloway reports cause unknown. Monitoring.

[2287.03.07 // 1840] Resident T. Mendez attempted
unauthorized access to Overseer's terminal. Detained.
Pending review.

[2287.03.11 // 0312] Power fluctuation recurred.
Eng. Halloway requests external diagnostic equipment.
Request forwarded to Vault-Tec liaison. No response.

[2287.03.13 // 2255] Resident Mendez released.
Counseling assigned. Surveillance ongoing.`
        }
      }
    },

    "logs": {
      type: "dir",
      name: "logs",
      children: {

        "overseer_2287_q1.txt": {
          type: "file",
          name: "overseer_2287_q1.txt",
          content:
`OVERSEER LOG // Q1 2287
ENTRY: 2287.01.04

The new year begins with reduced rations, again.
Hydroponic Bay 2 yields are down 18% from last quarter.
Eng. Halloway insists the issue is soil exhaustion, but
the consumables stockpile cannot sustain another bad
quarter. I have authorized supplemental nutrient paste
distribution effective immediately.

ENTRY: 2287.01.27

Mendez incident concerns me. He is not the first to
question the necessity of indefinite vault occupancy.
Surface readings remain... inconsistent. The Pip-Boy
data from last year's drone showed survivable rad
levels in some sectors, but Vault-Tec protocol is
unambiguous on the matter.

ENTRY: 2287.03.15

Halloway has identified the power fluctuations.
The reactor shielding has degraded faster than
projections suggested. He estimates eight months
of stable operation remaining, twelve at most.

I have not yet informed the residents.
I am not certain I should.

- D. ARMSTRONG, OVERSEER`
        },

        "maintenance.txt": {
          type: "file",
          name: "maintenance.txt",
          content:
`MAINTENANCE LOG // T. HALLOWAY, CHIEF ENGINEER

03.01 - Power flux SL2. Cause unknown. Investigating.
03.02 - Inspected primary couplings. Within tolerance.
03.04 - Secondary heat exchanger flushed. No issues.
03.07 - Power flux recurred. Same signature as 03.01.
03.08 - Pulled diagnostic data. Reactor shielding
        showing degradation patterns consistent with
        thermal cycling stress. NOT replaceable with
        on-hand materials.
03.09 - Filed request via Overseer for Vault-Tec
        materials liaison. No prior response history
        suggests this will be answered.
03.11 - Power flux #3. Severity increasing.
03.13 - Containment estimates: 8mo nominal operations,
        12mo absolute maximum before forced shutdown.
03.14 - Met with Overseer. He has requested I keep
        these findings confidential pending further
        investigation. I have agreed for now.

I do not know if I made the right call.`
        }
      }
    },

    "research": {
      type: "dir",
      name: "research",
      children: {

        "hydroponics_notes.txt": {
          type: "file",
          name: "hydroponics_notes.txt",
          content:
`HYDROPONIC YIELDS // BAY 2
DR. M. CHEN, BOTANIST

Substrate samples taken 02.14, 02.28, 03.14:

Sample A (02.14): Trace mineral depletion observable.
                  Recommend supplementary feed cycles.

Sample B (02.28): Continued depletion. Below threshold
                  for tomato cultivar yields. Switched
                  Bay 2 to potatoes.

Sample C (03.14): Substrate is functionally dead.
                  Recommend full replacement. Reserve
                  substrate stock at 23% capacity.

I have raised these findings at three consecutive
quarterly reviews. No action has been taken to acquire
replacement materials. At current consumption rates,
Bay 2 will be non-productive within four months.

Bays 1 and 3 are projected to fail within nine.

I do not know what we will eat after.`
        },

        "rad_survey.txt": {
          type: "file",
          name: "rad_survey.txt",
          content:
`SURFACE RADIATION SURVEY
DRONE PROBE 7 // 2286.11.22

DEPLOYMENT: Vault-73 emergency hatch, Sector 4
DURATION: 142 minutes (battery exhaustion)

READINGS BY DISTANCE FROM HATCH:
   0-50m:    478 rads (LETHAL)
  50-200m:   202 rads (LETHAL with prolonged exposure)
 200-800m:    44 rads (TOLERABLE w/ medication)
 800-2km:     12 rads (NEAR-NORMAL)
   2-5km:      6 rads (BACKGROUND)

VISUAL OBSERVATIONS:
- Vegetation regrowth observed beyond 500m
- Structures present at approx 3.2km bearing 142°
- Movement detected at 2.8km, possibly fauna
- No visible human activity in survey radius

THIS REPORT FILED WITH OVERSEER 2286.11.30.
NO SUBSEQUENT SURFACE OPERATIONS AUTHORIZED.

- DRONE OPS, J. KOWALSKI`
        }
      }
    },

    "personal": {
      type: "dir",
      name: "personal",
      children: {

        "letter_to_emily.txt": {
          type: "file",
          name: "letter_to_emily.txt",
          content:
`emily,

if you find this terminal still working, you'll know
the rest already. don't blame yourself for not coming
down with us. we both knew the lottery was rigged
toward married couples and i wasn't about to fake a
marriage just to get you in.

i think about you. that's the worst part. they tell us
the surface is dead but i don't know if i believe them
anymore. the engineer says the reactor is dying. the
botanist says the food is dying. the overseer says
nothing is dying.

if i ever get out of here i'll find you, or what's
left of where you were.

i'm sorry it ended like this.

- t. mendez`
        },

        "diary_2287.txt": {
          type: "file",
          name: "diary_2287.txt",
          content:
`MARCH 13, 2287

They let me out today.

The Overseer pulled me aside before they removed the
restraints. He said he understood why I tried to access
his terminal. He said the questions I asked were
"reasonable but unhelpful." He said reasonable is not
always helpful, and unhelpful is not always wrong.

I don't know what he meant.

He gave me clearance to access the research wing files.
That is either trust or surveillance. Probably both.

I am going to read everything I can.

If they're lying, I want to know.
If they're not, I want to know that too.`
        }
      }
    },

    "secure": {
      type: "dir",
      name: "secure",
      children: {

        "armstrong_classified.txt": {
          type: "file",
          name: "armstrong_classified.txt",
          locked: true,
          difficulty: "average",
          content:
`OVERSEER ARMSTRONG // CLASSIFIED PERSONAL FILE
ENCRYPTION: AES-256 // CLEARANCE: OVERSEER ONLY

This file is not for the residents.
This file is not for Halloway.
This file is for whoever comes after me.

I have known about the reactor for fourteen months.
The Vault-Tec liaison has known for nineteen.
I have requested replacement materials seven times.
The response, every time, has been the same:

  "Vault 73 is not approved for resupply at this time.
  Please continue current operations within parameters."

There are no parameters that include "the reactor will fail
in eight months." There is no liaison response that addresses
the slow death of the people I am responsible for.

I have come to suspect — and my evidence is in /secure/
oversight_protocol.dat — that Vault 73 was never intended
to operate beyond 2287. We are an experiment. The original
charter, which I accessed two years ago through a Vault-Tec
internal terminal in Sector 9, classified Vault 73 as
"Population Resilience Study, Unsupplied Variable."

In other words, they wanted to see how long we'd last with
no help. The answer is approximately twenty-one years.

I am informing nobody of this. I am writing it here.

If you are reading this, I have failed in some way that
allowed Termlink access by an unauthorized resident, OR
the Vault has finally opened.

Either way, the truth is yours to do with as you will.

— D. ARMSTRONG
LAST UPDATED: 2287.03.16`
        },

        "oversight_protocol.dat": {
          type: "file",
          name: "oversight_protocol.dat",
          locked: true,
          difficulty: "hard",
          content:
`VAULT-TEC INTERNAL // OVERSIGHT PROTOCOL DOCUMENT
DOCUMENT ID: VT-INT-OS-0073-α
ACCESS LEVEL: CORPORATE INTERNAL ONLY
ORIGIN: HEADQUARTERS, BOSTON

[Document recovered from Vault-Tec liaison terminal,
 Sector 9, by D. Armstrong, 2285.04.12. Personal copy.]

═══════════════════════════════════════════════════
EXPERIMENT CHARTER: VAULT 73
DESIGNATION: Population Resilience Study —
             Unsupplied Variable
═══════════════════════════════════════════════════

PROTOCOL SUMMARY:
Vault 73 is one of seven (7) vaults in the Western
Continental program designated as Resource Constraint
studies. Population is sealed with sufficient supplies
for an estimated 20-25 years of operation. After this
period, residents are expected to either:

  (a) Adapt social/agricultural systems to extend
      survival indefinitely with available resources;
  (b) Develop and execute a coordinated emergency
      surface-egress protocol;
  (c) Experience full population collapse.

OBSERVATION FOCUS:
Behavioral patterns of vault leadership in the
declining-resources phase are of particular interest
to the Sociology Division. The Overseer is NOT to be
informed of the experimental nature of the vault.

NOTE: Per amendment 7-A (2074), Overseers in Resource
Constraint vaults are selected from candidates exhibiting
high authority-deference scores in pre-occupation
psychological screening. This is intended to maximize
the likelihood of (a) over (c) outcomes.

DURATION: Vault 73 is contracted to remain sealed
indefinitely. Vault-Tec maintains no obligation to
provide post-occupation services, resources, or
extraction.

═══════════════════════════════════════════════════

[Armstrong's note, appended:]

I scored a 94 in authority-deference.
They knew exactly who they were putting in charge.

The hatch opens manually from the inside, but the
override codes are stored in the Overseer's terminal.
That terminal is this terminal.

If the residents ever asked, I could send them out.

They have not asked.
I have not told them they could ask.
I do not know which of those is the failure.`
        }
      }
    },


    "readme.txt": {
      type: "file",
      name: "readme.txt",
      content:
`ROBCO INDUSTRIES TERMLINK v0.2

You are accessing the file storage of an active
RobCo terminal. Use these commands to explore:

  help              - Display available commands
  ls                - List contents of current directory
  cd                - Change directory (cd <name>, cd .. to go up)
  read              - Display contents of a file
  hack              - Practice the terminal hacking puzzle
  hack <difficulty> - very_easy / easy / average / hard
  hack <file>       - Hack a locked file to read its contents
  pwd               - Show current path
  clear             - Clear the screen
  whoami            - Display current user identity

Tab completion is available for filenames.
Up arrow recalls previous commands.

If you find a [LOCKED] file (shown in yellow), you'll need
to hack it to read it. The hacking minigame works just like
the Fallout terminal puzzles. Click words to guess, or click
matched bracket pairs ([], {}, (), <>) on the same line for
hints — they'll either remove a wrong word or refresh your
attempts.

You have 4 attempts before lockout.

This is a sandbox terminal. No actual hardware is connected.
Explore freely.`
    }

  }
  }  // end of filesystem
};

// Register skin globally
if (!window.SKINS) window.SKINS = {};
window.SKINS.robco = ROBCO_SKIN;
