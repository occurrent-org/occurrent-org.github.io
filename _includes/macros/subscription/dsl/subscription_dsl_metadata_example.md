{% capture java %}
subscriptions.subscribe("gameStarted", GameStarted.class, (metadata, gameStarted) -> {
    long streamVersion = metadata.getStreamVersion();
    String streamId = metadata.getStreamId();
    Map<String, Object> allData = metadata.getData();
    var custom = allData.get("extensionPropertyDefinedInCloudEvent");
    
    // Do stuff
});

{% endcapture %}

{% capture kotlin %}
subscribe<GameStarted> { metadata, event ->
    val streamVersion = metadata.streamVersion
    val streamId = metadata.streamId
    val allData = metadata.data
    val custom = allData["extensionPropertyDefinedInCloudEvent"]
    
    // Do stuff
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
