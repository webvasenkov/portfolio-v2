export function parseMessage(command: string) {
  const args = command.replace(/“|”|'/g, '"').match(/(?:[^\s"]+|"[^"]*")+/g);

  if (args?.length) {
    const params = [
      ['-e', '--email'],
      ['-n', '--name'],
      ['-t', '--text'],
    ];

    const payload = params.reduce((payload: any, p) => {
      const [p1, p2] = p;
      const argIdx = args.findIndex((a: string) => a === p1 || a === p2);

      if (!~argIdx) {
        payload[p2.substring(2)] = '';
      } else {
        payload[p2.substring(2)] = args[argIdx + 1];
      }

      return payload;
    }, {});

    return payload;
  }

  return null;
}
