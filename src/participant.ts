import express from "express";
import { Message, ParticipantState } from "./types";

export class Participant {
  private state: ParticipantState = "INIT";
  constructor(private name: string, private port: number) {}

  start() {
    const app = express();
    app.use(express.json());

    app.post("/message", (req, res) => {
      const { message }: { message: Message } = req.body;

      if (message === "PREPARE") {
        // random decision to simulate real-world uncertainty
        const vote = Math.random() > 0.2 ? "YES" : "NO";
        this.state = vote === "YES" ? "PREPARED" : "ABORTED";
        console.log(`[${this.name}] Received PREPARE → ${vote}`);
        return res.json({ vote });
      }

      if (message === "COMMIT") {
        this.state = "COMMITTED";
        console.log(`[${this.name}] Committing ✅`);
      }

      if (message === "ABORT") {
        this.state = "ABORTED";
        console.log(`[${this.name}] Aborting ❌`);
      }

      res.sendStatus(200);
    });

    app.listen(this.port, () =>
      console.log(`[${this.name}] Participant running on ${this.port}`)
    );
  }
}
