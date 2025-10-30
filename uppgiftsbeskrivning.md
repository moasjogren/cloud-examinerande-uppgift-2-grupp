Hej Joel!!

Jag och Hillevi har börjat bygga den där dagboksappen jag pratat om - du vet, den där som vi tänker ska använda AI för att ge en feedback utifrån ens senaste inlägg!

Vi har fått ihop en grundläggande version, allt funkar (tror jag) lokalt men grejen är att vi har ingen aning om hur vi ska deploya detta. Vad behöver vi tänka på när det kommer till typ CI/CD? Kostnader (känns som att detta skulle kunna bli viralt alltså)? Kan du hjälpa oss eller känner du någon som kan?

Hämta repot så kan du se vad som finns än så länge men det är ett next.js projekt med basic auth (supabase, frågade chattis) och sen något som heter tailwind som sköter all styling (men här kanske vi också skulle kunna få lite hjälp med design-förslag). Man kan skapa dagboks-inlägg med titel, lite content och datum (men funkar inte riktigt). Man kan lista sina inlägg. Så typ klart, det enda är att koppla på AI-grejen.

Men ok såhär tänker jag:

MVP - som vi skulle vilja ha på plats (G liksom):

Buggar som vi har idag:

- Fixa några buggar jag upptäckt (se Issues i repot)
- Jag tror att vi gör allt i frontend nu(?) kan vi bryta ut all logik till backend?
- Alltså typ använd API-routes, Server Actions eller en custom backend (se "MVG"-avsnittet)

Nya features (välj 3-4)

- Kunna redigera inlägg (har lagt in denna som en issue redan)
- Ta bort inlägg (med bekräftelse innan det tas bort)
- Enkel sök (alltså bara keyword grej typ)
- Taggar på inläggen (ex. humör eller andra kategorier)
- Markdownsupport för inläggen (tänker att det är bra för AI)
- Darkmode
- Export (typ exportera allt som JSON)
- Eller om du/den du skickar detta till kommer på roliga idéer.

CI/CD och arbetsmetodik-tankar

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

MVG (hehe) - som skulle vara dröm (alltså VG liksom) om det gick:

Nya features utöver de för MVP (välj minst 1 men foka på CI/CD)

- Få in AI-komponenten som läser in de 10 senaste inläggen och ger användaren feedback. Alltså tänk en knapp som man kan trycka på och så får man svar från AI.
- Kan man typ använda AI med structured outputs för att hitta mood i inläggen och kanske automatiskt kategorisera eller tagga inlägg?
- Utöver enkel sök, få in semantisk sökning eller sök med filtrering på typ taggar eller annan metadata typ datum (eller AI taggarna från förra featuren) etc.
- Lägg in så att användaren kan lägga upp filer (använd någon typ av Storage)

CI/CD och arbetsmetodik-tankar (välj 1-3 eller kom med egna förslag)

- Bryt ut backend ur Vercels klor
- Byt databas om ni vill (och motivera ert val, men verkligen inget måste)
- Deploya backend och frontend på olika ställen (om vi skulle vilja fixa en mobil-app så småningom)
- Deploya projektet med containerisering (docker).
- Använd en mer robust CI/CD pipeline och motivera era val i readme
- Typ security scanning (npm audit eller Snyk)
- Bygga och pusha Docker images automatiskt till ett container registry när kod pushas
- Generera automatiskt en CHANGELOG.md baserat på era commit-meddelanden.
- Lighthouse CI: Automatiska tester av prestanda, tillgänglighet, SEO och best practices. Samma verktyg som finns i Chrome DevTools.
- Deploy till staging-miljö innan production (men utan Vercel)
- E2E (end-to-end) tester med Playwright eller Cypress
- En större och mer utförlig testsvit (som testar fler saker)
- Använd AI för tester, konfigurationsfiler samt code-reviews
- Utvärdera resultatet och reflektera över risker.

OK så det är typ det. Sen tänkte jag att det vi skulle vilja ha tillbaka är:

En länk till den deployade sajten som vi kan testa runt i :)
Om ni använder API-nycklar som ni inte vill ska användas så kan ni ju stänga av att man kan skapa nya konton i Supabase
Läs mer här: https://supabase.com/docs/guides/auth/general-configuration#:~:text=Allow%20new%20users%20to%20sign%20up%3A%20Users%20will%20be%20able%20to%20sign%20up.%20If%20this%20config%20is%20disabled%2C%20only%20existing%20users%20can%20sign%20in
Links to an external site..

- Ett repo där ni bestämt och jobbat med:
- En bra branching strategy (skriv i readme om detta)
- Tydlig commit-historik (skriv i readme om detta)
- Issues och PRs (med code-reviews av andra i teamet (och kanske AI))
- Jobba i Github Projects eler Jira (kan ju nämna något om det här i readmen och när du visar upp detta sen)
- En Dockerfile så att vi kan köra docker build och sen docker run för att testa projektet!
- En setup för att köra tester (jest, vitest etc.)
- Alltid bra att veta vad som är AI-genererat så skriv en rad om det i readmen också, hur ni använt AI för tester etc.
- Github Actions workflows (så vi kan jobba vidare med er CI/CD pipeline sen)
- Förklara CI/CD-pipelinen noggrannt i readmen, alltså varför du/ni gör vissa grejer etc. (så vi fattar)
- Motivera val av mer avancerad CI/CD

Repot finns här: https://github.com/joeljohansen-chasacademy/cloud-examinerande-uppgift-2-grupp
Links to an external site.. Finns inte så mycket budget tyvärr. SÅ TACKSAM OM DU KAN HJÄLPA!!! och gratis hosting som Vercel känns nice, men om du har bättre förslag så motivera detta och andra val (om du typ byter databas etc. i readmen)!
