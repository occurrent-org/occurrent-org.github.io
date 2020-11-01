{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>application-service-blocking-kotlin</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:application-service-blocking-kotlin:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "application-service-blocking-kotlin" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='application-service-blocking-kotlin', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/application-service-blocking-kotlin "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:application-service-blocking-kotlin:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="application-service-blocking-kotlin" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}