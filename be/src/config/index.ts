import * as dotenv from "dotenv";

dotenv.config({
  path: "../.env",
});

class Config {
  /* General */
  public readonly port: number = Number(process.env.PORT) ?? 3000;
  public readonly env: string = process.env.NODE_ENV ?? "development";

  /* Database */
  private readonly dbHost: string = process.env.DB_HOST ?? "localhost";
  private readonly dbUser: string = process.env.POSTGRES_USER!;
  private readonly dbPassword: string = process.env.POSTGRES_PASSWORD!;
  private readonly dbName: string = process.env.POSTGRES_DB!;
  private readonly dbPort: number = Number(process.env.POSTGRES_PORT!);
  public readonly dbUrl: string = [
    "postgresql://",
    `${this.dbUser}:${this.dbPassword}@`,
    `${this.dbHost}:${this.dbPort}/`,
    this.dbName,
  ].join("");
}

export default new Config();
