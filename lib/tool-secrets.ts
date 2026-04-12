import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

import { getSecretEncryptionEnv } from "@/lib/env/server";

const ENCRYPTION_ALGORITHM = "aes-256-gcm";

function getEncryptionKey() {
  return createHash("sha256")
    .update(getSecretEncryptionEnv().agentflowSecretEncryptionKey)
    .digest();
}

export function encryptSecretValue(value: string) {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ENCRYPTION_ALGORITHM, getEncryptionKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(value, "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return `${iv.toString("base64")}:${authTag.toString("base64")}:${encrypted.toString("base64")}`;
}

export function decryptSecretValue(payload: string) {
  const [ivRaw, authTagRaw, encryptedRaw] = payload.split(":");

  if (!ivRaw || !authTagRaw || !encryptedRaw) {
    throw new Error("Secret payload is malformed.");
  }

  const decipher = createDecipheriv(
    ENCRYPTION_ALGORITHM,
    getEncryptionKey(),
    Buffer.from(ivRaw, "base64"),
  );
  decipher.setAuthTag(Buffer.from(authTagRaw, "base64"));

  const decrypted = Buffer.concat([
    decipher.update(Buffer.from(encryptedRaw, "base64")),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}

export function maskSecretValue(value: string) {
  const suffix = value.slice(-4);
  return suffix ? `••••••${suffix}` : "••••••";
}
