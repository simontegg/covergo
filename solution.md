# Solution

## Framework choices

I chose to implement the solution in Vue and XState because I have used both recently and they are mentioned in the job description. XState is also well-suited to multi-step wizards and I have used it for this purpose.

## Components

Each page in the design is implemented as a separate page and a separate state that is switched out in parent controller component UserDetailsWizard.

The XState machine was placed in its own folder and split into files reflecting concerns. I have found this pattern useful for testing and code organistion as the machine grows.

## State management

The question with forms like these is whether to propagate form value changes into the XState context on input change event, or keep values using ref() or reactive() in the form component (Details.vue) until further interaction.

The former means more wiring up actions, the latter can mean that machine-level business logic cannot depend on current form state.

I chose the latter to take advantage of the convenience of v-model. Form state is propagated to the context on Back or Next button click, ensuring it is preserved when the user returns to the details page.

The Details page did require somewhat complex computed state. When XState and Vue are combined XState selectors and Vue computed share a similar concern. I tend to use selectors for more raw derived values and computed for view-logic.

With Vue 3 I have not found a satisfying way of sharing logic between selector functions and computed functions. In this example, I reused the selector functions in computed but gave the selector functions a stub state. If I had placed all form state in context as outlined above this problem could have been avoided.

Another solution is to use reselect library in selectors, but I decided Vue 3's plain selectors would be good enough for this example.

## UX / Design

I made the Next button disabled until the user had set values for name and age in the form. However, there is no design for required form inputs nor any warning given to the user so this is debatable.

The disabled button broke the XState tests for an unknown reason! I worked around this by using v-if, v-else that swapped out a complete disabled and enabled button.

I borrowed styling for buttons and radio button from a tailwind component site.  
Ideally the buttons and headers would be in the same position in the page as the user moves through the steps. This was fiddly and not the focus, so I left it. I did make the Details and Summary pages the same size though.

## Testing

I decided to test with XState model-based testing library and vitest. This was more an experiment than something I have implemented in production. It worked but only for happy paths. Implementing an auto-generated test or tests that include the Error page would have been tricky because the test model needs to understand the guard logic. The XState team are working on a new release of @xstate/test so this might become feasible in the future.

Using xstate tests meant that the service had to be started above the UserDetailsWizard and passed into it, then passed to children. Another method is to create a singleton service and import where needed. This avoids prop-drilling but makes machine tests harder to isolate.

The other candidate for testing is the selectors which run the core business logic of calculating the premium.
