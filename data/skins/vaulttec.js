// ============================================================
// SKIN: VAULT-TEC — Corporate vault terminal (Vault 92)
// ============================================================
// All content is original. Inspired by Fallout aesthetic, not copied.

const VAULTTEC_SKIN = {
  id: "vaulttec",
  name: "Vault-Tec Terminal",
  description: "Vault-Tec Industries Vault Terminal (Vault 92)",
  cssClass: "skin-vaulttec",
  bootBanner: "VAULT-TEC INDUSTRIES // VAULT TERMINAL",
  bootSubtitle: "Vault-Tec Unified Operating Environment",
  promptPath: "/",
  defaultUser: "DWELLER_92",
  authToken: "VT-92-RES-1077",

  filesystem: {
    type: "dir",
    name: "/",
    children: {

      "vault_records": {
        type: "dir",
        name: "vault_records",
        children: {
          "occupancy_log.txt": {
            type: "file",
            name: "occupancy_log.txt",
            content:
`VAULT 92 // OCCUPANCY LOG
SEALING DATE: 2077.10.23

ORIGINAL POPULATION: 84 residents
SELECTION CRITERIA: Musical aptitude (priority)
                    General health (secondary)
                    Vault-Tec personnel referrals

NOTABLE RESIDENTS:
- A. Lichtenstein     - Concert pianist
- M. Briggs           - Symphony conductor
- T. Volkov           - First-chair violinist
- D. Saito            - Composer
- K. Matsuda          - Soprano vocalist
- 79 others           - Mixed musical specialties

VAULT-TEC NOTE:
This vault has been selected to host the cultural
preservation experiment. Residents are unaware of the
specific nature of the program. Standard operating
protocols apply, with additional surveillance equipment
in the recording studios.

Refer to /vault_records/research_protocol.txt for
operational guidelines.`
          },

          "research_protocol.txt": {
            type: "file",
            name: "research_protocol.txt",
            content:
`RESEARCH PROTOCOL // VAULT 92
PRIMARY INVESTIGATOR: DR. F. STANISLAUS

EXPERIMENT OBJECTIVE:
Document the long-term effects of subaudible white noise
exposure on a population selected for high musical
aptitude.

METHODOLOGY:
- White noise generators installed in all recording
  booths (concealed)
- Frequencies optimized for limbic system stimulation
- Exposure logged automatically by booth equipment
- Subjects rotated through "recording sessions" on
  rolling schedule

EXPECTED OUTCOMES:
Phase 1 (months 0-3):  Mild disorientation, paranoia
Phase 2 (months 3-9):  Aggression, dissociation
Phase 3 (months 9+):   Susceptibility to stimulus-
                       triggered violent response

OBSERVATION FOCUS:
Whether musically-trained subjects exhibit altered
response patterns vs. control populations in other
vaults. Of particular interest: do subjects retain
musical recognition while losing other cognitive
functions?

OPERATIONAL NOTE:
The Overseer has been informed only of the audio
recording program ostensibly for cultural archive
purposes. Surveillance feeds, however, are not within
their access.

If this protocol is being read by Vault personnel,
something has gone wrong. Initiate Cleanup Protocol.

- F. STANISLAUS, VAULT-TEC R&D`
          },
        }
      },

      "logs": {
        type: "dir",
        name: "logs",
        children: {
          "overseer_briggs_2079.txt": {
            type: "file",
            name: "overseer_briggs_2079.txt",
            content:
`OVERSEER BRIGGS // PERSONAL LOG
2079.04.18

Two years in. The recording sessions have been a
godsend for morale. Every Tuesday and Friday the
residents gather to play, record, listen back. We
have produced — by my count — 84 original compositions
and over 200 hours of performance recordings. Future
generations will know that art survived.

I have noticed something concerning, however. The
sessions seem to wear on people. Lichtenstein has
not played in three weeks. Volkov complains of
headaches that worsen in the recording booth. Saito,
who used to be the gentlest man I knew, snapped at
his wife in the dining hall yesterday.

I have requested permission from the Vault-Tec liaison
to suspend recording sessions for one month while we
investigate. The response was that the recording
schedule is "essential to the program's integrity."

What program. We are residents. There is no program
beyond surviving until the surface is safe.

I am beginning to suspect that there is.

2079.05.02

Saito attacked Lichtenstein last night during the
evening recording session. No clear provocation.
Saito has been confined to medical pending evaluation.
Lichtenstein is recovering but refuses to enter the
recording wing again.

I have suspended the recording sessions over Vault-Tec's
objection. They have not yet replied to my override.

I am not optimistic.

2079.05.21

I have lost three more residents this week.
Not to violence. To something else.

They simply stopped responding.
They sit in the residences and stare.
When music plays, they react. They know the music.
When music stops, they go silent again.

I do not know what we are.
I do not know what was done to us.
I am locking this terminal so that whoever finds it
later will know we were here, and we tried.

- M. BRIGGS, OVERSEER`
          },
        }
      },

      "secure": {
        type: "dir",
        name: "secure",
        children: {
          "stanislaus_personal.txt": {
            type: "file",
            name: "stanislaus_personal.txt",
            locked: true,
            difficulty: "average",
            content:
`DR. F. STANISLAUS // PERSONAL FILE
ENCRYPTION: VAULT-TEC INTERNAL
2080.01.07

The Vault 92 experiment has progressed faster than
modeling predicted. Phase 3 onset by month 24, against
projected 30+. The musical-aptitude variable appears
to accelerate, not delay, the limbic response.

This is publishable.

I will of course never publish it. The board would
never authorize it. But the dataset is — by any
clinical standard — exceptional.

We will need to terminate the vault before residents
can communicate the experiment to other vaults via
the inter-vault data network. Briggs has already
discovered the recording sessions were the trigger.
He has not yet discovered the inter-vault link is
two-way.

I have authorized Cleanup Protocol effective 2080.02.01.
Vault 92 will be sealed with no resident extraction.
Cause of death will be recorded as reactor malfunction.

The recordings will be archived. Future generations
should know what music can do, even if they will not
know what we did to discover it.

- F. STANISLAUS`
          },

          "cleanup_authorization.dat": {
            type: "file",
            name: "cleanup_authorization.dat",
            locked: true,
            difficulty: "hard",
            content:
`VAULT-TEC INTERNAL // CLEANUP AUTHORIZATION
DOCUMENT ID: VT-92-CLEANUP-001
ACCESS LEVEL: BOARD-ONLY

═══════════════════════════════════════════════════
AUTHORIZATION TO TERMINATE VAULT 92
═══════════════════════════════════════════════════

The undersigned authorize the immediate execution of
Cleanup Protocol on Vault 92, effective 2080.02.01.

JUSTIFICATION:
Resident population has progressed past containment
threshold. Inter-vault data link integrity has been
compromised by Overseer M. Briggs's investigations.
Continued operation poses unacceptable risk of
program disclosure.

METHODOLOGY:
- Reactor failsafe override: triggered remotely
- Atmospheric processing: shutdown
- Hatch override codes: disabled
- Vault-Tec liaison terminal: scrubbed

OBSERVATION VALUE:
Final phase data will be transmitted via residual
recording booth equipment until atmospheric processing
failure renders environment non-survivable. Estimated
useful data window: 18-24 hours post-initiation.

POST-MORTEM:
The vault will be marked "Reactor Failure" in all
external records. Residents will be listed as deceased
due to equipment malfunction. The cultural archive of
Vault 92 musical recordings will be preserved and
catalogued for future scientific reference.

SIGNATURES:
[Redacted]
[Redacted]
F. STANISLAUS, R&D LEAD

═══════════════════════════════════════════════════

[Marginal note in different handwriting:]

I found this file two weeks ago.
We have eleven days.
The hatch will not open.
I am writing this in case anyone, ever, finds it.

Please tell my daughter Anna I'm sorry.
She was right not to come down with us.
She was right.

— M. BRIGGS`
          },
        }
      },

      "readme.txt": {
        type: "file",
        name: "readme.txt",
        content:
`VAULT-TEC INDUSTRIES // VAULT TERMINAL v1.7

You are accessing Vault 92's resident terminal.

Vault 92 is dedicated to the preservation of pre-war
musical culture. Residents include some of the
greatest classical performers and composers of the
2070s. Recording sessions are held twice weekly.

For your safety and the integrity of the cultural
preservation program, please follow Overseer
instructions at all times.

Available commands:
  help              - Display available commands
  ls                - List directory contents
  cd                - Change directory
  read              - Read a file
  hack              - Practice terminal hack
  hack <file>       - Crack a locked file
  pwd               - Show current path
  clear             - Clear screen
  whoami            - Display current resident ID

We hope you enjoy your stay in Vault 92.

— Vault-Tec Industries
"Building a Better Tomorrow, Underground."`
      },
    }
  }
};

// Register skin
if (!window.SKINS) window.SKINS = {};
window.SKINS.vaulttec = VAULTTEC_SKIN;
