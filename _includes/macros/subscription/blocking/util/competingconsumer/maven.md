{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>competing-consumer-subscription</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:competing-consumer-subscription:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "competing-consumer-subscription" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='competing-consumer-subscription', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/competing-consumer-subscription "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:competing-consumer-subscription:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="competing-consumer-subscription" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}