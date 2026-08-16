{% capture java %}
// This example uses Java 21+
var orderDecider = Decider.<OrderCommand, OrderState, OrderEvent>create(
        null,
        (command, state) -> switch (command) {
            case PlaceOrder c -> {
                if (state != null) {
                    throw new IllegalStateException("Order " + c.orderId() + " has already been placed");
                }
                yield List.of(new OrderPlaced(c.orderId(), c.productId(), c.quantity()));
            }
            case CancelOrder c -> {
                if (state == null) {
                    throw new IllegalStateException("Order " + c.orderId() + " has not been placed");
                }
                if (state.cancelled()) {
                    throw new IllegalStateException("Order " + c.orderId() + " has already been cancelled");
                }
                yield List.of(new OrderCancelled(c.orderId()));
            }
        },
        (state, event) -> switch (event) {
            case OrderPlaced e -> new OrderState(e.orderId(), e.productId(), e.quantity(), false);
            case OrderCancelled e -> new OrderState(state.orderId(), state.productId(), state.quantity(), true);
        }
);

// You can pass an optional Predicate as a fourth argument to Decider.create(..), for example to stop evolving once an order is cancelled. It always returns false by default.
{% endcapture %}

{% capture kotlin %}
// Importing this extension function makes creating deciders nicer from Kotlin
import org.occurrent.dsl.decider.decider 

val orderDecider = decider<OrderCommand, OrderState?, OrderEvent>(
        initialState = null,
        decide = { command, state ->
            when (command) {
                is PlaceOrder -> {
                    check(state == null) { "Order ${command.orderId} has already been placed" }
                    listOf(OrderPlaced(command.orderId, command.productId, command.quantity))
                }
                is CancelOrder -> {
                    checkNotNull(state) { "Order ${command.orderId} has not been placed" }
                    check(!state.cancelled) { "Order ${command.orderId} has already been cancelled" }
                    listOf(OrderCancelled(command.orderId))
                }
            }
        },
        evolve = { state, event ->
            when (event) {
                is OrderPlaced -> OrderState(event.orderId, event.productId, event.quantity, cancelled = false)
                is OrderCancelled -> state!!.copy(cancelled = true)
            }
        }
)

// You can also, optionally, define an "isTerminal" predicate as a fourth argument to the decider(..) function, for example to stop evolving once an order is cancelled. It always returns false by default.
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
