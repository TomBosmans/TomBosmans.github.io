---
title: Executable module
date: 2020-01-12
tags: ruby, rails
---

When writing classes in Ruby, it's a good practice to keep them small and focused on doing one thing.
These small classes are easier to read, test and maintain.
A common pattern for these classes is to have a single public method named `execute` or `call`,
and this method does the main work of the class.

For instance, consider a `Multiplier` class that multiplies two numbers:
```rb
class Multiplier
  def initialize(param1, param2)
    @param1 = param1
    @param2 = param2
  end

  def execute
    param1 * param2
  end

  private

  attr_reader :param1, :param2
end

Multiplier.new(5, 6).execute # => 30
```

This class has a constructor that takes two parameters, and a `execute` method that multiplies them.
To make it more convenient to use, we can define a class method that creates an instance and calls `execute` in one go:
```rb
class Multiplier
  def initialize(param1, param2)
    @param1 = param1
    @param2 = param2
  end

  def execute
    param1 * param2
  end

  def self.execute(param1, param2)
    new(param1, param2).execute
  end

  private

  attr_reader :param1, :param2
end

Multiplier.execute(5, 6) # => 30
```

This works well, but we would have to define a similar class method for every class that follows this pattern.
To avoid duplication, we can extract the method into a reusable module:
```rb
module Executable
  def execute(*params)
    new(*params).execute
  end
end

class Multiplier
  extend Executable

  def initialize(param1, param2)
    @param1 = param1
    @param2 = param2
  end

  def execute
    param1 * param2
  end

  private

  attr_reader :param1, :param2
end

Multiplier.execute(5, 6) # => 30
```
Now we can include the `Executable` module in any class that has an `execute` method,
and get the `execute` class method for free.

There's one more thing to consider: sometimes we want to pass a block of code to the `execute` method,
to customize its behavior. In this case, it's better to pass the block to the `execute` method instead of the constructor:
```rb
module Executable
  def execute(*params, &block)
    new(*params).execute(&block)
  end
end

class Multiplier
  extend Executable

  def initialize(param1, param2)
    @param1 = param1
    @param2 = param2
  end

  def execute
    result = param1 * param2
    result = yield(result) if block_given?
    result
  end

  private

  attr_reader :param1, :param2
end

Multiplier.execute(5, 6) { |result| result + 1 } # => 31
```

In this version, the `execute` method takes a block and passes it to the execute method of the instance.
The `execute` method multiplies the parameters as before, and then yields the result to the block if one is given.
This allows us to customize the behavior of the `execute` method without having to subclass it.
