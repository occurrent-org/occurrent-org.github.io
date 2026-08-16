{% capture java %}
sealed interface OrderCommand {
    record PlaceOrder(String orderId, String productId, int quantity) implements OrderCommand {
    }

    record CancelOrder(String orderId) implements OrderCommand {
    }
}

sealed interface OrderEvent {
    record OrderPlaced(String orderId, String productId, int quantity) implements OrderEvent {
    }

    record OrderCancelled(String orderId) implements OrderEvent {
    }
}

record OrderState(String orderId, String productId, int quantity, boolean cancelled) {
}
{% endcapture %}

{% capture kotlin %}
sealed interface OrderCommand {
    data class PlaceOrder(val orderId: String, val productId: String, val quantity: Int) : OrderCommand
    data class CancelOrder(val orderId: String) : OrderCommand
}

sealed interface OrderEvent {
    data class OrderPlaced(val orderId: String, val productId: String, val quantity: Int) : OrderEvent
    data class OrderCancelled(val orderId: String) : OrderEvent
}

data class OrderState(val orderId: String, val productId: String, val quantity: Int, val cancelled: Boolean)
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
