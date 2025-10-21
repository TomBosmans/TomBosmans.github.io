---
title: Dependency Injection (DI)
date: 2025-10-21
tags: oop, ioc, pattern
---
## The problem

Imagine you have a class that depends on other classes:
```typescript 
import MailService from "#services/mailService.js"
import logger from "#logger"

class InvitationService {
  private mailService = new MailService()
  private logger = new Logger()

  public async invite(params: unknown) {
    this.mailService.sendMail(params)
    this.logger.info("invitation send with: ", params)
  }
}
```
`InvitationService` creates `MailService` and `Logger` directly. If you want to switch to a `MockEmailService` for testing, you have to change `InvitationService` itself.
You can't easily test the `InvitationService` without also invoking the `EmailService` and `Logger`, that is a problem for unit tests.


## The solution - What is Dependency Injection?
Dependency Injection (DI) might sound more complicated than it really is. Let’s start with a using it in our previous example:
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


Now we can also use mocked versions of our dependencies:
```typescript
const mailService = mockService
const logger = mockLogger
const invitationService = new InvitationService(mailService, logger)
```

By injecting dependencies, we can easily swap them out. As long as the injected objects follow the same interface, our class doesn’t care about their concrete implementations. This is where typed language like TypeScript really shines.

```typescript
interface MailService {
  sendMail(): Promise<void>
}

interface Logger {
  info(): void
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
As you can see, the InvitationService class no longer depends on any specific implementation, instead it relies on abstractions (interfaces). This makes the class flexible and easy to test, because you can swap in any object that implements the expected interfaces—like a mock or alternative service, without changing InvitationService itself.
## The cost and how to mitigate it - Dependency Injection Container

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

This is pseudo-code, but it illustrates the concept: you register all your dependencies in the container, and it automatically wires them together. When you resolve something (like invitationService), the container injects all required dependencies for you, even if those dependencies have their own dependencies.

Frameworks like [Nestjs](https://docs.nestjs.com/fundamentals/custom-providers) come with a DI container built-in. Alternatively, you can use standalone libraries like [inversify](https://inversify.io/) or my personal favorite [Awilix](https://github.com/jeffijoe/awilix) as it doesn't need decorators.

## Conclusion

DI might seem like extra effort at first, but it gives you flexible, testable, and decoupled code — and thanks to containers, that "extra effort" is almost nothing.
