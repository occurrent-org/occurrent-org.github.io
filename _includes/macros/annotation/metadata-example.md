{% capture java %}
@Component
public class Example {
    
    @Subscription(id = "printAllDomainEvents")
    void printAllDomainEvents(DomainEvent e, EventMetadata metadata) {
        String streamId = metadata.getStreamId();
        long streamVersion = metadata.getStreamVersion();
        Object myCustomValue = metadata.get("MyCustomValue");
        ...
    }
}
{% endcapture %}

{% capture kotlin %}
@Component
class Example {
    
    @Subscription(id = "printAllDomainEvents")
    fun printAllDomainEvents(e: DomainEvent, metadata: EventMetadata) {
        val streamId: String = metadata.streamId
        val streamVersion: Long = metadata.streamVersion
        val myCustomValue: Any? = metadata["MyCustomValue"]
        // ...
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}