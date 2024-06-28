{% capture java %}
@Component
public class Example {
    
    @Subscription(id = "printAllDomainEvents", eventTypes = {DomainEvent1.class, DomainEvent3.class})
    void printSomeDomainEvents(DomainEvent e) {
        System.out.println("Received any of the specified domain events: %s".formatted(e));    
    }
}
{% endcapture %}

{% capture kotlin %}
@Component
class Example {
    
    @Subscription(id = "printAllDomainEvents", eventTypes = [DomainEvent1::class, DomainEvent3::class])
    fun printSomeDomainEvents(e: DomainEvent) {
        println("Received any of the specified domain events: $e")
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}