# 🧭 Two-Phase Commit Mock

*A tiny experiment in making distributed systems agree even when the network is messy.*

---

### 🧠 The Story

Imagine a group of servers trying to make a decision together.
They’re like a bunch of friends deciding where to eat but they all live in different time zones, their internet lags, and one of them randomly disappears mid-conversation.

Still, they need to make a **single, atomic decision**:

> Either everyone commits to the plan, or no one does.

That’s what the **Two-Phase Commit Protocol (2PC)** tries to do it’s the grown-up, enterprise version of “let’s all agree before we move forward.”

---

### ⚙️ What This Project Is

This project is a **mock simulation** of that agreement dance.
It’s built in **TypeScript** using **Node.js + Express**, and it shows how distributed systems coordinate a transaction so that everyone either commits or aborts nothing in between.

You’ll see three main characters:

* 🧭 **Coordinator** the decision-maker that asks, “Are you all ready?”
* ⚙️ **Participants** the workers who vote “YES” or “NO.”
* 🌐 **Network** the chaotic middleman that drops messages, delays responses, and forces retries.

Together, they re-enact the Two-Phase Commit algorithm one of the core ideas behind distributed databases and microservices.

---

### 🕐 How It Works (the mini-drama)

1. **Prepare Phase (Phase 1)**
   The Coordinator sends each Participant a `PREPARE` message.
   Each one checks its local “situation” and replies with a **YES** or **NO** (randomly in this mock, because chaos is fun).

2. **Decision Phase (Phase 2)**

   * If *everyone* votes **YES** → the Coordinator sends `COMMIT`
   * If *anyone* says **NO** → the Coordinator sends `ABORT`

3. **Network Drama**
   The `network.ts` file adds random delays, message loss, and retries
   because in real distributed systems, the internet doesn’t always cooperate.

You’ll see log lines like:

```
[P1] Received PREPARE → YES
[P2] Received PREPARE → NO
Some participant failed. ABORTING...
🌐 Broadcasting "ABORT" to all participants...
[P1] Aborting ❌
[P2] Aborting ❌
```

Or sometimes:

```
[P1] Received PREPARE → YES
[P2] Received PREPARE → YES
All participants ready. COMMITTING...
[P1] Committing ✅
[P2] Committing ✅
```

Every run feels slightly different just like real systems in the wild.

---

### 🚀 Run It Yourself

```bash
npm install
npm run start
```

You’ll see two Participants spin up (`P1` on 4001, `P2` on 4002),
and then the Coordinator kicks off a transaction after 2 seconds.

---

### 🧩 Why It Matters

Behind the simple logs lies one of the most fundamental principles of distributed computing
**how multiple independent systems agree on a shared outcome** without a central database or guaranteed network.

This is how:

* Databases synchronize commits across shards.
* Microservices keep data consistent.
* And transaction managers make “all-or-nothing” possible.

It also shows why **2PC can block** if a node crashes mid-commit
the classic tradeoff between **consistency and availability**.

---

### What You’ll Learn

* How atomic transactions work across distributed nodes
* Why 2PC is safe but not always available
* How retries, timeouts, and failures affect coordination
* That even in code, consensus is hard but beautiful

---

### 🧤 Closing Thought

Every time I run this, I picture a group chat between flaky friends:
someone’s late, someone’s phone died, someone says “I’m in,” someone ghosts
and somehow, the coordinator still has to make a final call.

That’s the beauty of distributed systems.
They’re not about perfect machines they’re about imperfect ones learning to **agree**.
