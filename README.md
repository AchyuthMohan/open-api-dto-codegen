# OpenAPI DTO Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6+-blue.svg)](https://www.typescriptlang.org/)

A TypeScript library that generates strongly-typed Data Transfer Objects (DTOs) from OpenAPI specifications. This project specifically provides DTOs for the Notes API, a pure REST API for managing user notes with Auth0 authentication.

## Features

- 🚀 **Auto-generated TypeScript types** from OpenAPI 3.0 specifications
- 🔒 **Auth0 JWT authentication** support
- 📝 **Complete CRUD operations** for notes management
- 🛡️ **Type-safe** request/response objects
- 📦 **Zero dependencies** for consumers (dev-only generation)
- ⚡ **ESM and CommonJS** compatible

## Installation

```bash
npm install openapi-dto-gen
```

## Usage

### Basic Usage

```typescript
import type {
  Note,
  CreateNoteRequest,
  UpdateNoteRequest,
  ErrorResponse
} from 'openapi-dto-gen';

// Create a new note
const createRequest: CreateNoteRequest = {
  title: "My Note",
  description: "This is my note content"
};

// Update an existing note
const updateRequest: UpdateNoteRequest = {
  title: "Updated Title"
};

// Handle API responses
const note: Note = {
  id: "1234567890",
  userId: "google-oauth2|105700257500106388649",
  title: "My Note",
  description: "This is my note content",
  createdAt: "2026-01-18T10:30:00.000Z",
  updatedAt: "2026-01-18T10:30:00.000Z"
};
```

### API Integration Example

```typescript
import type { CreateNoteRequest, Note } from 'openapi-dto-gen';

class NotesAPI {
  private baseURL = 'https://api.notes-app.com';

  async createNote(request: CreateNoteRequest, token: string): Promise<Note> {
    const response = await fetch(`${this.baseURL}/api/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error('Failed to create note');
    }

    return response.json();
  }

  async getNotes(token: string): Promise<Note[]> {
    const response = await fetch(`${this.baseURL}/api/notes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notes');
    }

    return response.json();
  }
}
```

## API Reference

### Data Types

#### `Note`
Represents a complete note object with all metadata.

```typescript
type Note = {
  id: string;
  userId: string;        // Auto-extracted from Auth0 JWT
  title: string;
  description: string;
  createdAt: string;     // ISO 8601 timestamp
  updatedAt: string;     // ISO 8601 timestamp
};
```

#### `CreateNoteRequest`
Data required to create a new note.

```typescript
type CreateNoteRequest = {
  title: string;
  description: string;
};
```

#### `UpdateNoteRequest`
Optional fields for updating an existing note.

```typescript
type UpdateNoteRequest = {
  title?: string;
  description?: string;
};
```

#### `ErrorResponse`
Standard error response format.

```typescript
type ErrorResponse = {
  error: string;
};
```

### API Endpoints

The DTOs correspond to the following Notes API endpoints:

- `POST /api/notes` - Create a new note
- `GET /api/notes` - List all user notes
- `GET /api/notes/{id}` - Get a specific note
- `PATCH /api/notes/{id}` - Update a note
- `DELETE /api/notes/{id}` - Delete a note

All endpoints require a valid Auth0 JWT token in the `Authorization` header.

## Development

### Prerequisites

- Node.js 18+
- TypeScript 5.0+

### Setup

1. Clone the repository:
```bash
git clone https://github.com/your-username/openapi-dto-gen.git
cd openapi-dto-gen
```

2. Install dependencies:
```bash
npm install
```

3. Generate DTOs from the OpenAPI spec:
```bash
npm run generate
```

4. Build the project:
```bash
npm run build
```

### Project Structure

```
├── openapi/
│   └── openapi.yaml          # OpenAPI 3.0 specification
├── scripts/
│   └── generate-dtos.ts      # DTO generation script
├── src/
│   └── index.ts              # Main exports
├── dist/                     # Generated output
│   ├── models.ts            # Generated TypeScript types
│   └── index.d.ts           # Type definitions
├── package.json
└── tsconfig.json
```

### Regenerating DTOs

When the OpenAPI specification changes, regenerate the DTOs:

```bash
npm run generate
```

This will update the types in `dist/models.ts` and `dist/index.d.ts`.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests and build: `npm run build`
5. Commit your changes: `git commit -am 'Add your feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Related Projects

- [openapi-typescript](https://github.com/drwpow/openapi-typescript) - The underlying library used for type generation
- [Notes API](https://github.com/your-username/notes-api) - The REST API this library provides types for</content>
<parameter name="filePath">/Users/achyuthmohan/Desktop/projects/open-api-dto-gen/README.md