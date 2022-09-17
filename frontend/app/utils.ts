// --- terminal utils ---
export function processCurrentCommand(currentCommand: string) {
  if (currentCommand.length >= 100) {
    return currentCommand
      .split('')
      .map((l, idx) => (idx && !(idx % 99) ? l + '\n' : l))
      .join('');
  }

  return currentCommand;
}
