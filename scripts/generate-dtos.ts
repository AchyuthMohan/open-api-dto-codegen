// scripts/generate-dtos.ts
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { generate } from 'openapi-typescript';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SPEC_PATH    = join(__dirname, '../openapi/notes-api.yaml');
const OUTPUT_PATH  = join(__dirname, '../dist/models.ts');
const OUTPUT_DIR   = dirname(OUTPUT_PATH);

async function generateTypes() {
  if (!existsSync(SPEC_PATH)) {
    console.error(`OpenAPI spec not found at ${SPEC_PATH}`);
    process.exit(1);
  }

  console.log('Generating TypeScript types from OpenAPI spec...');

  try {
    const specContent = readFileSync(SPEC_PATH, 'utf-8');

    // You can also pass file path directly:
    // const result = await generate(SPEC_PATH, { ...options });

    const result = await generate(specContent, {
      additionalProperties: false,
      array: 'readonly',
      // branded: true,                    // optional – gives branded types
      // transform: (obj) => ({ ...obj }), // optional advanced transforms
      defaultNonArrayAdditionalProperties: false,
      supportUnion: true,
      useDates: true,                     // Date instead of string for date-time
      // exclude: ["paths", "components.requestBodies"], // if needed
    });

    let content = result;

    // Optional: add banner / eslint-disable
    content = `// =============================================
// AUTO-GENERATED FILE – DO NOT EDIT MANUALLY
// Generated from OpenAPI spec on ${new Date().toISOString()}
// Using openapi-typescript v${"6.7.x"}
// =============================================

/* eslint-disable */\n\n${content}`;

    // Make sure output directory exists
    if (!existsSync(OUTPUT_DIR)) {
      mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    writeFileSync(OUTPUT_PATH, content);

    console.log(`✓ TypeScript DTOs generated → ${OUTPUT_PATH}`);
  } catch (err) {
    console.error('Failed to generate types:', err);
    process.exit(1);
  }
}

generateTypes();

const header = `// Re-exported named types for better DX
export type {
  Note,
  CreateNoteRequest,
  UpdateNoteRequest,
  ErrorResponse,
  SuccessDeleteResponse
} from './models';\n\n`;

writeFileSync(
  join(__dirname, '../dist/index.d.ts'),
  header + content
);