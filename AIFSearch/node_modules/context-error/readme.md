# Context-Error

Tell users what line really matters in the stack trace.

## Usage

`npm install context-error`

```
var ContextError = require("context-error");
throw ContextError("You've Done Something Wrong", 2);
```

## API

### ContextError(message, stackLineNumber)

Returns an error ready to be thrown

* message: the message you want the error to start with
* stackLineNumber: The line number of the stack trace you think caused the error.