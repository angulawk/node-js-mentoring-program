process.stdin.on('readable', () => {
  let chunk = process.stdin.read().toString();
  process.stdout.write(chunk.split("").reverse().join(""));
});

process.stdin.on('end', () => {
  process.stdout.write('end');
});
