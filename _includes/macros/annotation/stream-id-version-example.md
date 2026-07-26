{% capture java %}
@Component
public class Example {

    @Subscription(id = "printAllDomainEvents")
    void printAllDomainEvents(DomainEvent e, @StreamId String streamId, @StreamVersion long streamVersion) {
        ...
    }
}
{% endcapture %}

{% capture kotlin %}
@Component
class Example {

    @Subscription(id = "printAllDomainEvents")
    fun printAllDomainEvents(e: DomainEvent, @StreamId streamId: String, @StreamVersion streamVersion: Long) {
        // ...
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
