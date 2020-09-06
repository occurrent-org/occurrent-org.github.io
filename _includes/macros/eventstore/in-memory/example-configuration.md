{% capture java %}
InMemoryEventStore eventStore = new InMemoryEventStore();
{% endcapture %}

{% capture kotlin %}
val eventStore = InMemoryEventStore()
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}