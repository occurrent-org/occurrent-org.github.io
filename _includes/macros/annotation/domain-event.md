{% capture java %}
public sealed interface DomainEvent permits DomainEvent1, DomainEvent2, DomainEvent3 {
    UUID eventId();
    ZonedDateTime timestamp();
}

public record DomainEvent1(UUID eventId, ZonedDateTime timestamp, String someData1) implements DomainEvent {
}

public record DomainEvent2(UUID eventId, ZonedDateTime timestamp, String someData2) implements DomainEvent {
}

public record DomainEvent3(UUID eventId, ZonedDateTime timestamp, String someData3) implements DomainEvent {
}
{% endcapture %}

{% capture kotlin %}
sealed interface DomainEvent {
    val eventId: UUID
    val timestamp: ZonedDateTime
}

data class DomainEvent1( override val eventId: UUID, override val timestamp: ZonedDateTime, val someData1: String ) : DomainEvent
data class DomainEvent2( override val eventId: UUID, override val timestamp: ZonedDateTime, val someData2: String ) : DomainEvent
data class DomainEvent3( override val eventId: UUID, override val timestamp: ZonedDateTime, val someData3: String ) : DomainEvent
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}