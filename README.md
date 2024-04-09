# React + TypeScript + Vite

# Google Infinitely Scrolling Message List

## To run

1. Clone this repository
2. `cd path/to/repo`
3. Run `yarn` to install dependencies
4. Run `yarn start`
5. Open browser to [http://localhost:3000/](http://localhost:3000/)

## Instructions

Full instructions available [here](https://docs.google.com/document/d/1KL6ie6H9G1MVORgbEzrjiRYZpX7Hup_tak3VSdcsbs0/edit?pli=1&resourcekey=0-WQMaFELGwyEhBwQQBXnbhQ).

## Requirements

1. The header should be fixed with messages that scroll underneath
2. Users should be able to swipe a message horizontally offscreen to dismiss it
3. Messages should load automatically so that a user scrolling slowly should never see the bottom of the list
4. Your prototype should work well even after many messages have been loaded

## Explanation of solution

### 1. Fixed header with scrolling messages

Approach:

- Use `position: fixed` for the header
- Using relative positioning for the `MessageList` component also creates a stacking context so the scrolling and animation will be smoother
- Lay out the scrolling container with the following approach

  ```
    height: 'calc(100vh - $headerHeight)',
    position: relative,
    insetBlockStart: $headerHeight,
  ```

Additional considerations:

- Use `display: grid`, but the advantage of the stacking context for scroll performance and the simplicity of the other solution makes it preferred

### 2. Dismiss messages by swiping horizontally

Approach:

- Create a component `Message` with the content of the message
- Create a wrapper `SwipeableCard` that manages the gestures
- Add `InputStart`, `InputMove`, and `InputEnd` handlers to abstract away touch vs. mouse interactions
- Set animation durations to 0 when swiping so the card translation happens immediately when swiping
- Lock the swiping when the user scrolls by collecting both X and Y input movement
- If the X movement exceeds a threshold, consider it dismissed, fading the card out and moving it offscreen
- Animate the next 9 items to fill the space

Additional considerations:

- It may have been unnecessary to include cursor interactions, but since I've implemented on web (with the intention of loading this in an Android Webview), it seemed worthwhile to abstract away the input method
- Given more time, implementing a more elegant method of selecting the messages that are both below the swiped element and on screen once it's gone would be a better approach

### 3. Load messages automatically when scrolling

Approach:

- Initially load 75 messages
- Add scroll listener to `MessageList` component
- When the scroll distance exceeds 4x the `window.outerHeight`, load 50 more messages

Additional considerations:

- It's impossible to _never_ hit the bottom unless the user is in 0 latency conditions, but this approach minimized possibility of hitting the end
- Upon reflection, an even better approach might be to load the second set of messages immediately, cache them, render them once the user approaches the bottom, then load and cache more messages when that occurs

### 4. Performant even with many messages

Approach:

- Ideally would use view recycling, but didn't run into performance issues even with >1000 messages

Additional considerations:

- It's my understanding that this is supported natively in Android, but isn't on web and required a lot more engineering to cover an edge case
