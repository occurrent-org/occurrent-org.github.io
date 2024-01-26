{% capture java %}
```java
sealed interface Command {
    record Command1(String something, String message) implements Command {
    }
    
    record Command2(String message) implements Command {
    }
}

sealed interface Event {
   record Event1(String something) implements Command {
   }
   
   record Event2(String somethingElse) implements Command {
   }
   
   record Event3(String message) implements Command {
   }
}

record State(String something, String somethingElse, String message) {
    // Other constructors excluded for brevity   
}
```

{% endcapture %}

{% capture kotlin %}
sealed interface Command {
    data class Command1(val something : String, val message : String) : Command
    data class Command2(val message : String) : Command
}

sealed interface Event {
   data class Event1(val something : String)
   data class Event2(val somethingElse : String)
   data class Event3(val message : String)
}

data class State(val something : String, val somethingElse : String, val message : String) {
    // Other constructors excluded for brevity   
}
{% endcapture %}
{% include macros/docsSnippet.html java=java kotlin=kotlin %}
