{% capture java %}
// Your domain is a pure function from past events to new events, with no dependency on Occurrent.
List<GameEvent> handle(List<GameEvent> history, GameCommand command) { ... }

// Occurrent's application service loads the stream, runs your function, and appends the new events under optimistic concurrency.
ApplicationService<GameEvent> applicationService = new GenericApplicationService<>(eventStore, cloudEventConverter);
applicationService.execute(gameId, history -> handle(history, command));
{% endcapture %}

{% capture kotlin %}
// Your domain is a pure function from past events to new events, with no dependency on Occurrent.
fun handle(history: List<GameEvent>, command: GameCommand): List<GameEvent> { ... }

// Occurrent's application service loads the stream, runs your function, and appends the new events under optimistic concurrency.
val applicationService = GenericApplicationService(eventStore, cloudEventConverter)
applicationService.execute(gameId) { history -> handle(history, command) }
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
