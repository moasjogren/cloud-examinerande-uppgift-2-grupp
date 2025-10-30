## Planera och bestäm i gruppen:

1. Vad ska vi använda för projekthanterings-verktyg? Github Projects eller Jira?
2. Vad ska vi ha för branching strategy?
3. Hur ska vi dela upp arbetet? Hur sköter vi code reviews på pull requests?
4. Gå igenom emailet igen och fundera - vad ska vi lägga till för issues och features?
5. Vad vill vi utforska för tester och ramverk för testning?
6. Vad vill vi använda för pipeline i våra Github Actions?
7. Vad har vi för vägar att gå när det kommer till deployment?

## Svar:

1. Github Projects
2. Tydliga feature-brancher. Exempel: feature-backend-routes. Tydliga commit-meddelanden.
3. Merge kräver att en annan person gör en review och accepterar.
4. Val av nya features:

   - Kunna redigera inlägg
   - Ta bort inlägg
   - Enkel sök
   - Taggar på inläggen (ex. humör eller andra kategorier)
   - Egna förslag: Kommentera inlägg, göra reactions (som i Slack och Discord)
   - Nya features utöver de för MVP(VG):

     - Utöver enkel sök, få in semantisk sökning eller sök med filtrering på typ taggar eller annan metadata typ datum (eller AI taggarna från förra featuren) etc.

   - CI/CD:
     - Deploya backend och frontend på olika ställen
     - Deploya projektet med containerisering (docker).
     - Få ordning på git-historiken (har än så länge bara commitat till main)
     - Deploy till Vercel (är väl enklast?)
     - 3-4 nya features som är implementerade med:
     - Jobba med Jira eller Github Projects som projekthanteringsverktyg
     - Issue -> Branch -> PR (med code-review av minst en annan i teamet)
     - Grundläggande CI/CD med Github Actions (alltså typ lint och test)
     - Vilket också innebär grundläggande tester, ett par stycken räcker.
     - Tydlig commit-historik med branches och beskrivningar
     - Vi vill kunna testa projektet med docker (har lagt en basic config fil men känns som att den kan optimeras? Docker imagen blir jättestor?)
     - Använd AI-verktyg för att skriva tester eller konfigurationsfiler

5. Vi skapar tester med Jest.
6. Implementerat just nu (30/10) Copilot Code Review på varje PR. Docker Image på frontend vid varje PR. Utöka gärna senare!
7. Frontend och backend separat. Vi vill testa minst en ny platform, t.ex Render eller Fly.io.
