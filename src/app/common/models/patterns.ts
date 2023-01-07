export class Patterns{
  public static readonly phone = /(\+212|0)([ \-_/]*)(\d[ \-_/]*){9}/;
  public static readonly email = /[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
}