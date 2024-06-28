{% capture java %}
@Component
public class Example {
    
    @Subscription(id = "printAllDomainEvents", startupMode = StartupMode.WAIT_UNTIL_STARTED)
    void printAllDomainEvents(DomainEvent e) {
        System.out.println("Received domain event %s".formatted(e));    
    }
}
{% endcapture %}

{% capture kotlin %}
@Component
class Example {

    @Subscription(id = "printAllDomainEvents", startupMode = StartupMode.WAIT_UNTIL_STARTED)
    fun printAllDomainEvents(e: DomainEvent) {
        println("Received domain event $e")
    }
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}