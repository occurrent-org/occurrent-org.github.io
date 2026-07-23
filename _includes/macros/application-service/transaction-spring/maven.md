{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>occurrent-application-service-transaction-spring</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:occurrent-application-service-transaction-spring:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "occurrent-application-service-transaction-spring" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='occurrent-application-service-transaction-spring', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/occurrent-application-service-transaction-spring "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:occurrent-application-service-transaction-spring:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="occurrent-application-service-transaction-spring" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}