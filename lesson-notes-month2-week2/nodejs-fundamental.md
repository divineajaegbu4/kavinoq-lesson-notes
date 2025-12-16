# How Node.js Works (Simplified)

1. **Main Thread / Call Stack**

Runs your synchronous JavaScript code.

Only one thing at a time (single-threaded).

2. **Async Operations / libuv**

When you do something async (reading files, network request, timers, etc.), Node.js hands it off to libuv, which runs in the background.

This prevents the main thread from getting blocked.

3.**Callback Queues / Event Loop**

Once the async operation is done, the callback goes into a queue (depends on the type, e.g., timers go to the Timers phase, I/O goes to Poll).

The Event Loop constantly checks if the Call Stack is free and moves callbacks from the queue to the stack.

4. **Call Stack Executes Callbacks**

When the callback gets on the stack, it runs and gives the result (console output, data processing, etc.).

**Visual Summary**

Call Stack = chef (main thread)

libuv = kitchen staff (background workers)

Queue = counter where finished dishes wait

Event Loop = manager checking when chef is free

**💡 Key point:**
This is why Node.js is non-blocking and can handle thousands of simultaneous requests even though it’s single-threaded.


# ✅ The relationship: Node.js, libuv, and the OS

1. **Operating System (OS)**

This is the foundation — your computer’s Windows, Linux, or macOS.

It provides system calls: reading files, making network requests, timers, threads, etc.

2. **libuv**

libuv is a C library used by Node.js.

It acts as a bridge between Node.js and the OS.

When Node.js wants to do something async (like read a file), it asks libuv.

libuv then talks to the OS to actually perform the operation.

3. **Node.js**

Node.js is the JavaScript layer on top.

It provides the APIs you use (fs.readFile, setTimeout, etc.).

Node.js doesn’t talk to the OS directly — it goes through libuv.

**🔹 Analogy**

**OS** = The kitchen itself (the building, tools, and ovens).

**libuv** = Kitchen staff who know how to use the kitchen efficiently.

**Node.js (JavaScript)** = The chef giving instructions to the staff.
<!-- ------------------------------------------------- -->
# ✅ Libuv is not the OS

**libuv** is a library written in C/C++ that Node.js uses to perform async operations.

**The OS** is the real system (Windows, Linux, macOS) that actually reads files, handles network requests, etc.

**libuv** talks to the OS to do these things, so **Node.js** doesn’t have to deal with low-level system calls directly.

🔹 What libuv actually does

**libuv** provides features that Node.js can use asynchronously. Some of the key parts under libuv are:

1. **Event Loop**

The main thing that keeps Node.js running.

Checks queues and runs callbacks when the Call Stack is empty.

2. **Thread Pool**

For operations that are blocking (like file system operations, DNS lookups, compression).

Uses a small number of threads (default 4) to run these tasks in the background.

3. **Async I/O via OS**

Networking (TCP/UDP sockets)

File system operations

DNS resolution

Timers (setTimeout, setInterval)

4. **Queues / Phases (inside the event loop)**

Timers

Pending callbacks

Poll (I/O callbacks)

Check (setImmediate)

Close callbacks

# 🔹 How libuv interacts with the OS

Node.js calls a libuv function (like “read this file”).

libuv either:

Uses the thread pool to run the operation without blocking, or

Uses OS async APIs if available (like epoll on Linux or IOCP on Windows).

Once the OS finishes, libuv schedules the callback to the queue, ready for the event loop.

**🔹 Analogy (More Detailed)**

**OS** = Kitchen building + ovens + tools.

**libuv** = Kitchen staff who know how to use the tools efficiently (some run in parallel threads).

**Node.js (JavaScript)** = Chef giving instructions to the staff.

**Call Stack** = Chef’s hands (only works on one task at a time).

**Event Loop** = Manager checking what’s ready next and handing tasks to the chef.

**✅ Key takeaway:**

**libuv** does not replace the OS.

**libuv** is a layer that helps Node.js perform async operations using OS features and threads, without blocking the main JavaScript thread.



# How the Event Loop Checks Queues

1. **Call Stack runs synchronous code**

Event Loop waits for the Call Stack to be empty before doing anything else.

2. **Microtask Queue (Express Lane)**

Once the Call Stack is empty, Node.js runs all microtasks:

process.nextTick() → highest priority

Promise callbacks (.then, .catch, .finally)

The Event Loop cannot move to the next phase until this queue is empty.

3. **Timers Phase**

Executes callbacks from setTimeout and setInterval whose time has expired.

4. **Pending Callbacks Phase**

Executes certain system-level I/O callbacks (e.g., TCP errors).

5. **Poll Phase**

Handles most I/O operations (reading files, network requests).

If callbacks are ready, Event Loop executes them.

If no callbacks are ready, it may wait for I/O or move to the next phase.

6. **Check Phase**

Executes setImmediate() callbacks.

7. **Close Callbacks Phase**

Executes callbacks for closed handles (socket.on("close"), .close()).

**Repeat**

After the Close phase, the Event Loop goes back to the Timers phase and repeats as long as there is work to do.

**Important Notes**

- **Microtasks** run after every step — not just once per loop.

- **Event Loop** is single-threaded — it only moves to the next callback when the Call Stack is empty.

- **Async operations** never block the Call Stack — they wait in queues until the Event Loop schedules them.

E.g

```javascript
console.log('1: Start');
setTimeout(() => {
console.log('5: Timeout (Macrotask)');
}, 0);
Promise.resolve().then(() => {
console.log('3: Promise (Microtask)');
});
process.nextTick(() => {
console.log('2: Next Tick (Microtask - higher priority)');
});
console.log('4: End');
// OUTPUT:
// 1: Start
// 4: End
// 2: Next Tick (Microtask - higher priority)
// 3: Promise (Microtask)
// 5: Timeout (Macrotask)
```


# Types of Middleware

- **Application-level middleware** – used with app.use() or app.get()/app.post()

- **Router-level middleware** – used with express.Router()

- **Built-in middleware** – provided by Express (e.g., express.json() for parsing JSON)

- **Third-party middleware** – from npm packages (e.g., cors, morgan)