{% capture java %}
// If you're using an event store to store the events, you can do like this: 

List<OrderEvent> currentEvents = ... // typically loaded from an event store, or supplied directly in a test
OrderCommand command = new CancelOrder("order-1");

List<OrderEvent> newEvents = orderDecider.decideOnEventsAndReturnEvents(currentEvents, command);
OrderState newState = orderDecider.decideOnEventsAndReturnState(currentEvents, command);
// Return both the state and the new events
Decision<OrderState, List<OrderEvent>> decision = orderDecider.decideOnEvents(currentEvents, command);

// Or if you store state instead of events:

OrderState currentState = ... // typically loaded from a state store such as an RDBMS row, or supplied directly in a test
OrderCommand command = ...

List<OrderEvent> newEvents = orderDecider.decideOnStateAndReturnEvents(currentState, command);
OrderState newState = orderDecider.decideOnStateAndReturnState(currentState, command);
// Return both the state and the new events
Decision<OrderState, List<OrderEvent>> decision = orderDecider.decideOnState(currentState, command);

// You can even apply multiple commands at the same time:

List<OrderEvent> currentEvents = ... // typically loaded from an event store, or supplied directly in a test
OrderCommand command1 = new PlaceOrder("order-1", "product-42", 3);
OrderCommand command2 = new CancelOrder("order-1");

// Both commands will be applied atomically
List<OrderEvent> newEvents = orderDecider.decideOnEventsAndReturnEvents(currentEvents, command1, command2);
{% endcapture %}

{% capture kotlin %}
// Import the Kotlin extension functions
import org.occurrent.dsl.decider.decide
import org.occurrent.dsl.decider.component1
import org.occurrent.dsl.decider.component2

val currentEvents : List<OrderEvent> = ... // typically loaded from an event store, or supplied directly in a test
val currentState : OrderState? = ... // typically loaded from a state store such as an RDBMS row, or supplied directly in a test
val command : OrderCommand = CancelOrder(orderId = "order-1")

// We use destructuring here to get the "newState" and "newEvents" from the Decision instance returned by decide
// This is the reason for importing the "component1" and "component2" extension functions above 
val (newState, newEvents) = orderDecider.decide(events = currentEvents, command = command)

// You can also start the computation based on the current state
val (newState, newEvents) = orderDecider.decide(state = currentState, command = command)

// And you could of course also just use the actual "Decision" if you like
val decision : Decision<OrderState, List<OrderEvent>> = orderDecider.decide(events = currentEvents, command = command)

// The same works starting from state instead of events
val decisionFromState : Decision<OrderState, List<OrderEvent>> = orderDecider.decide(state = currentState, command = command)

// You can also supply multiple commands at the same time, then all of them will succeed or fail atomically
val command1 = PlaceOrder(orderId = "order-2", productId = "product-42", quantity = 1)
val command2 = CancelOrder(orderId = "order-2")
val (newState, newEvents) = orderDecider.decide(null, command1, command2)

// You can also use the Java <code>decide</code> methods, such as <code>decideOnStateAndReturnEvent</code>, from Kotlin, but usually it's enough to just use the <code>org.occurrent.dsl.decider.decide</code> extension function.
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
