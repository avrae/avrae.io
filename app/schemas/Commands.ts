export class CommandModule {
  name: string;
  desc: string;
  commands: Command[];
}

export class Command {
  name: string;
  short: string;
  docs: string;
  args: CommandArgument[];
  signature: string;
  subcommands: Command[];
  example: string;
}

export class CommandArgument {
  name: string;
  required: boolean;
  default: string | null;
  multiple: boolean;
  desc: string;
}
