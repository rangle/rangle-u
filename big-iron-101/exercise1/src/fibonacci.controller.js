export async function fibonacciController(ctx) {
  // Get the nth fibonacci number where n is between 25 and 35.
  const n = Math.floor(Math.random() * 10 + 25);
  const start = new Date();
  const number = fib(n);
  const stop = new Date();
  ctx.body = `<DOCTYPE html>
    <html>
      <head>
        <title>Fibonacci ${n}</title>
      </head>
      <body>
        <p>Fibonacci number ${n} is ${fib(n)}.</p>
        <p>Computed in ${stop.getTime() - start.getTime()} ms.</p>
      </body>
    </html>
  `;
}

/*
 * Uses the notoriously inefficient recursive method.
 */
function fib(n) {
  if (n === 1) {
    return 1;
  }

  if (n === 2) {
    return 1;
  }

  return fib(n - 1) + fib(n - 2);
}
