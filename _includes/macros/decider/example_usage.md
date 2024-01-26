{% capture java %}
// If you're using an event store to store the events, you can do like this: 

List<Event> currentEvents = ...
Command command = ..

List<Event> newEvents = decider.decideOnEventsAndReturnEvents(currentEvents, command);
State newState = decider.decideOnEventsAndReturnState(currentEvents, command);
// Return both the state and the new events
Decision<State, List<Event>> decision = decider.decideOnEvents(currentEvents, command);

// Or if you store state instead of events:

State currentState = ...
Command command = ..

List<Event> newEvents = decider.decideOnStateAndReturnEvents(currentState, command);
State newState = decider.decideOnStateAndReturnState(currentState, command);
// Return both the state and the new events
Decision<State, List<Event>> decision = decider.decideOnState(currentState, command);

// You can even apply multiple commands at the same time:

List<Event> currentEvents = ...
Command command1 = ..
Command command2 = ..

// Both commands will be applied atomically
List<Event> newEvents = decider.decideOnEventsAndReturnEvents(currentEvents, command1, command2);
{% endcapture %}

{% capture kotlin %}
// Import the Kotlin extension functions
import org.occurrent.dsl.decider.decide
import org.occurrent.dsl.decider.component1
import org.occurrent.dsl.decider.component2

val currentEvents : List<Event> = ...
val currentState : State? = ...
val command : Command = ...

// We use destructuring here to get the "newState" and "newEvents" from the Decision instance returned by decide
// This is the reason for importing the "component1" and "component2" extension functions above 
val (newState, newEvents) = decider.decide(events = currentEvents, command = command)

// You can also start the computation based on the current state
val (newState, newEvents) = decider.decide(state = currentState, command = command)

// And you could of course also just use the actual "Decision" if you like
val decision : Decision<State, List<Event>> = decider.decide(events = currentEvents, command = command)

// You can also supply multiple commands at the same time, then all of them will succeed or fail atomically
val (newState, newEvents) = decider.decide(currentState, command1, command2)

// You can also use the Java <code>decide</code> methods, such as <code>decideOnStateAndReturnEvent</code>, from Kotlin, but usually it's enough to just use the <code>org.occurrent.dsl.decider.decide</code> extension function.
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
