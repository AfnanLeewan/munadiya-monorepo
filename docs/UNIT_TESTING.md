# Unit Testing in SkillLane

----
This document describes how to write unit tests for SkillLane projects. 
It also gives some examples of how to write unit tests for different types of code.

## Table of Contents

1. [Introduction](#introduction)
2. [Unit Testing](#unit-testing)
3. [Test Types](#test-types)
4. [API Testing](#api-testing)
5. [Database Testing](#database-testing)

## Introduction

Most developers agree that testing should be an integral part of the development process. 
This way, the risk of having huge number of bugs in a separate bug-fix phase after development is reduced.
With tools like Jest and [CI](https://github.com/SkillLane/pluton-monorepo/blob/main/.github/workflows/lint.yml), it helps to run thousands of tests each time a change is integrated into the codebase.

## Test Types

To make the code stable and reliable, we might need to think a bit differently from what we may use to do.
You need to think about both what the code **should do** and **should not do** to protect and secure the codebase.

With these ideas in mind, we can categorize tests into fours types:

### 1. Normal Input Testing

This type of testing is used to verify that the design accepts input that clearly
passes the requirements. This is the most common type of testing.

Example files:
 - [timetable.validator.spec.ts](https://github.com/SkillLane/pluton-monorepo/blob/6edca6a7f1080c249f7cc96007304b3817567cba/packages/school-core-api/src/domain/timetable/validator/timetable.validator.spec.ts) refer to test name method 'should not throw error if the start date and end date are input correctly Date type, current date is in between start date and end date'


### 2. Boundary Input Testing

This type of testing is used to verify that only structurally correct input is accepted.
Example of boundary checks are length, size, quantity, and range. But they could also include complex invariants and domain rules

Example files:
 - [timetable.validator.spec.ts](https://github.com/SkillLane/pluton-monorepo/blob/6edca6a7f1080c249f7cc96007304b3817567cba/packages/school-core-api/src/domain/timetable/validator/timetable.validator.spec.ts) refer to test name method 'should not throw error if the start date and end date are input correctly Date type, current date is in between start date and end date'


Read more:
- [Boundary Value Analysis](https://www.guru99.com/equivalence-partitioning-boundary-value-analysis.html)

### 3. Exception Input Testing

This type of testing is used to verify that the design does not break when invalid input is handled.
Empty data structures, null and strange characters are often considered invalid input.

Example files:
 - [timetable.validator.spec.ts](https://github.com/SkillLane/pluton-monorepo/blob/6edca6a7f1080c249f7cc96007304b3817567cba/packages/school-core-api/src/domain/timetable/validator/timetable.validator.spec.ts) refer to test name method 'should throw error if input null value the start date and end date'


### 4. Extreme Input Testing

This type of testing is used to verify that the design does not break when extreme input is handled.
For example a string with 4 million characters, a list with 1000 elements, or a number with 100 decimal places.

Example files:
- TBD

## Unit Testing

### Setup

The setup for function under test is quite simple.
You need to import the function and call it with the input you want to test.

One thing to note is that you should keep your function small and easily testable.

```typescript

describe('TimeTableValidator Test', () => {
  let timetableValidator: TimetableValidator

  beforeEach(async () => {
    timetableValidator = new TimetableValidator()
  })
})
```

### Writing Tests

Refer to the [Test Types](#test-types) section for more information on how to write tests.

Example:
- [timetable.validator.spec.ts](../packages/school-core-api/src/domain/timetable/validator/timetable.validator.spec.ts)


## API Testing

### Setup
To set up the testing API layer, we need to prepare a test module for our test cases.
A common function  used is beforeEach(), in which we will initialize the testing module, specify the controller class 
and provide the necessary providers.
Eg:
```typescript
beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({}).compile();
});
```
In our project, the API layer often calls down to the layers below through CommandBus and QueryBus. 
So we often provide these 2 objects.
Eg:
```typescript
beforeEach(async () => {
// ...
    providers: [
        {
            provide: QueryBus,
            useValue: {
                execute: jest.fn(),
            },
        },
        {
            provide: CommandBus,
            useValue: {
                execute: jest.fn(),
            },
        },
    ]
// ...
});
```

After the testing module is compiled, we will get the objs needed to use in the test cases we are about to write.
Eg:
```typescript
beforeEach(async () => {
// ...
    timetableController = app.get<TimetableController>(TimetableController);
    queryBus = app.get<QueryBus>(QueryBus);
});
```

### Writing Tests

Refer to the [Test Types](#test-types) section for more information on how to write tests.

## Database Testing

TBD
