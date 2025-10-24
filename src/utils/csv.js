const HEADERS = [
  "name",
  "title",
  "company",
  "email",
  "phone",
  "address",
  "website",
  "notes",
];

export function contactsToCsv(contacts) {
  const headerRow = HEADERS.join(",");
  const dataRows = (contacts ?? []).map((contact) =>
    HEADERS.map((header) => escapeCsvValue(contact?.[header] ?? "")).join(",")
  );
  return [headerRow, ...dataRows].join("\r\n");
}

export async function parseContactsCsv(file) {
  const rawText = await file.text();
  const text = rawText.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n");
  const lines = text
    .split("\n")
    .map((line) => line.trimEnd())
    .filter((line) => line.trim().length > 0);

  if (lines.length === 0) {
    return [];
  }

  const [headerLine, ...rows] = lines;
  const columns = parseCsvLine(headerLine).map((column) => column.trim());
  const columnIndex = new Map(columns.map((column, index) => [column, index]));

  const missingHeaders = HEADERS.filter((header) => !columnIndex.has(header));
  if (missingHeaders.length) {
    throw new Error(`Missing columns: ${missingHeaders.join(", ")}`);
  }

  return rows
    .map((row) => parseCsvLine(row))
    .filter((values) => values.some((value) => value.trim().length > 0))
    .map((values) => {
      const record = {};
      HEADERS.forEach((header) => {
        const index = columnIndex.get(header);
        record[header] = (values[index] ?? "").trim();
      });
      return record;
    });
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      const nextChar = line[index + 1];
      if (inQuotes && nextChar === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (char === "," && !inQuotes) {
      values.push(current);
      current = "";
      continue;
    }

    current += char;
  }

  values.push(current);
  return values;
}

function escapeCsvValue(value) {
  const stringValue = value == null ? "" : String(value);
  const needsQuotes = /[",\n\r]/.test(stringValue);
  const escaped = stringValue.replace(/"/g, '""');
  return needsQuotes ? `"${escaped}"` : escaped;
}
