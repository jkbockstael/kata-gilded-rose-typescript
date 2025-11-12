# Kata: Gilded Rose - TypeScript

My take on [the Gilded Rose refactoring kata](https://github.com/emilybache/GildedRose-Refactoring-Kata/), in TypeScript.

## Installation

- Clone this repository `git clone https://github.com/jkbockstael/kata-gilded-rose-typescript`
- Enter the cloned directory: `cd kata-gilded-rose-typescript`
- Install the dependencies: `npm install`

## Building

There is no build step, and no point in transpiling to JavaScript either, but you can run `tsc` and the resulting files will be in the `./dist` directory.

## Running

There's no program to run here, it's a refactoring kata.

## Testing

- Use `npm run test` to run the tests suite.
- Use `npm run test:watch` to run the tests suite in watch mode, tests are automatically re-run when a source file is changed.
- Use `npm run test:coverage` to run instrumented tests and get a coverage report.

## Docs

The original requirements are in [`docs/GildedRoseRequirements.md`](docs/GildedRoseRequirements.md).

## Notes

- This is a refactoring kata, the whole story happens in the commit log.
- This is also why there is no additional documentation in the code, this is not meant for production.
- The requirement constraint that forbids changing the `Item` class is a bit frustrating, of course.
- The `inventoriesEqual` function would be much better if JavaScript/TypeScript had `zipWith`.
- Emily Bache is right: with good enough tests, one can refactor without fear.
- Total time spent, including this README: 2h30m.
