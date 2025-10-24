---
title: How to send mails in node
date: 2025-10-24
tags: Node.js, Docker, mailpit, react-email, react, smtp
---

## Introduction
Before diving into setting up email sending in a Node app, I want to share two stories that heavily influenced the decisions I made here.


### First Story: Avoiding Vendor Lock-In
At an agency I worked for, we used Auth0 for authentication across our apps. At first, I didn’t think much of it — yes, Auth0 could be tricky to set up at times, but it was secure and handled authentication properly. Vendor lock-in wasn’t a new concept to me, but I had never witnessed it so clearly.

After Auth0 was acquired by Okta, they started increasing prices, removing features we relied on, and pushing us to upgrade to higher subscription tiers. This made working with the platform frustrating and costly. 

The problem? All of our apps were tightly coupled to Auth0. Migrating away would have required a full rewrite of the authentication logic — time and effort that could have been spent elsewhere.

That experience taught me a valuable lesson: **avoid vendor lock-in wherever possible.** 
To be clear, this doesn’t mean vendors are bad — using them is perfectly fine. The key is to structure your code with the right abstractions so your app isn’t tightly coupled and can switch providers if needed.

### Second Story: Never Send Emails for Real in Development
On another project, emails were a core part of the app. One day, I needed to debug a production or QA issue (I don’t remember which exactly). To avoid messing with live data, I made a local dump and started testing.

What I forgot: a cron job was about to trigger and send out emails. By the time I realized, it was too late — emails went out from my local environment. Panic ensued, I contacted the product owner, and some minor damage control was needed. 

Lesson learned: **never send real emails from a local environment.** It might seem obvious in hindsight, but mistakes happen, and this reinforced the need for a safe, local email workflow. I remembered that Rails had built-in solutions for this, so I looked into options for Node.


### Goals for Email Setup
So, when I was asked to set up emails for a new project, I had a few guiding principles in mind:

- Avoid vendor lock-in — make it easy to switch providers if needed.
- Never send real emails locally, but still allow developers to **preview the emails**.
- Make it painless to create and manage email templates.


## How to

Well, avoiding vendor lock-in is actually simpler than it sounds. Ask yourself: how are emails sent? That’s right — using [SMTP](https://en.wikipedia.org/wiki/Simple_Mail_Transfer_Protocol)!
If we send our emails directly over SMTP, any standard email service provider (ESP) can receive and deliver them. This keeps us flexible and provider-agnostic.
In Node.js, a great library for this is [Nodemailer](https://nodemailer.com/) — it makes sending emails over SMTP straightforward.

Okay, so one small challenge remains: most ESPs offer their own email template builders. How do we handle templates ourselves?
Since we’re already using React for the frontend, and our backend is in JavaScript/TypeScript, we can use [React Email](https://react.email/)
Technically, it’s not really “React” — it uses JSX as an HTML templating language. We can build our templates with JSX, render them to HTML, and then send that output via Nodemailer over SMTP.
As a bonus, React Email comes with a preview server that supports hot reloading! You can check it out using their [automatic setup](https://react.email/docs/getting-started/automatic-setup)

Now we’ve solved two of our three goals. The last piece: being able to see the emails we send.
Enter [Mailpit](https://mailpit.axllent.org/)! It acts as a local SMTP server that catches all outgoing emails and provides a clean, user-friendly UI to preview them. It even gives helpful info about compatibility, so you can safely test emails without ever sending them to real users.
## Example

Let’s dive into some code!
### MailerService

This service defines the interface for sending emails in our application:
```typescript
export default interface MailerService {
  sendMail(params: {
    from: string
    to: string
    subject: string
    text?: string
    html?: string
  }): Promise<void>
}
```

Since we’re using Nodemailer, we can create an implementation of this interface:
```typescript
import * as nodemailer from "nodemailer"
import type { Config } from "./config.factory.ts"
import type MailerService from "./mailer.service.ts"

export default class NodeMailerService implements MailerService {
  private readonly transporter: nodemailer.Transporter

  constructor({ config }: { config: Config }) {
    this.transporter = nodemailer.createTransport(config.mailer)
  }

  public async sendMail(params: Parameters<MailerService["sendMail"]>[0]) {
    await this.transporter.sendMail(params)
  }
}
```

### Local SMTP server
If you’re using Docker Compose, simply add Mailpit to your `docker-compose.yml`:
```yaml
  mailpit:
    container_name: ${APP_NAME}_mailpit
    image: axllent/mailpit
    ports:
      - "${MAILPIT_PORT}:8025"
      - "${MAILPIT_SMTP_PORT}:1025"
```
This will give you a local SMTP server and a web UI at port 8025 to preview emails safely.

### Email templates

We decided to use React Email for templates. Since Node doesn’t natively understand JSX, you’ll need to update your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    ...
  }
```

If you’re running TypeScript files natively in Node [(yes, that’s possible today!)](https://nodejs.org/en/learn/typescript/run-natively) this approach won’t work anymore.
I know — it’s a bit disappointing! We finally don’t have to build our TypeScript, but Node still doesn’t understand JSX, and I really like using JSX for templating… maybe someday.
For now, you’ll still need to set up a [TypeScript runner](https://nodejs.org/en/learn/typescript/run) for local development.

For building and rendering email templates:
```shell
npm install @react-email/components @react-email/render
```

For previewing templates with hot reloading:
```shell
npm install -D @react-email/preview @react-email/preview-server react-email
```

now you can add a this script to your `package.json`:
```json
{
  "scripts": {
    "email:dev": "npx react-email dev --dir src/mails",
    ...
  }
  ...
}
```

Then, open http://localhost:3000 to see your email templates with hot reloading.
### Bringing it all together

```typescript
  const name = "John Doe"
  await nodeMailerService.sendMail({
    from: "my@email.com",
    to: "your@email.com",
    subject: "Test email",
    text: `Welcome to this test ${name}`,
    html: await render(WelcomeEmail({ name })),
  })
```

You can see a working implementation in my *playground* [here](https://github.com/TomBosmans/playground/tree/main/mailer)
