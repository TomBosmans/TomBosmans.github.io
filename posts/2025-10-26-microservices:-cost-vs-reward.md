---
title: "Microservices: Cost versus Reward"
date: 2025-10-26
tags: architecture, microservices, monolith
---
Microservices are a perfect example of what’s wrong with our industry today. Now don’t get me wrong, I have nothing against microservices themselves. What I do have a problem with is how often I’ve seen them used where they simply don’t make sense.

Confused? Let’s start from the beginning.


## What Are Microservices?

Microservices are a solution to a problem. But to understand that problem, we first need to look at what came before: the **monolith**.


## The Monolith

A monolith (short for *monolithic architecture*) is a single, unified application where all components, such as the user interface, business logic, database access, and more, are built and deployed together.

Think of it as one big block of code that handles everything:

- User requests  
- Business logic  
- Database operations  
- Emails, logging, and so on  

All parts are tightly connected and run in the same process. So if you want to change one feature, you usually have to modify shared code and redeploy the entire app.

### Advantages

Monoliths aren’t bad. They’re actually a great starting point for most projects.

**Simplicity**
- Easy to develop, test, and deploy when small  
- No network communication between components  

**Performance**
- All components run within the same application, without network boundaries between them.  

**Debugging**
- Centralized logs and stack traces  

**Small Teams**
- Minimal infrastructure overhead  
- No need to manage multiple services  

### Disadvantages

Over time, monoliths can become harder to maintain:

- Tight coupling, one change can ripple through the system  
- Slow deployments, even small updates require full redeploys  
- Limited scalability, you scale the whole app, not parts of it  
- Tech lock-in, difficult to introduce new frameworks  
- Team bottlenecks, merge conflicts and coordination pain  
- Fragility, one bug can bring everything down  


## The Microservices Approach

Microservices split a system into smaller, independent services, each focused on a single business capability (for example: users, orders, or inventory). Each service can be developed, deployed, and scaled independently.

### Advantages

**Independence**
- Each service evolves on its own  
- Easier CI/CD and faster iteration  

**Scalability**
- Only scale what’s needed (for example: “search” under heavy load)  

**Flexibility**
- Use the best tech for each component  

**Resilience**
- If one service fails (for example: payments), others keep working  

**Team Autonomy**
- Small teams can own their service end to end  

**Modularity**
- Replace or rewrite a service without touching others  

### Disadvantages

Of course, microservices come with costs:

- **Operational complexity:** you are now managing a distributed system  
- **Data consistency:** transactions across services are tricky  
- **Monitoring and debugging:** logs, traces, and errors live everywhere  


## The Real Problem

Here’s where it gets personal. I live in Belgium, and the largest dev team I’ve worked with had maybe five people. That’s not unusual here, as most teams are small with limited resources. Given that, look at the pros and cons again.  
What makes sense for us? Exactly, a **monolith**.

Microservices shine when both your *application* and your *organization* are large. It’s far easier to evolve a monolith into microservices later than to go the other way around. I know because I’ve had to do the latter, and it was painful.

Starting with microservices is, frankly, absurd. How can you possibly know how to split a system before it even exists?

In my experience, the services were split based on assumptions and “requirements” that never materialized. By the time real needs emerged, the logic was so fragmented that it became a nightmare to fix.

And if you’re putting all your microservices in one repo, congratulations. You’ve just eliminated most of their advantages. Now you’ve got more code, more infrastructure, and more headaches.


### When Microservices Start to Make Sense

So when does microservices architecture actually become worth it?

As a rough guide:
- **Team size:** once you have **at least 30 to 50 developers**, usually split across multiple feature or domain teams  
- **Codebase size:** when one codebase becomes so large that build times, deployments, or merge conflicts slow you down significantly  
- **Organizational scale:** when you have separate teams that need to work independently, possibly with their own release cycles, tech stacks, or performance goals  

In other words, microservices make sense when **coordination costs** within a monolith outweigh the **operational complexity** of managing distributed systems. Until then, the overhead isn’t worth it.


## Conclusion

Microservices aren’t bad, at least, I don’t think so. I’ve just never worked on a project where they actually solved the problems we had. But chasing them because they’re fashionable often leads to slower, more complex systems, especially for small teams.

Before adopting any architecture, ask yourself:
- What problem am I actually solving?  
- Do I *have* that problem yet?  
- And if I do, is the cost worth the reward?

Because in software, every “solution” comes with a price tag.


### Summary

> Start simple. Scale when you must.  
> A well-structured monolith beats a poorly planned microservice setup every time.
