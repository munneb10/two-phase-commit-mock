import { sendMessage, broadcast } from "./network";

export class Coordinator {
  constructor(private participants: string[]) {}

  async executeTransaction() {
    console.log("Starting Two-Phase Commit...");

    // PHASE 1: PREPARE
    const votes = await Promise.all(
      this.participants.map(async (url) => {
        const response = await sendMessage(url, "PREPARE");
        return response.success ? response.data.vote : "NO";
      })
    );

    if (votes.every((v) => v === "YES")) {
      console.log("All participants ready. COMMITTING...");
      await broadcast(this.participants, "COMMIT");
    } else {
      console.log("Some participant failed. ABORTING...");
      await broadcast(this.participants, "ABORT");
    }
  }
}
