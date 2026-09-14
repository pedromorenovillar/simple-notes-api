1. Install the packages needed for this quickstart:

```bash
npm install prisma@7.10.0 @types/pg --save-dev
npm install @prisma/client@7.10.0 @prisma/adapter-pg pg dotenv
```

Here's what each package does:

- prisma - The Prisma CLI for running commands like prisma init, prisma migrate, and prisma generate
- @prisma/client - The Prisma Client library for querying your database
- @prisma/adapter-pg - The node-postgres driver adapter that connects Prisma Client to your database
- pg - The node-postgres database driver
- @types/pg - TypeScript type definitions for node-postgres
  dotenv - Loads environment variables from your .env file

2. Update tsconfig.json for ESM compatibility:

tsconfig.json

````json
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "ignoreDeprecations": "6.0"
  },
  "include": ["src/**/*.ts"]
}
If the file has rootDir: `/src`, remove it and add the include line above. This will let TypeScript know that the PrismaClient is two levels above `/src`.
Because you're using native ESM ("type": "module"), your local imports need .js extensions.

Update package.json to enable ESM:

package.json
```json
{
  "type": "module"
}
````

3. Initialize Prisma ORM

```bash
npx prisma
```

Next, set up your Prisma ORM project by creating your Prisma Schema file with the following command:

```bash
npx prisma init --datasource-provider postgresql --output ../generated/prisma
```

Update your .env file with your PostgreSQL connection string:

.env

```bash
DATABASE_URL="postgresql://username:password@localhost:5432/mydb?schema=public"
```

Replace the placeholders with your actual database credentials:

- username: Your PostgreSQL username
- password: Your PostgreSQL password
- localhost:5432: Your PostgreSQL host and port
- mydb: Your database name

4. [Define your data model](https://www.prisma.io/docs/v7/prisma-orm/quickstart/postgresql)

5. Create and apply your first migration

```
npx prisma migrate dev --name init
```

This command creates the database tables based on your schema.

Now run the following command to generate the Prisma Client:

```
npx prisma generate
```

6. Instantiate Prisma Client

Now that you have all the dependencies installed, you can instantiate Prisma Client. You need to pass an instance of the Prisma ORM driver adapter to the PrismaClient constructor:

lib/prisma.ts

```TypeScript
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };
```

7. [Write your first query](https://www.prisma.io/docs/v7/prisma-orm/quickstart/postgresql#8-write-your-first-query)

Create a script.ts file to test your setup:

Run the script:

```
npx tsx script.ts
```

You should see the created user and all users printed to the console.

8. Explore your data with Prisma Studio

```
npx prisma studio
```
