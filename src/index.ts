import { Participant } from "./participant";
import { Coordinator } from "./coordinator";

const p1 = new Participant("P1", 4001);
const p2 = new Participant("P2", 4002);
p1.start();
p2.start();

const coordinator = new Coordinator(["http://localhost:4001", "http://localhost:4002"]);

setTimeout(() => {
  coordinator.executeTransaction();
}, 2000);
