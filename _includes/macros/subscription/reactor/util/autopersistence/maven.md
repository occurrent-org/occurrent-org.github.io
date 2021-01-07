{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>reactor-durable-subscription</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:reactor-durable-subscription:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "reactor-durable-subscription" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='reactor-durable-subscription', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/reactor-durable-subscription "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:reactor-durable-subscription:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="reactor-durable-subscription" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}