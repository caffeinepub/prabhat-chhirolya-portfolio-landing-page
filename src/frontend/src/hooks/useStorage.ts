import { HttpAgent } from "@icp-sdk/core/agent";
import { useState } from "react";
import { loadConfig } from "../config";
import { StorageClient } from "../utils/StorageClient";
import { useInternetIdentity } from "./useInternetIdentity";

async function getStorageClient(identity?: any): Promise<StorageClient> {
  const config = await loadConfig();
  const agent = new HttpAgent({
    host: config.backend_host,
    identity,
  });
  if (config.backend_host?.includes("localhost")) {
    await agent.fetchRootKey().catch(() => {});
  }
  return new StorageClient(
    config.bucket_name,
    config.storage_gateway_url,
    config.backend_canister_id,
    config.project_id,
    agent,
  );
}

/**
 * Returns an upload function that uploads a File and returns the blob hash.
 */
export function useStorageUpload() {
  const { identity } = useInternetIdentity();
  const [isUploading, setIsUploading] = useState(false);

  const upload = async (
    file: File,
    onProgress?: (pct: number) => void,
  ): Promise<string> => {
    setIsUploading(true);
    try {
      const client = await getStorageClient(identity);
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { hash } = await client.putFile(bytes, onProgress);
      return hash;
    } finally {
      setIsUploading(false);
    }
  };

  return { upload, isUploading };
}
