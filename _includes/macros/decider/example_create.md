{% capture java %}
// This example uses Java 21+
var decider = Decider.<Command, State, Event>create(
        null,
        (command, state) -> switch (command) {
            case Command1 c1 -> {
                if (s == null) {
                    yield List.of(new Event1(c1.something()));
                } else {
                    yield List.of(new Event3(c1.message()));
                }
            }
           case Command2 c2 -> List.of(new MyEvent2(c2.somethingElse()));
        },
        (state, event) -> switch (event) {
            case Event1 e1 -> new State(e1.something());    
            case Event2 e2 -> new State(s.something(), e2.message());    
            case Event3 e3 -> new State(s.something(), e3.somethingElse(), s.message());    
        }
);

// You can pass an optional Predicate as a fourth argument to Decider.create(..) if you like to specify the "isTerminal" condition, otherwise it always returns false by default.
{% endcapture %}

{% capture kotlin %}
// Importing this extension function makes creating deciders nicer from Kotlin
import org.occurrent.dsl.decider.decider 

val decider = decider<Command, State?, Event>(
        initialState  = null,
        decide = { cmd, state -> 
            when (cmd) {
              is Command1 -> listOf(if (cmd == null) Event1(c1.something()) else Event3(c1.message()))
              is Command2 -> listOf(MyEvent2(c2.somethingElse()))
           }
        },
        evolve = { _, e ->
            when (e) {
                is Event1 -> State(e1.something())
                is Event2 -> State(s.something(), e2.message())
                is Event3 -> State(s.something(), e3.somethingElse(), s.message())
            }
        }
)

// You can also, optionally, define an "isTerminal" predicate as a fourth argument to the decider(..) function if you need to specify this condition, otherwise it always returns false by default.
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
