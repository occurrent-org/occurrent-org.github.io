{% capture maven %}
<dependency>
    <groupId>org.occurrent</groupId>
    <artifactId>cloudevent-converter-api</artifactId>
    <version>{{site.occurrentversion}}</version>
</dependency>
{% endcapture %}

{% capture gradle %}
compile 'org.occurrent:cloudevent-converter-api:{{site.occurrentversion}}'
{% endcapture %}

{% capture sbt %}
libraryDependencies += "org.occurrent" % "cloudevent-converter-api" % "{{site.occurrentversion}}"
{% endcapture %}

{% capture grape %}
@Grab(group='org.occurrent', module='cloudevent-converter-api', version='{{site.occurrentversion}}') 
{% endcapture %}

{% capture leiningen %}
[org.occurrent/cloudevent-converter-api "{{site.occurrentversion}}"]
{% endcapture %}

{% capture buildr %}
'org.occurrent:cloudevent-converter-api:jar:{{site.occurrentversion}}'
{% endcapture %}

{% capture ivy %}
<dependency org="org.occurrent" name="cloudevent-converter-api" rev="{{site.occurrentversion}}" />
{% endcapture %}
{% include macros/mavenSnippet.html maven=maven gradle=gradle sbt=sbt grape=grape leiningen=leiningen buildr=buildr ivy=ivy%}