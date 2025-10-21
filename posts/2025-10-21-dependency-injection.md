---
title: dependency injection
date: 2025-10-21
tags: oop ioc pattern
---

## What is Dependency Injection?
Dependency Injection (DI) might sound more complicated than it really is. Let’s start with a simple example:
```typescript 
import MailService from "#services/mailService.js"
import logger from "#logger"

class InvitationService {
  private mailService = new MailService()
  private logger: new Logger()

  public async invite(params: unknown) {
    this.mailService.sendMail(params)
    this.logger.info("invitation send with: ", params)
  }
}

const invitationService = new InvitationService()
```

In this example, the InvitationService depends directly on MailService and Logger. So how would this look if we used Dependency Injection instead?

```typescript
import MailService from "#services/mailService.js"
import logger from "#logger"

class InvitationService {
  private mailService: MailService
  private logger: Logger

  constructor(mailService: MailService, logger: Logger) {
    this.mailService = mailService
    this.logger = logger
  }

  public async invite(params: unknown) {
    this.mailService.sendMail(params)
    this.logger.info("invitation send with: ", params)
  }
}

const mailService = new MailService()
const logger = new Logger()
const invitationService = new InvitationService(mailService, logger)
```

At first glance, this looks like more work—we now have to initialize and pass in the dependencies ourselves. So what’s the benefit?

```typescript
const mailSerivce = mockService
const logger = mockLogger
const invitationService = new InvitationService(mailService, logger)
```

By injecting dependencies, we can easily swap them out—for example, when testing. As long as the injected objects follow the same interface, our class doesn’t care about their concrete implementations. This is where TypeScript really shines.

```typescript
interface MailService {
  sendMail(): Promise<void>
}

interface Logger {
  log(): void
  info(): void
  error(): void
  warn(): void
}

class InvitationService {
  private mailService: MailService
  private logger: Logger

  constructor(mailService: MailService, logger: Logger) {
    this.mailService = mailService
    this.logger = logger
  }

  public async invite(params: unknown) {
    this.mailService.sendMail(params)
    this.logger.info("invitation send with: ", params)
  }
}
```
As you can see, the InvitationService class no longer depends on any specific implementation—it simply expects certain dependencies to be provided through its constructor.
As long as those dependencies match the expected interfaces, everything works seamlessly.

## Dependency Injection Container

You might be thinking: “Okay, but what if my dependencies have dependencies, and those dependencies have dependencies, and so on?”

Yeah… it gets annoying fast.
I’ve worked on a project where this pattern was attempted manually, it wasn’t fun to initialize 10 classes just to get an instance of the one I actually wanted to test.
And honestly, I don’t care about all those lower-level dependencies. They’ve already been tested, I just want to focus on the code I’m building right now!

The solution? DI containers. Here’s a simplified example:
```typescript
const container = new DIContainer()

container.register("mailService", MailService)
container.register("logger", Logger)
container.register("invitaionService", InvitationService)

const invitationService = container.resolve("invitationService")
```

This is pseudo-code, but it illustrates the concept: you register all your dependencies in the container, and it handles the wiring for you. Now, when you resolve something (like invitationService), the container automatically injects the right dependencies.

Frameworks like [Nestjs](https://docs.nestjs.com/fundamentals/custom-providers) come with a DI container built-in. Alternatively, you can use standalone libraries like [inversify](https://inversify.io/) or my personal favorite [Awilix](https://github.com/jeffijoe/awilix) as it doesn't need decorators.

## The benefits

DI might seem like extra effort at first, but it gives you flexible, testable, and decoupled code — and thanks to containers, that "extra effort" is almost nothing.
