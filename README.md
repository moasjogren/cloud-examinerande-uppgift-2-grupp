# Journal App - Setup and Testing Guide

## Översikt

Detta är en fullstack dagboksapplikation där användare kan skriva, redigera och söka bland sina dagboksinlägg. Appen använder AI-baserad semantisk sökning för att hitta relevanta inlägg baserat på innehåll snarare än bara nyckelord.

## Teknisk Stack

### Frontend

- **Next.js 16** (App Router med TypeScript)
- **Tailwind CSS** för styling
- **Zustand** för state management
- Dark mode support

### Backend

- **Node.js + Express** (TypeScript)
- **MongoDB** som databas
- **JWT** för autentisering
- **Xenova Transformers** för AI embeddings och semantisk sökning

## Hur man kör projektet lokalt

### Förutsättningar

- Node.js 20 eller senare
- Docker & Docker Compose (för enklast setup)
- MongoDB (om du inte använder Docker)

### Alternativ 1: Med Docker Compose (Rekommenderat)

1. **Klona repot:**

   ```bash
   git clone <repository-url>
   cd cloud-examinerande-uppgift-2-grupp
   ```

2. **Skapa .env-filer:**

   **Backend** (backend/.env):

   ```env
   NODE_ENV=development
   PORT=5001
   MONGODB_URI=mongodb://mongo:27017/Daybouk
   JWT_SECRET=your-secret-key-here
   ```

   **Frontend** (frontend/.env):

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5001
   ```

3. **Starta alla services:**

   ```bash
   docker compose up --build
   ```

4. **Öppna appen:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

### Alternativ 2: Manuell installation

1. **Installera MongoDB lokalt** eller använd MongoDB Atlas

2. **Backend:**

   ```bash
   cd backend
   npm install
   # Skapa .env enligt ovan (använd mongodb://localhost:27017/Daybouk)
   npm run dev
   ```

3. **Frontend (i nytt terminalfönster):**
   ```bash
   cd frontend
   npm install
   # Skapa .env enligt ovan
   npm run dev
   ```

## Hur man testar appen

### 1. Skapa ett konto

- Navigera till http://localhost:3000
- Klicka på "Sign up"
- Fyll i email, lösenord och bekräfta lösenord

### 2. Skapa dagboksinlägg

- Efter inloggning, klicka på "New Entry"
- Fyll i titel, innehåll och (optionellt) taggar separerade med komma
- Klicka "Save Entry"

### 3. Testa funktioner

**Redigera inlägg:**

- Klicka "Edit" på ett inlägg
- Ändra innehållet
- Spara

**Ta bort inlägg:**

- Klicka "Delete" på ett inlägg
- Bekräfta borttagning

**Semantisk sökning:**

- Använd sökfältet på dashboard
- Skriv in en fråga (t.ex. "hur mådde jag igår?")
- Se relevanta inlägg baserat på innehåll, inte bara keywords

**Reactions:**

- Klicka på emoji-knapparna under ett inlägg (😊😢😠🤔)
- Se antalet reactions uppdateras

**Dark mode:**

- Klicka på 🌙/☀️ ikonen i högra hörnet

**Taggar:**

- Lägg till taggar när du skapar/redigerar inlägg
- Taggar visas under inlägget som små badges

## Köra tester

**Backend:**

```bash
cd backend
npm test
```

## CI/CD Pipeline

Projektet använder GitHub Actions för automatisering:

1. **Jest Test** (.github/workflows/jest.yml) - Kör backend-tester vid varje push/PR
2. **Docker Image CI** (.github/workflows/docker-image.yml) - Bygger Docker images efter lyckade tester

## Projektstruktur

```
├── frontend/               # Next.js frontend
│   ├── src/
│   │   ├── app/           # Next.js App Router sidor
│   │   ├── components/    # React komponenter
│   │   └── context/       # Theme context
│   └── Dockerfile
│
├── backend/               # Express backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # MongoDB models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, validation
│   │   └── services/     # AI embedding service
│   └── Dockerfile
│
└── docker-compose.yml    # Orchestrering av services
```

## Viktiga endpoints

**Authentication:**

- `POST /api/users` - Registrera ny användare
- `POST /api/users/login` - Logga in
- `POST /api/users/logout` - Logga ut

**Entries:**

- `GET /api/entries` - Hämta alla användarens inlägg
- `POST /api/entries` - Skapa nytt inlägg
- `GET /api/entries/:id` - Hämta specifikt inlägg
- `PATCH /api/entries/:id` - Uppdatera inlägg
- `DELETE /api/entries/:id` - Ta bort inlägg

**Search:**

- `GET /api/search/semantic?query=...` - Semantisk sökning
- `GET /api/search/tags` - Hämta alla tillgängliga taggar

## Felsökning

**"Failed to login" / "Not authenticated":**

- Kontrollera att backend körs på rätt port
- Verifiera `NEXT_PUBLIC_API_URL` i `frontend/.env`
- Kolla CORS-inställningar i `backend/src/index.ts`

**Docker images blir för stora:**

- Se `.dockerignore` och `frontend/.dockerignore` / `backend/.dockerignore`
- Multi-stage builds används redan i båda Dockerfiles

**MongoDB connection error:**

- Verifiera att MongoDB körs
- Kolla `MONGODB_URI` i `backend/.env`
- Om du använder Docker Compose, kontrollera att mongo-container är uppe

## Mer information

Se `planering.md` för projektplaneringsdetaljer och `uppgiftsbeskrivning.md` för ursprungliga krav.
