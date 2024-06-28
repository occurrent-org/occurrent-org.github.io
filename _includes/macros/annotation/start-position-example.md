{% capture java %}
@Component
public class Example {
    
    @Subscription(id = "printAllDomainEvents", startAt = StartPosition.BEGINNING_OF_TIME)
    void printAllDomainEvents(DomainEvent e) {
        System.out.println("Received domain event %s".formatted(e));    
    }
}
{% endcapture %}

{% capture kotlin %}
@Component
class Example {

    @Subscription(id = "printAllDomainEvents", startAt = StartPosition.BEGINNING_OF_TIME)
    fun printAllDomainEvents(e: DomainEvent) {
        println("Received domain event $e")
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}