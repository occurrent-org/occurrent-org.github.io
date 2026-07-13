{% capture java %}
// Your domain stays pure, with no dependency on Occurrent. A Decider is two functions:
// decide(command, state) returns the new events, and evolve(state, event) folds an event into the state.
Decider<GameCommand, GameState, GameEvent> game = Decider.create(initialState, this::decide, this::evolve);

// Occurrent supplies the plumbing. Its application service loads the stream, runs your decider,
// and appends the new events under optimistic concurrency.
ApplicationService<GameEvent> applicationService = new GenericApplicationService<>(eventStore, cloudEventConverter);
applicationService.execute(gameId, events -> game.decideOnEventsAndReturnEvents(events, command));
{% endcapture %}

{% capture kotlin %}
import org.occurrent.dsl.decider.execute

// Your domain stays pure, with no dependency on Occurrent. A Decider is two functions:
// decide(command, state) returns the new events, and evolve(state, event) folds an event into the state.
val game = Decider.create(initialState, ::decide, ::evolve)

// Occurrent supplies the plumbing. Its application service loads the stream, runs your decider,
// and appends the new events under optimistic concurrency.
val applicationService = GenericApplicationService(eventStore, cloudEventConverter)
applicationService.execute(gameId, command, game)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
