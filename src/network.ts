import axios from "axios";
import { Message } from "./types";

// Configuration
const MAX_RETRIES = 3;
const BASE_DELAY = 300; // ms between retries
const LOSS_PROBABILITY = 0.15; // 15% chance of message loss
const MIN_LATENCY = 100; // ms
const MAX_LATENCY = 800; // ms

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Simulates random network latency and packet loss.
 */
async function simulateNetworkConditions() {
  const delay = Math.floor(Math.random() * (MAX_LATENCY - MIN_LATENCY)) + MIN_LATENCY;
  await sleep(delay);

  if (Math.random() < LOSS_PROBABILITY) {
    throw new Error("Simulated packet loss");
  }
}

/**
 * Sends a message with retries and simulated delay/loss.
 */
export async function sendMessage(
  url: string,
  message: Message
): Promise<{ success: boolean; data?: any }> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      await simulateNetworkConditions();
      const res = await axios.post(`${url}/message`, { message });
      return { success: true, data: res.data };
    } catch (err: any) {
      console.log(
        `[Network] Attempt ${attempt}/${MAX_RETRIES} failed for ${url} (${err.message})`
      );
      if (attempt < MAX_RETRIES) {
        const retryDelay = BASE_DELAY * attempt * 2;
        console.log(`[Network] Retrying in ${retryDelay}ms...`);
        await sleep(retryDelay);
      } else {
        console.log(`[Network] Giving up on ${url} after ${MAX_RETRIES} attempts.`);
      }
    }
  }
  return { success: false };
}

/**
 * Broadcasts a message to all participants concurrently.
 */
export async function broadcast(
  participants: string[],
  message: Message
): Promise<void> {
  console.log(`\n🌐 Broadcasting "${message}" to all participants...`);
  await Promise.all(
    participants.map(async (url) => {
      const result = await sendMessage(url, message);
      if (!result.success) {
        console.log(`[Network] ${url} did not respond to "${message}"`);
      }
    })
  );
}
