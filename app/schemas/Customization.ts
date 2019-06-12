export class Customizations {
  aliases: Alias[];
  snippets: Snippet[];
  uvars: UserVar[];
}

export class Alias {
  owner: string;
  name: string;
  commands: string;
}

export class Snippet {
  owner: string;
  name: string;
  snippet: string;
}

export class UserVar {
  owner: string;
  name: string;
  value: string;
}

export class CharVar {
  owner: string;
  character: string;
  name: string;
  value: string;
}

export class GlobalVar {
  owner: string;
  key: string;
  owner_name: string;
  value: string;
  editors: string[];
}
